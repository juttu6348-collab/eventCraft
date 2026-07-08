import axios from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error
            if (error.response.status === 401) {
                // Unauthorized - clear token and return to login
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                // Only redirect if not already on a public page
                if (!window.location.pathname.includes('/login') &&
                    !window.location.pathname.includes('/signup') &&
                    !window.location.pathname.includes('/event/')) {
                    window.location.href = '/login';
                }
            }
            throw new Error(error.response.data.error || 'An error occurred');
        } else if (error.request) {
            // Request made but no response
            throw new Error('No response from server. Please check your connection.');
        } else {
            // Something else happened
            throw new Error(error.message || 'An error occurred');
        }
    }
);

// Auth token management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token);
    } else {
        localStorage.removeItem('authToken');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

export default api;
