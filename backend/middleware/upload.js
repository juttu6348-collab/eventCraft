const multer = require('multer');

const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_PHOTOS = 10;

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: MAX_PHOTO_SIZE_BYTES,
        files: MAX_PHOTOS
    },

    fileFilter: (_req, file, callback) => {
        const mimeType =
            typeof file.mimetype === 'string'
                ? file.mimetype.toLowerCase()
                : '';

        const isImage = mimeType.startsWith('image/');

        if (!isImage) {
            const error = new Error(
                `"${file.originalname}" is not a valid image file.`
            );

            error.code = 'INVALID_IMAGE_TYPE';

            return callback(error);
        }

        return callback(null, true);
    }
});

module.exports = upload;