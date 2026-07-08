import api from './api';

/**
 * Get all users (admin only)
 */
export async function getAllUsers() {
    try {
        const response = await api.get('/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

/**
 * Get all events (admin only)
 */
export async function getAllEvents() {
    try {
        const response = await api.get('/admin/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

/**
 * Update user role
 */
export async function updateUserRole(userId, newRole) {
    try {
        await api.put(`/admin/users/${userId}/role`, { role: newRole });
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
}

/**
 * Suspend user
 */
export async function suspendUser(userId) {
    try {
        await api.put(`/admin/users/${userId}/suspend`, { suspend: true });
    } catch (error) {
        console.error('Error suspending user:', error);
        throw error;
    }
}

/**
 * Unsuspend user
 */
export async function unsuspendUser(userId) {
    try {
        await api.put(`/admin/users/${userId}/suspend`, { suspend: false });
    } catch (error) {
        console.error('Error unsuspending user:', error);
        throw error;
    }
}

/**
 * Delete user
 */
export async function deleteUserAdmin(userId) {
    try {
        await api.delete(`/admin/users/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

/**
 * Delete event
 */
export async function deleteEventAdmin(eventId) {
    try {
        await api.delete(`/admin/events/${eventId}`);
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

/**
 * Get admin statistics
 */
export async function getAdminStats() {
    try {
        const response = await api.get('/admin/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        throw error;
    }
}

/**
 * Bulk delete events
 */
export async function bulkDeleteEvents(eventIds) {
    try {
        await api.post('/admin/events/bulk-delete', { eventIds });
    } catch (error) {
        console.error('Error bulk deleting events:', error);
        throw error;
    }
}

/**
 * Update event
 */
export async function updateEvent(eventId, updates) {
    try {
        await api.put(`/events/${eventId}`, updates);
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}
