import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, userRole, signOut } = useAuth();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.position-relative')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await signOut();
            setShowUserMenu(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid px-4">
                {/* Logo - Far Left */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="navbar-logo-container d-inline-flex align-items-center justify-content-center me-2 position-relative">
                        <Sparkles size={20} color="white" className="pulse" />
                    </div>
                    <span className="gradient-text-animated fw-bold">EventCraft</span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                    {/* Navigation Links - Centered */}
                    <ul className="navbar-nav mx-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about" onClick={() => setMobileMenuOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`} to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
                                How It Works
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/themes') ? 'active' : ''}`} to="/themes" onClick={() => setMobileMenuOpen(false)}>
                                Themes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/events') ? 'active' : ''}`} to="/events" onClick={() => setMobileMenuOpen(false)}>
                                Events
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {userRole === 'admin' && (
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/admin') ? 'active' : ''}`} to="/admin" onClick={() => setMobileMenuOpen(false)}>
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* User Controls - Far Right */}
                    <div className="d-flex align-items-center gap-2 ms-lg-auto mt-3 mt-lg-0">
                        <ThemeToggle />

                        {user ? (
                            <>
                                <Link className="btn btn-gradient px-4 hover-glow btn-nav-create" to="/create" onClick={() => setMobileMenuOpen(false)}>
                                    <Sparkles size={16} className="me-2" />
                                    Create Event
                                </Link>
                                <div className="position-relative">
                                    <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={() => setShowUserMenu(!showUserMenu)}>
                                        <User size={18} />
                                        <span className="d-none d-lg-inline">{user.displayName || 'User'}</span>
                                    </button>
                                    {showUserMenu && (
                                        <div className="user-dropdown glass-card">
                                            <div className="px-3 py-2 border-bottom border-secondary">
                                                <small className="text-muted-light">Signed in as</small>
                                                <div className="fw-bold text-truncate">{user.email || 'Guest'}</div>
                                                <small className="badge bg-info mt-1">{userRole}</small>
                                            </div>
                                            {userRole === 'admin' && (
                                                <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                    <Shield size={16} className="me-2" /> Admin Panel
                                                </Link>
                                            )}
                                            <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                <User size={16} className="me-2" /> My Dashboard
                                            </Link>
                                            <button onClick={handleLogout} className="dropdown-item text-danger">
                                                <LogOut size={16} className="me-2" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light px-4" onClick={() => setMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                                <Link to="/signup" className="btn btn-gradient px-4 hover-glow" onClick={() => setMobileMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
