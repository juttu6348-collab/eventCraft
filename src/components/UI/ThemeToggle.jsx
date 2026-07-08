import { Sun, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`btn btn-glass d-flex align-items-center gap-2 theme-toggle-btn ${className}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="theme-toggle-content-wrapper">
                {isDark ? (
                    <>
                        <Moon size={18} className="pulse" />
                        <span className="d-none d-md-inline small">Dark</span>
                    </>
                ) : (
                    <>
                        <Sun size={18} className="pulse" />
                        <span className="d-none d-md-inline small">Light</span>
                    </>
                )}
            </div>
        </button>
    );
}

ThemeToggle.propTypes = {
    className: PropTypes.string
};

export default ThemeToggle;
