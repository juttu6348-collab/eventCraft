import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signOut as apiSignOut } from '../services/authService';
import { getAuthToken, clearAuthToken } from '../services/api';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const initializeAuth = async () => {
            const token = getAuthToken();

            if (token) {
                try {
                    // Get current user from API
                    const userData = await getCurrentUser();

                    if (userData) {
                        setUser(userData);
                        setUserRole(userData.role || 'user');
                    } else {
                        // Token invalid or expired
                        clearAuthToken();
                        setUser(null);
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Error initializing auth:', error);
                    clearAuthToken();
                    setUser(null);
                    setUserRole(null);
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const signOut = async () => {
        try {
            await apiSignOut();
            setUser(null);
            setUserRole(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    // Helper function to update user state after login/register
    const updateUser = (userData) => {
        setUser(userData);
        setUserRole(userData.role || 'user');
    };

    const value = {
        user,
        userRole,
        loading,
        signOut,
        updateUser, // Expose for use in login/register components
        isAuthenticated: !!user,
        isGuest: userRole === 'guest',
        isAdmin: userRole === 'admin',
        isUser: userRole === 'user'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;
