const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// All routes require admin access
router.use(authMiddleware, adminMiddleware);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT id, email, display_name, photo_url, role, status, created_at, last_login, is_anonymous
             FROM users
             ORDER BY created_at DESC`
        );

        res.json(users.map(user => ({
            id: user.id,
            email: user.email,
            displayName: user.display_name,
            photoURL: user.photo_url,
            role: user.role,
            status: user.status,
            createdAt: user.created_at,
            lastLogin: user.last_login,
            isAnonymous: user.is_anonymous
        })));
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
});

// Get all events
router.get('/events', async (req, res) => {
    try {
        const [events] = await pool.query(
            `SELECT e.*, 
                    u.display_name as user_name,
                    COALESCE(s.views, 0) as views
             FROM events e
             LEFT JOIN users u ON e.user_id = u.id
             LEFT JOIN event_stats s ON e.slug = s.event_slug
             ORDER BY e.created_at DESC`
        );

        const formattedEvents = events.map(event => ({
            id: event.id,
            slug: event.slug,
            eventType: event.event_type,
            senderName: event.sender_name,
            receiverName: event.receiver_name,
            userName: event.user_name,
            views: event.views,
            createdAt: event.created_at
        }));

        res.json(formattedEvents);
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ error: 'Failed to get events' });
    }
});

// Get admin statistics
router.get('/stats', async (req, res) => {
    try {
        // Get user counts
        const [userStats] = await pool.query(
            `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as userCount,
                SUM(CASE WHEN role = 'guest' THEN 1 ELSE 0 END) as guestCount,
                SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as adminCount,
                SUM(CASE WHEN last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) as activeUsers
             FROM users`
        );

        // Get event counts
        const [eventStats] = await pool.query(
            `SELECT 
                COUNT(*) as totalEvents,
                COALESCE(SUM(s.views), 0) as totalViews,
                SUM(CASE WHEN DATE(e.created_at) = CURDATE() THEN 1 ELSE 0 END) as eventsToday
             FROM events e
             LEFT JOIN event_stats s ON e.slug = s.event_slug`
        );

        res.json({
            totalUsers: userStats[0].total,
            userCount: userStats[0].userCount,
            guestCount: userStats[0].guestCount,
            adminCount: userStats[0].adminCount,
            activeUsers: userStats[0].activeUsers,
            totalEvents: eventStats[0].totalEvents,
            totalViews: parseInt(eventStats[0].totalViews),
            eventsToday: eventStats[0].eventsToday
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to get statistics' });
    }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'guest', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        await pool.query(
            'UPDATE users SET role = ? WHERE id = ?',
            [role, id]
        );

        res.json({ message: 'User role updated' });
    } catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ error: 'Failed to update role' });
    }
});

// Suspend/unsuspend user
router.put('/users/:id/suspend', async (req, res) => {
    try {
        const { id } = req.params;
        const { suspend } = req.body;

        await pool.query(
            'UPDATE users SET status = ? WHERE id = ?',
            [suspend ? 'suspended' : 'active', id]
        );

        res.json({ message: `User ${suspend ? 'suspended' : 'unsuspended'}` });
    } catch (error) {
        console.error('Suspend user error:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent deleting yourself
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        await pool.query('DELETE FROM users WHERE id = ?', [id]);

        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM events WHERE id = ?', [id]);

        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// Bulk delete events
router.post('/events/bulk-delete', async (req, res) => {
    try {
        const { eventIds } = req.body;

        if (!Array.isArray(eventIds) || eventIds.length === 0) {
            return res.status(400).json({ error: 'Invalid event IDs' });
        }

        const placeholders = eventIds.map(() => '?').join(',');
        await pool.query(
            `DELETE FROM events WHERE id IN (${placeholders})`,
            eventIds
        );

        res.json({ message: `${eventIds.length} events deleted` });
    } catch (error) {
        console.error('Bulk delete error:', error);
        res.status(500).json({ error: 'Failed to delete events' });
    }
});

module.exports = router;
