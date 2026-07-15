const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            displayName: user.display_name,
            isAnonymous: user.is_anonymous || false
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, displayName } = req.body;

        // Validation
        if (!email || !password || !displayName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await pool.query(
            'INSERT INTO users (email, password_hash, display_name, role, status, is_anonymous) VALUES (?, ?, ?, ?, ?, ?)',
            [email, passwordHash, displayName, 'user', 'active', false]
        );

        const userId = result.insertId;

        // Get created user
        const [users] = await pool.query('SELECT id, email, display_name, photo_url, role, status, created_at FROM users WHERE id = ?', [userId]);
        const user = users[0];

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.display_name,
                photoURL: user.photo_url,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Get user
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check if suspended
        if (user.status === 'suspended') {
            return res.status(403).json({ error: 'Account suspended' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

        // Generate token
        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.display_name,
                photoURL: user.photo_url,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Guest login
router.post('/guest', async (req, res) => {
    try {
        const displayName = 'Guest User';

        // Create guest user
        const [result] = await pool.query(
            'INSERT INTO users (email, password_hash, display_name, role, status, is_anonymous) VALUES (?, ?, ?, ?, ?, ?)',
            [null, null, displayName, 'guest', 'active', true]
        );

        const userId = result.insertId;

        // Get created user
        const [users] = await pool.query('SELECT id, email, display_name, photo_url, role, status FROM users WHERE id = ?', [userId]);
        const user = users[0];

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.display_name,
                photoURL: user.photo_url,
                role: user.role,
                status: user.status,
                isAnonymous: true
            }
        });
    } catch (error) {
        console.error('Guest login error:', error);
        res.status(500).json({ error: 'Guest login failed' });
    }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT id, email, display_name, photo_url, role, status, created_at, is_anonymous FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        res.json({
            id: user.id,
            email: user.email,
            displayName: user.display_name,
            photoURL: user.photo_url,
            role: user.role,
            status: user.status,
            isAnonymous: user.is_anonymous || false
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { displayName, photoURL } = req.body;

        if (!displayName) {
            return res.status(400).json({ error: 'Display name is required' });
        }

        await pool.query(
            'UPDATE users SET display_name = ?, photo_url = ? WHERE id = ?',
            [displayName, photoURL || null, req.user.id]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Delete account
router.delete('/account', authMiddleware, async (req, res) => {
    try {
        // Delete user (cascade will delete related events)
        await pool.query('DELETE FROM users WHERE id = ?', [req.user.id]);

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

// Convert guest to user
router.post('/convert-guest', authMiddleware, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (req.user.role !== 'guest') {
            return res.status(400).json({ error: 'User is not a guest' });
        }

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if email exists
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update guest to user
        await pool.query(
            'UPDATE users SET email = ?, password_hash = ?, role = ?, is_anonymous = ?, guest_converted_at = NOW() WHERE id = ?',
            [email, passwordHash, 'user', false, req.user.id]
        );

        // Get updated user
        const [users] = await pool.query('SELECT id, email, display_name, photo_url, role, status FROM users WHERE id = ?', [req.user.id]);
        const user = users[0];

        // Generate new token
        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                displayName: user.display_name,
                photoURL: user.photo_url,
                role: user.role,
                status: user.status,
                isAnonymous: false
            }
        });
    } catch (error) {
        console.error('Convert guest error:', error);
        res.status(500).json({ error: 'Failed to convert guest account' });
    }
});

// Logout (client-side token removal, but we can track it)
router.post('/logout', authMiddleware, (req, res) => {
    // In a more complex system, you might invalidate the token here
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
