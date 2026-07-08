import api from './api';

/**
 * Toggle favorite status on an event
 */
export const toggleEventFavorite = async (eventId, isFavorite) => {
    try {
        await api.put(`/events/${eventId}/favorite`, { isFavorite });
        return true;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
};

/**
 * Duplicate an event
 */
export const duplicateEvent = async (event) => {
    try {
        const response = await api.post(`/events/${event.id}/duplicate`);
        return {
            id: response.data.eventId,
            slug: response.data.slug,
            ...event,
            receiverName: `${event.receiverName} (Copy)`,
            views: 0,
            isFavorite: false
        };
    } catch (error) {
        console.error('Error duplicating event:', error);
        throw error;
    }
};

/**
 * Delete an event
 */
export const deleteEvent = async (eventId) => {
    try {
        await api.delete(`/events/${eventId}`);
        return true;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

/**
 * Get event analytics
 */
export const getEventAnalytics = async (eventId) => {
    try {
        const response = await api.get(`/events/${eventId}/analytics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event analytics:', error);
        throw error;
    }
};

/**
 * Bulk delete events
 */
export const bulkDeleteEvents = async (eventIds) => {
    try {
        await api.post('/admin/events/bulk-delete', { eventIds });
        return true;
    } catch (error) {
        console.error('Error bulk deleting events:', error);
        throw error;
    }
};
