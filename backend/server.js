const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { testConnection } = require('./config/database');

const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.set('trust proxy', 1);
app.use(helmet());

function normalizeOrigin(value) {
    if (!value || typeof value !== 'string') {
        return null;
    }

    return value.trim().replace(/\/+$/, '');
}

function firstHeaderValue(value) {
    if (!value || typeof value !== 'string') {
        return null;
    }

    return value.split(',')[0].trim();
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

app.use(express.json({ limit: '2mb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb'
    })
);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS',
    message: {
        error:
            'Too many authentication requests. Please try again later.'
    }
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        message: 'EventCraft API is running'
    });
});

app.use((error, req, res, _next) => {
    const statusCode = Number(error.status || 500);

    console.error('Request error:', {
        method: req.method,
        path: req.originalUrl,
        statusCode,
        message: error.message,
        stack:
            process.env.NODE_ENV === 'production'
                ? undefined
                : error.stack
    });

    return res.status(statusCode).json({
        error:
            statusCode >= 500 &&
            process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : error.message
    });
});

app.use((req, res) => {
    return res.status(404).json({
        error: 'Route not found'
    });
});

async function startLocalServer() {
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error(
            'Failed to connect to the database'
        );

        process.exit(1);
    }

    const server = app.listen(
        PORT,
        '0.0.0.0',
        () => {
            console.log(
                `EventCraft API running on port ${PORT}`
            );
        }
    );

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(
                `Port ${PORT} is already in use.`
            );
        } else {
            console.error(
                'Server startup error:',
                error
            );
        }

        process.exit(1);
    });
}

if (require.main === module) {
    startLocalServer().catch((error) => {
        console.error(
            'Failed to start EventCraft API:',
            error
        );

        process.exit(1);
    });
}

module.exports = app;