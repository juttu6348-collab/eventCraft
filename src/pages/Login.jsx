import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, UserCircle2 } from 'lucide-react';
import { signInWithEmail, signInWithGoogle, signInAsGuest } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [guestLoading, setGuestLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = await signInWithEmail(formData.email, formData.password);
            updateUser(user); // Update auth context with user data
            toast.success('Welcome back!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Login error:', error);
            if (error.message && error.message.includes('Invalid credentials')) {
                toast.error('Invalid email or password');
            } else if (error.message && error.message.includes('User not found')) {
                toast.error('No account found with this email');
            } else {
                toast.error('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            updateUser(user);
            toast.success('Welcome!');
            navigate('/');
        } catch (error) {
            console.error('Google sign-in error:', error);
            toast.error(error.message || 'Google sign-in is no longer supported');
        }
    };

    const handleGuestSignIn = async () => {
        setGuestLoading(true);
        try {
            const user = await signInAsGuest();
            updateUser(user);
            toast.success('Signed in as guest!');
            navigate('/create');
        } catch (error) {
            console.error('Guest sign-in error:', error);
            toast.error('Failed to sign in as guest');
        } finally {
            setGuestLoading(false);
        }
    };

    return (
        <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center px-3">
            <div className="auth-bg-decoration auth-bg-pink"></div>
            <div className="auth-bg-decoration auth-bg-purple"></div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="glass-card p-4 p-md-5 auth-card fade-in-up">
                            {/* Logo/Title */}
                            <div className="text-center mb-4">
                                <h1 className="display-5 fw-bold mb-2">
                                    <span className="gradient-text-animated">EventCraft</span>
                                </h1>
                                <p className="text-muted-light">Welcome back! Sign in to continue</p>
                            </div>

                            {/* Social Sign In */}
                            <div className="mb-4">
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-3 hover-lift mb-3"
                                >
                                    <Chrome size={20} />
                                    Continue with Google
                                </button>
                                <button
                                    onClick={handleGuestSignIn}
                                    disabled={guestLoading}
                                    className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-3 hover-lift"
                                >
                                    <UserCircle2 size={20} />
                                    {guestLoading ? 'Signing in...' : 'Continue as Guest'}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="auth-divider">
                                <span>or sign in with email</span>
                            </div>

                            {/* Email/Password Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-with-icon">
                                        <Mail size={18} className="input-icon" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control form-control-dark ps-5"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-with-icon">
                                        <Lock size={18} className="input-icon" />
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control form-control-dark ps-5"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label small" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/forgot-password" className="small text-info text-decoration-none">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-gradient w-100 py-3 mb-3 hover-glow"
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <div className="text-center mt-4">
                                <p className="text-muted-light small mb-0">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-info text-decoration-none fw-bold">
                                        Create one free
                                    </Link>
                                </p>
                            </div>

                            {/* Guest Info */}
                            <div className="alert alert-info mt-4 text-center small">
                                <strong>Guest Mode:</strong> Try EventCraft without signing up!
                                Limited to 3 events for 30 days.
                            </div>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center mt-3">
                            <Link to="/" className="text-muted-light text-decoration-none small hover-text-info">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
