import api from './api';

const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

function validatePhotos(files) {
    if (files.length > MAX_PHOTOS) {
        throw new Error(
            `You can upload a maximum of ${MAX_PHOTOS} photos.`
        );
    }

    for (const file of files) {
        if (file.size > MAX_PHOTO_SIZE_BYTES) {
            throw new Error(
                `"${file.name}" exceeds the maximum size of 5 MB.`
            );
        }

        if (
            file.type &&
            !file.type.startsWith('image/')
        ) {
            throw new Error(
                `"${file.name}" is not a valid image.`
            );
        }
    }
}

async function getCloudinaryUploadSignature() {
    const response = await api.post(
        '/events/upload-signature'
    );

    return response.data;
}

async function uploadPhotoToCloudinary(
    file,
    uploadConfiguration
) {
    const {
        cloudName,
        apiKey,
        timestamp,
        signature,
        folder
    } = uploadConfiguration;

    const uploadData = new FormData();

    uploadData.append('file', file);
    uploadData.append('api_key', apiKey);
    uploadData.append(
        'timestamp',
        String(timestamp)
    );
    uploadData.append('signature', signature);
    uploadData.append('folder', folder);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: 'POST',
            body: uploadData
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.error?.message ||
                `Failed to upload "${file.name}".`
        );
    }

    return result.secure_url;
}

// Helper function to generate slug
function generateSlug(senderName, receiverName) {
    const base = `${senderName}-${receiverName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    const random = Math.random().toString(36).substring(2, 8);
    return `${base}-${random}`;
}

/**
 * Upload images - handled by API now
 * Files will be sent as FormData to the backend
 */
export async function uploadImages(files = []) {
    const normalizedFiles = Array.from(files);

    if (normalizedFiles.length === 0) {
        return [];
    }

    validatePhotos(normalizedFiles);

    const uploadConfiguration =
        await getCloudinaryUploadSignature();

    const uploadedUrls = [];

    // Sequential upload is slower than full parallel upload,
    // but is more stable and gives clearer errors.
    for (const file of normalizedFiles) {
        const secureUrl =
            await uploadPhotoToCloudinary(
                file,
                uploadConfiguration
            );

        uploadedUrls.push(secureUrl);
    }

    return uploadedUrls;
}

/**
 * Create a new event
 * @param {Object} eventData - Event data object
 * @returns {Promise<string>} The slug of the created event
 */
export async function createEvent(eventData) {
    try {
        if (
            !eventData.senderName ||
            !eventData.receiverName
        ) {
            throw new Error(
                'Sender name and receiver name are required.'
            );
        }

        const photoUrls = await uploadImages(
            eventData.photos || []
        );

        const response = await api.post('/events', {
            eventType:
                eventData.eventType || 'birthday',

            senderName: eventData.senderName,
            receiverName: eventData.receiverName,
            relationship:
                eventData.relationship || '',
            date: eventData.date || '',
            mainMessage:
                eventData.mainMessage || '',
            theme: eventData.theme || 'elegant',

            enabledPages:
                eventData.enabledPages || ['home'],

            customPageTitle:
                eventData.customPageData?.title || '',

            customPageBody:
                eventData.customPageData?.body || '',

            photoUrls
        });

        return response.data.slug;
    } catch (error) {
        console.error(
            'Error creating event:',
            error
        );

        throw error;
    }
}

/**
 * Get an event by its slug
 * @param {string} slug - The event slug
 * @returns {Promise<Object|null>} The event data or null if not found
 */
export async function getEventBySlug(slug) {
    try {
        console.log('🔍 Fetching event:', slug);
        const response = await api.get(`/events/${slug}`);

        console.log('✅ Event found:', response.data);
        return response.data;
    } catch (error) {
        if (error.message && error.message.includes('Event not found')) {
            console.log('❌ Event not found:', slug);
            return null;
        }
        console.error('❌ Error fetching event:', error);
        throw error;
    }
}
