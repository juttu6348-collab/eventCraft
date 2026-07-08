import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome, Check, X } from 'lucide-react';
import { signUpWithEmail, signInWithGoogle } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Signup() {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Password strength validation
    const passwordStrength = {
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
        hasSpecial: /[!@#$%^&*]/.test(formData.password)
    };

    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
    const passwordsMatch = formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordStrong) {
            toast.error('Please meet all password requirements');
            return;
        }

        if (!passwordsMatch) {
            toast.error('Passwords do not match');
            return;
        }

        if (!formData.agreedToTerms) {
            toast.error('Please agree to terms and conditions');
            return;
        }

        setLoading(true);

        try {
            const user = await signUpWithEmail(formData.email, formData.password, formData.name);
            updateUser(user); // Update auth context
            toast.success('Account created successfully!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Signup error:', error);
            if (error.message && error.message.includes('Email already in use')) {
                toast.error('Email already in use');
            } else if (error.message && error.message.includes('Invalid email')) {
                toast.error('Invalid email address');
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const user = await signInWithGoogle();
            updateUser(user);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Google sign-up error:', error);
            toast.error(error.message || 'Google sign-up is no longer supported');
        }
    };

    return (
        <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
            <div className="auth-bg-decoration auth-bg-pink"></div>
            <div className="auth-bg-decoration auth-bg-purple"></div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="glass-card p-4 p-md-5 auth-card fade-in-up">
                            {/* Logo/Title */}
                            <div className="text-center mb-4">
                                <h1 className="display-5 fw-bold mb-2">
                                    <span className="gradient-text-animated">Create Account</span>
                                </h1>
                                <p className="text-muted-light">Join EventCraft and start creating!</p>
                            </div>

                            {/* Social Sign Up */}
                            <div className="mb-4">
                                <button
                                    onClick={handleGoogleSignUp}
                                    className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-3 hover-lift"
                                >
                                    <Chrome size={20} />
                                    Sign up with Google
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="auth-divider">
                                <span>or sign up with email</span>
                            </div>

                            {/* Signup Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <div className="input-with-icon">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control form-control-dark ps-5"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            minLength={2}
                                        />
                                    </div>
                                </div>

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
                                            onFocus={() => setPasswordFocus(true)}
                                            required
                                        />
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {passwordFocus && formData.password && (
                                        <div className="password-requirements mt-2 small">
                                            <div className={passwordStrength.minLength ? 'text-success' : 'text-muted-light'}>
                                                {passwordStrength.minLength ? <Check size={14} /> : <X size={14} />} At least 8 characters
                                            </div>
                                            <div className={passwordStrength.hasUppercase ? 'text-success' : 'text-muted-light'}>
                                                {passwordStrength.hasUppercase ? <Check size={14} /> : <X size={14} />} One uppercase letter
                                            </div>
                                            <div className={passwordStrength.hasNumber ? 'text-success' : 'text-muted-light'}>
                                                {passwordStrength.hasNumber ? <Check size={14} /> : <X size={14} />} One number
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className="input-with-icon">
                                        <Lock size={18} className="input-icon" />
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className={`form-control form-control-dark ps-5 ${formData.confirmPassword && !passwordsMatch ? 'is-invalid' : ''
                                                }`}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {formData.confirmPassword && !passwordsMatch && (
                                        <div className="text-danger small mt-1">Passwords do not match</div>
                                    )}
                                </div>

                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="agreedToTerms"
                                        name="agreedToTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label small" htmlFor="agreedToTerms">
                                        I agree to the <Link to="/terms" className="text-info">Terms of Service</Link> and <Link to="/privacy" className="text-info">Privacy Policy</Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !isPasswordStrong || !passwordsMatch}
                                    className="btn btn-gradient w-100 py-3 mb-3 hover-glow"
                                >
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            {/* Sign In Link */}
                            <div className="text-center mt-4">
                                <p className="text-muted-light small mb-0">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-info text-decoration-none fw-bold">
                                        Sign in
                                    </Link>
                                </p>
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

export default Signup;
