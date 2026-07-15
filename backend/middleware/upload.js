const multer = require('multer');

const allowedMimeTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
]);

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 10
    },

    fileFilter: (req, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            return callback(
                new Error(
                    'Only JPEG, PNG, WebP and GIF images are allowed'
                )
            );
        }

        callback(null, true);
    }
});

module.exports = upload;