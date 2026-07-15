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

// Vercel runs behind a reverse proxy.
app.set('trust proxy', 1);

function normalizeOrigin(value) {
    if (!value || typeof value !== 'string') {
        return null;
    }

    return value
        .trim()
        .replace(/\/+$/, '');
}

function firstHeaderValue(value) {
    if (!value || typeof value !== 'string') {
        return null;
    }

    return value
        .split(',')[0]
        .trim();
}

const configuredOrigins = new Set(
    [
        'http://localhost:5173',
        'http://localhost:5174',
        ...(process.env.FRONTEND_URLS || '').split(',')
    ]
        .map(normalizeOrigin)
        .filter(Boolean)
);

const vercelSystemOrigins = new Set(
    [
        process.env.VERCEL_URL,
        process.env.VERCEL_BRANCH_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL
    ]
        .filter(Boolean)
        .map((value) => {
            const origin = value.startsWith('http')
                ? value
                : `https://${value}`;

            return normalizeOrigin(origin);
        })
);

function getPublicRequestOrigin(req) {
    const forwardedHost = firstHeaderValue(
        req.headers['x-forwarded-host']
    );

    const host = forwardedHost || req.headers.host;

    if (!host) {
        return null;
    }

    const forwardedProtocol = firstHeaderValue(
        req.headers['x-forwarded-proto']
    );

    const protocol =
        forwardedProtocol ||
        req.protocol ||
        (process.env.NODE_ENV === 'production'
            ? 'https'
            : 'http');

    return normalizeOrigin(`${protocol}://${host}`);
}

function corsOptionsDelegate(req, callback) {
    const requestOrigin = normalizeOrigin(
        req.headers.origin
    );

    const publicRequestOrigin =
        getPublicRequestOrigin(req);

    const isAllowed =
        !requestOrigin ||
        configuredOrigins.has(requestOrigin) ||
        vercelSystemOrigins.has(requestOrigin) ||
        requestOrigin === publicRequestOrigin;

    if (!isAllowed) {
        console.error('CORS request blocked:', {
            requestOrigin,
            publicRequestOrigin,
            configuredOrigins: [...configuredOrigins],
            vercelSystemOrigins: [...vercelSystemOrigins]
        });

        const error = new Error(
            `Not allowed by CORS: ${requestOrigin}`
        );

        error.status = 403;

        return callback(error);
    }

    return callback(null, {
        origin: requestOrigin || false,
        credentials: true,
        methods: [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ],
        optionsSuccessStatus: 204
    });
}

app.use(cors(corsOptionsDelegate));
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
