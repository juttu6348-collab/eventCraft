import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export function ThemeProvider({ children }) {
    // Get system theme preference
    const getSystemTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    };

    // Get stored theme from localStorage
    const getStoredTheme = () => {
        try {
            const stored = localStorage.getItem('eventcraft-theme');
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
        } catch (error) {
            console.error('Error reading theme from localStorage:', error);
        }
        return null;
    };

    // Initialize theme: stored > system > default (dark)
    const [theme, setThemeState] = useState(() => {
        return getStoredTheme() || 'dark';
    });
        
    

    // Apply theme to document root
    const applyTheme = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Set theme and persist to localStorage
    const setTheme = (newTheme) => {
        if (newTheme !== 'light' && newTheme !== 'dark') {
            console.error('Invalid theme:', newTheme);
            return;
        }

        setThemeState(newTheme);
        applyTheme(newTheme);

        try {
            localStorage.setItem('eventcraft-theme', newTheme);
        } catch (error) {
            console.error('Error saving theme to localStorage:', error);
        }
    };

    // Toggle between light and dark
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Apply initial theme on mount
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

        const handleChange = (e) => {
            // Only auto-update if user hasn't manually set a preference
            const stored = getStoredTheme();
            if (!stored) {
                const newTheme = e.matches ? 'light' : 'dark';
                setThemeState(newTheme);
                applyTheme(newTheme);
            }
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        // Older browsers
        else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContext;
