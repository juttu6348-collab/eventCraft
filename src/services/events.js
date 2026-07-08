import api from './api';

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
export async function uploadImages(files, slug) {
    console.log('📸 Images will be uploaded with event creation');
    // This function is kept for compatibility but images are now uploaded with createEvent
    return [];
}

/**
 * Create a new event
 * @param {Object} eventData - Event data object
 * @returns {Promise<string>} The slug of the created event
 */
export async function createEvent(eventData) {
    try {
        console.log('🚀 Creating event...', eventData);

        // Validate required fields
        if (!eventData.senderName || !eventData.receiverName) {
            throw new Error('Sender name and receiver name are required');
        }

        // Create FormData for file upload
        const formData = new FormData();

        // Add event data fields
        formData.append('eventType', eventData.eventType || 'birthday');
        formData.append('senderName', eventData.senderName);
        formData.append('receiverName', eventData.receiverName);
        formData.append('relationship', eventData.relationship || '');
        formData.append('date', eventData.date || '');
        formData.append('mainMessage', eventData.mainMessage || '');
        formData.append('theme', eventData.theme || 'elegant');
        formData.append('enabledPages', JSON.stringify(eventData.enabledPages || ['home']));

        // Add custom page data if exists
        if (eventData.customPageData) {
            formData.append('customPageTitle', eventData.customPageData.title || '');
            formData.append('customPageBody', eventData.customPageData.body || '');
        }

        // Add photos if they exist
        if (eventData.photos && eventData.photos.length > 0) {
            console.log(`📸 Adding ${eventData.photos.length} photos...`);
            for (const photo of eventData.photos) {
                formData.append('photos', photo);
            }
        }

        // Send to API
        const response = await api.post('/events', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('✅ Event created successfully!', response.data.slug);
        return response.data.slug;
    } catch (error) {
        console.error('❌ Error creating event:', error);
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
