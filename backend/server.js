const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());

// Middleware - CORS configuration for multiple frontend ports
const allowedOrigins = (
    process.env.FRONTEND_URLS ||
    'http://localhost:5173'
)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new Error('Not allowed by CORS')
        );
    },

    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Authentication rate limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many authentication requests. Please try again later.'
    }
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EventCraft API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});



async function startLocalServer() {
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error(
            'Failed to connect to the database'
        );

        process.exit(1);
    }

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(
            `EventCraft API running on port ${port}`
        );
    });
}

if (require.main === module) {
    startLocalServer().catch((error) => {
        console.error(
            'Failed to start server:',
            error
        );

        process.exit(1);
    });
}

module.exports = app;
