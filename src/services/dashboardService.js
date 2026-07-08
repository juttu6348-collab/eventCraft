import api from './api';

/**
 * Get all events created by a specific user
 * @returns {Promise<Array>} Array of user's events with view counts
 */
export async function getUserEvents() {
    try {
        const response = await api.get('/dashboard/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching user events:', error);
        throw error;
    }
}

/**
 * Get event analytics (client-side calculation for compatibility)
 */
export async function getEventAnalytics(events) {
    const totalEvents = events.length;
    const totalViews = events.reduce((sum, event) => sum + (event.views || 0), 0);

    // Find most viewed event
    const mostViewed = events.reduce((max, event) =>
        (event.views || 0) > (max.views || 0) ? event : max
        , events[0] || {});

    return {
        totalEvents,
        totalViews,
        mostViewed: mostViewed ? {
            name: mostViewed.receiverName,
            views: mostViewed.views || 0
        } : null
    };
}

/**
 * Delete an event (requires ownership or admin)
 */
export async function deleteEvent(eventId, slug) {
    try {
        await api.delete(`/events/${eventId}`);
        return true;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}
