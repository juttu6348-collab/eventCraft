const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const useSsl = process.env.DB_SSL
    ? process.env.DB_SSL === 'true'
    : process.env.NODE_ENV === 'production';

const sslOptions = useSsl
    ? {
        minVersion: 'TLSv1.2'
    }
    : undefined;

if (useSsl && process.env.DB_SSL_CA_FILE) {
    sslOptions.ca = fs.readFileSync(process.env.DB_SSL_CA_FILE, 'utf8');
} else if (useSsl && process.env.DB_SSL_CA) {
    const caValue = process.env.DB_SSL_CA.trim();
    sslOptions.ca = caValue.includes('-----BEGIN CERTIFICATE-----')
        ? caValue
        : Buffer.from(caValue, 'base64').toString('utf8');
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: sslOptions,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log('Database connected successfully');

        connection.release();
        return true;
    } catch (error) {
        console.error(
            'Database connection failed:',
            error.message
        );

        return false;
    }
}

module.exports = {
    pool,
    testConnection
};