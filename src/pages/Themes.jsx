import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FloatingParticles from '../components/UI/FloatingParticles';
import { themes } from '../utils/themes';

function Themes() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Hero with Particles */}
            <section className="position-relative py-5 overflow-hidden mt-nav">
                <FloatingParticles
                    emojis={['🎨', '🌈', '✨', '💫', '🖌️', '🌟']}
                    count={25}
                    speed="slow"
                />

                <div className="bg-decoration bg-decoration-pink" />
                <div className="bg-decoration bg-decoration-fast bg-decoration-blue" />

                <div className="container position-relative z-content">
                    <div className="text-center py-5">
                        <h1 className="display-4 fw-bold mb-3 fade-in-up">
                            Choose Your <span className="gradient-text-animated">Perfect Theme</span>
                        </h1>
                        <p className="lead text-muted-light px-3 fade-in-up delay-1">
                            Pick a visual style that matches your event and personal taste
                        </p>
                    </div>
                </div>
            </section>

            {/* Theme Cards */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {themes.map((theme, index) => (
                            <div key={theme.id} className="col-12 col-md-6 col-lg-4">
                                <div
                                    className={`glass-card glass-card-hover h-100 overflow-hidden fade-in-up delay-${index + 1} theme-card-wrapper`}
                                >
                                    {/* Theme Preview */}
                                    <div
                                        className="position-relative hover-scale theme-preview-box"
                                        style={{
                                            '--theme-gradient': theme.gradient
                                        }}
                                    >
                                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4">
                                            <div className={`text-center ${theme.id === 'minimal' ? 'theme-text-dark' : 'theme-text-light'}`}>
                                                <h3 className="fw-bold mb-2 display-6 shimmer theme-heading-shadow">
                                                    {theme.name}
                                                </h3>
                                                <p className="mb-0 fw-semibold theme-p-shadow">
                                                    {theme.description}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Animated Gradient Overlay on Hover */}
                                        <div className="position-absolute top-0 start-0 w-100 h-100 theme-overlay-hover transition-opacity" />
                                    </div>

                                    {/* Theme Info */}
                                    <div className="p-4">
                                        <p className="text-muted-light small mb-3">{theme.preview}</p>

                                        {/* Color Palette */}
                                        <div className="mb-3">
                                            <small className="text-muted-light d-block mb-2">Color Palette:</small>
                                            <div className="d-flex gap-2">
                                                {theme.colors.map((color, i) => (
                                                    <div
                                                        key={i}
                                                        className="theme-color-swatch hover-scale"
                                                        style={{
                                                            '--swatch-color': color,
                                                            '--swatch-shadow': `${color}40`
                                                        }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/create?theme=${theme.id}`}
                                            className="btn btn-glass btn-sm w-100 btn-ripple"
                                        >
                                            <Sparkles size={16} className="me-2" />
                                            Use This Theme
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-5 fade-in-up delay-6">
                        <div className="glass-card glass-card-hover p-4 p-md-5 d-inline-block">
                            <p className="text-muted-light mb-3 fw-semibold">Can't decide? You can preview themes during creation</p>
                            <Link to="/create" className="btn btn-gradient btn-lg px-5 btn-ripple hover-glow">
                                <Sparkles size={20} className="me-2" />
                                Start Creating Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Themes;
