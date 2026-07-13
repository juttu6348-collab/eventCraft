import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart, Instagram, Sparkles } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-dark mt-auto py-5">
            <div className="container">
                <div className="row g-4 mb-4">
                    {/* Brand & Description */}
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <div className="brand-icon-box me-2">
                                <Sparkles size={18} color="white" />
                            </div>
                            <h5 className="gradient-text mb-0">EventCraft</h5>
                        </div>
                        <p className="text-muted-light small mb-3">
                            Create beautiful, personalized event microsites in minutes.
                            Share unforgettable moments with your loved ones. No coding required. Free forever.
                        </p>
                        <div className="d-flex align-items-center">
                            <Heart size={14} className="text-danger me-2 pulse" />
                            <small className="text-muted-light">Made with love for special moments</small>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-3 col-6">
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="small text-muted-light hover-link">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="small text-muted-light hover-link">About Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/how-it-works" className="small text-muted-light hover-link">How It Works</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/themes" className="small text-muted-light hover-link">Themes</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create" className="small text-muted-light hover-link">Create Event</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Event Types */}
                    <div className="col-lg-3 col-md-3 col-6">
                        <h6 className="fw-bold mb-3">Popular Events</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/create/birthday" className="small text-muted-light hover-link">🎂 Birthday Wishes</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create/anniversary" className="small text-muted-light hover-link">💕 Anniversary</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create/wedding" className="small text-muted-light hover-link">💒 Wedding</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create/graduation" className="small text-muted-light hover-link">🎓 Graduation</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create/baby" className="small text-muted-light hover-link">👶 Baby Shower</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/create/success" className="small text-muted-light hover-link">🏆 Success</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect & Newsletter */}
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">Stay Connected</h6>
                        <div className="d-flex gap-2 mb-3">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-sm glass-light footer-icon-btn hover-lift">
                                <Github size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-sm glass-light footer-icon-btn hover-lift">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="btn btn-sm glass-light footer-icon-btn hover-lift">
                                <Instagram size={24} />
                            </a>
                            <a href="mailto:hello@eventcraft.com"
                                className="btn btn-sm glass-light footer-icon-btn hover-lift">
                                <Mail size={24} />
                            </a>
                        </div>
                        <div className="mb-3">
                            <p className="small text-muted-light mb-2">Get updates & inspiration</p>
                            <div className="input-group subscribe-group">
                                <input
                                    type="email"
                                    className="form-control form-control-dark"
                                    placeholder="Your email"
                                    aria-label="Email for newsletter"
                                />
                                <button className="btn btn-gradient px-3" type="button">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <hr className="my-4 opacity-25" />
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <small className="text-muted-light">
                            © {currentYear} EventCraft. All rights reserved.
                        </small>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <small className="text-muted-light">
                            <Link to="/privacy" className="hover-link me-3">Privacy Policy</Link>
                            <Link to="/terms" className="hover-link me-3">Terms of Service</Link>
                            <Link to="/contact" className="hover-link">Contact</Link>
                            
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


