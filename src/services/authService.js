import api, { setAuthToken, clearAuthToken } from './api';

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email, password, displayName) {
    try {
        const response = await api.post('/auth/register', {
            email,
            password,
            displayName
        });

        // Store token and user data
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data.user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password) {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });

        // Store token and user data
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data.user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

/**
 * Sign in with Google - NOT SUPPORTED ANYMORE
 * This function is kept for compatibility but will throw an error
 */
export async function signInWithGoogle() {
    throw new Error('Google sign-in is no longer supported. Please use email/password or guest login.');
}

/**
 * Sign in as guest (anonymous)
 */
export async function signInAsGuest() {
    try {
        const response = await api.post('/auth/guest');

        // Store token and user data
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data.user;
    } catch (error) {
        console.error('Error signing in as guest:', error);
        throw error;
    }
}

/**
 * Send password reset email - NOT IMPLEMENTED YET
 * Would require email service setup on backend
 */
export async function resetPassword(email) {
    throw new Error('Password reset is not yet implemented. Please contact support.');
}

/**
 * Update user profile
 */
export async function updateProfile(displayName, photoURL) {
    try {
        await api.put('/auth/profile', {
            displayName,
            photoURL
        });

        // Update local user data
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.displayName = displayName;
        user.photoURL = photoURL;
        localStorage.setItem('user', JSON.stringify(user));

        return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

/**
 * Delete user account
 */
export async function deleteAccount() {
    try {
        await api.delete('/auth/account');

        // Clear local data
        clearAuthToken();

        return true;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
}

/**
 * Convert guest account to regular user
 */
export async function convertGuestToUser(email, password) {
    try {
        const response = await api.post('/auth/convert-guest', {
            email,
            password
        });

        // Update token and user data
        setAuthToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data.user;
    } catch (error) {
        console.error('Error converting guest to user:', error);
        throw error;
    }
}

/**
 * Sign out
 */
export async function signOut() {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Error signing out:', error);
    } finally {
        // Always clear local data
        clearAuthToken();
    }
}

/**
 * Get current user from API
 */
export async function getCurrentUser() {
    try {
        const response = await api.get('/auth/me');
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error getting current user:', error);
        clearAuthToken();
        return null;
    }
}
