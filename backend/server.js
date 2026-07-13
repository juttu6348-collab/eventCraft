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
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174' // Alternative Vite port
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Start server
async function startServer() {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error('⚠️ Failed to connect to database. Please check your MySQL server and configuration.');
        console.error('Make sure MySQL is running and the database "eventcraft" exists.');
        console.error('You can create it by running the schema.sql file in the config folder.');
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`\n🚀 EventCraft Backend Server`);
        console.log(`📍 Server running on http://localhost:${PORT}`);
        console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
        console.log(`💾 Database: ${process.env.DB_NAME}`);
        console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL}`);
        console.log(`\n✨ Ready to accept requests!\n`);
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
