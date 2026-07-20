const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

function ensureCloudinaryConfigured() {
    const missingVariables = [
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET'
    ].filter((variableName) => !process.env[variableName]);

    if (missingVariables.length > 0) {
        const error = new Error(
            `Cloudinary configuration is missing: ${missingVariables.join(', ')}`
        );

        error.status = 500;
        throw error;
    }
}

module.exports = {
    cloudinary,
    ensureCloudinaryConfigured
};