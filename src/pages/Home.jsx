import { Link } from 'react-router-dom';
import { Sparkles, Heart, Gift, Cake, Baby, GraduationCap, Trophy, Zap, Image, Clock } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FloatingParticles from '../components/UI/FloatingParticles';

function Home() {
    const eventTypes = [
        { id: 'birthday', name: 'Birthday', emoji: '🎂', icon: Cake, color: '#ec4899' },
        { id: 'anniversary', name: 'Anniversary', emoji: '💕', icon: Heart, color: '#e91e63' },
        { id: 'wedding', name: 'Wedding', emoji: '💒', icon: Heart, color: '#f43f5e' },
        { id: 'engagement', name: 'Engagement', emoji: '💍', icon: Heart, color: '#f472b6' },
        { id: 'baby', name: 'New Baby', emoji: '👶', icon: Baby, color: '#06b6d4' },
        { id: 'graduation', name: 'Graduation', emoji: '🎓', icon: GraduationCap, color: '#8b5cf6' },
        { id: 'success', name: 'Success', emoji: '🏆', icon: Trophy, color: '#f59e0b' },
        { id: 'promotion', name: 'Promotion', emoji: '📈', icon: Trophy, color: '#10b981' },
        { id: 'farewell', name: 'Farewell', emoji: '👋', icon: Heart, color: '#6366f1' },
        { id: 'retirement', name: 'Retirement', emoji: '🌟', icon: Trophy, color: '#a855f7' },
        { id: 'thankyou', name: 'Thank You', emoji: '💐', icon: Heart, color: '#ec4899' },
        { id: 'housewarming', name: 'Housewarming', emoji: '🏠', icon: Heart, color: '#14b8a6' },
        { id: 'getwell', name: 'Get Well Soon', emoji: '💪', icon: Heart, color: '#ef4444' },
        { id: 'apology', name: 'Apology', emoji: '🙏', icon: Heart, color: '#f97316' },
        { id: 'mothersday', name: "Mother's Day", emoji: '💝', icon: Heart, color: '#db2777' },
        { id: 'fathersday', name: "Father's Day", emoji: '👔', icon: Heart, color: '#3b82f6' },
        { id: 'valentine', name: "Valentine's Day", emoji: '💘', icon: Heart, color: '#f43f5e' },
        { id: 'christmas', name: 'Christmas', emoji: '🎄', icon: Heart, color: '#22c55e' },
        { id: 'newyear', name: 'New Year', emoji: '🎊', icon: Heart, color: '#facc15' },
        { id: 'religious', name: 'Religious Day', emoji: '🕯️', icon: Heart, color: '#a855f7' }
    ];

    // Featured events for home page (6 most popular)
    const featuredEvents = eventTypes.slice(0, 6);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Hero Section with Floating Particles */}
            <section className="position-relative py-5 overflow-hidden mt-nav">
                {/* Floating Emoji Particles */}
                <FloatingParticles
                    emojis={['🎉', '🎂', '💕', '🎊', '✨', '🎁', '💐', '🎈']}
                    count={30}
                    speed="normal"
                />

                {/* Background Decorations */}
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />

                <div className="container position-relative z-content">
                    <div className="row justify-content-center text-center py-5">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="fade-in-up">
                                <h1 className="display-4 display-lg-3 fw-bold mb-4">
                                    Craft Stunning <span className="gradient-text-animated">Event Wishes</span><br />
                                    As Shareable Microsites
                                </h1>
                                <p className="lead text-muted-light mb-5 px-2">
                                    Turn your special occasions into beautiful, personalized microsites.
                                    Share heartfelt messages and create lasting memories in minutes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Event Type Cards with 3D Tilt Effect */}
                    <div id="event-types" className="row justify-content-center g-3 g-md-4 mb-4">
                        {featuredEvents.map((event, index) => (
                            <div key={event.id} className="col-6 col-md-4 col-lg-2">
                                <Link
                                    to={`/create/${event.id}`}
                                    className="text-decoration-none"
                                >
                                    <div
                                        className={`event-card-glass hover-tilt fade-in-up delay-${index + 1}`}
                                        style={{
                                            '--event-color': event.color,
                                            '--event-shadow': `${event.color}40`
                                        }}
                                    >
                                        <div className="mb-2 mb-md-3 emoji-lg">
                                            {event.emoji}
                                        </div>
                                        <h6 className="mb-0 fw-semibold small text-primary-inline">{event.name}</h6>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* See All Events Button */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-auto">
                            <Link to="/events" className="btn btn-outline-light px-4 py-2">
                                See All Events ({eventTypes.length}) →
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button with Enhanced Glow */}
                    <div className="row justify-content-center fade-in-up delay-3">
                        <div className="col-auto">
                            <Link
                                to="/create"
                                className="btn btn-gradient btn-lg px-5 py-3 btn-ripple hover-glow"
                            >
                                Create a Wish <Sparkles size={20} className="ms-2" />
                            </Link>
                        </div>
                    </div>


                </div>
            </section>

            {/* How It Works Section with Glassmorphism */}
            <section className="py-5 position-relative overflow-hidden bg-gradient-subtle">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3 fade-in-up">
                            How <span className="gradient-text-animated">It Works</span>
                        </h2>
                        <p className="text-muted-light fade-in-up delay-1">Create your microsite in 3 simple steps</p>
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-12 col-md-4">
                            <div className="glass-card glass-card-hover p-4 text-center h-100 fade-in-up delay-1">
                                <div className="mb-3">
                                    <div className="icon-circle-dynamic circle-round home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-pink-purple)',
                                            '--icon-shadow': '0 10px 30px rgba(233, 30, 99, 0.3)'
                                        }}>
                                        <span className="display-4 fw-bold text-white">1</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold mb-3">Choose Occasion & Theme</h5>
                                <p className="text-muted-light small mb-0">
                                    Select from 20+ event types and stunning themes to match your style perfectly
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="glass-card glass-card-hover p-4 text-center h-100 fade-in-up delay-2">
                                <div className="mb-3">
                                    <div className="icon-circle-dynamic circle-round home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-purple-blue)',
                                            '--icon-shadow': '0 10px 30px rgba(156, 39, 176, 0.3)'
                                        }}>
                                        <span className="display-4 fw-bold text-white">2</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold mb-3">Add Names, Message & Photos</h5>
                                <p className="text-muted-light small mb-0">
                                    Personalize with your heartfelt message, upload cherished photos, and customize every detail
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="glass-card glass-card-hover p-4 text-center h-100 fade-in-up delay-3">
                                <div className="mb-3">
                                    <div className="icon-circle-dynamic circle-round home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-pink-blue)',
                                            '--icon-shadow': '0 10px 30px rgba(33, 150, 243, 0.3)'
                                        }}>
                                        <span className="display-4 fw-bold text-white">3</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold mb-3">Get Link & QR Code</h5>
                                <p className="text-muted-light small mb-0">
                                    Share your microsite instantly via WhatsApp, Instagram, or any platform with a unique link
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center fade-in-up delay-4">
                        <Link to="/how-it-works" className="btn btn-glass btn-lg px-5 btn-ripple">
                            See Full Process
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section with Icon Animations */}
            <section className="py-5 overflow-hidden">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3 fade-in-up">
                            Why Choose <span className="gradient-text-animated">EventCraft</span>?
                        </h2>
                        <p className="text-muted-light fade-in-up delay-1">Everything you need to create stunning microsites</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="text-center fade-in-up delay-1 hover-scale">
                                <div className="mb-3 icon-circle-dynamic circle-box pulse home-icon-circle-step"
                                    style={{
                                        '--icon-bg': 'var(--gradient-pink-purple)',
                                        '--icon-shadow': '0 8px 25px rgba(233, 30, 99, 0.3)'
                                    }}>
                                    <Gift size={36} color="white" />
                                </div>
                                <h5 className="fw-semibold mb-2">No Sign-up Required</h5>
                                <p className="text-muted-light small px-2">
                                    Create beautiful microsites instantly without creating an account
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="text-center fade-in-up delay-2 hover-scale">
                                <div className="mb-3 icon-circle-dynamic circle-box pulse home-icon-circle-step"
                                    style={{
                                        '--icon-bg': 'var(--gradient-purple-blue)',
                                        '--icon-shadow': '0 8px 25px rgba(156, 39, 176, 0.3)',
                                        animationDelay: '0.5s'
                                    }}>
                                    <Clock size={36} color="white" />
                                </div>
                                <h5 className="fw-semibold mb-2">Ready in 2 Minutes</h5>
                                <p className="text-muted-light small px-2">
                                    From idea to shareable link in just minutes - truly effortless
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="text-center fade-in-up delay-3 hover-scale">
                                <div className="mb-3 icon-circle-dynamic circle-box pulse home-icon-circle-step"
                                    style={{
                                        '--icon-bg': 'var(--gradient-pink-blue)',
                                        '--icon-shadow': '0 8px 25px rgba(33, 150, 243, 0.3)',
                                        animationDelay: '1s'
                                    }}>

                                    <Image size={36} color="white" />
                                </div>
                                <h5 className="fw-semibold mb-2">Multiple Pages</h5>
                                <p className="text-muted-light small px-2">
                                    Letter, Gallery, Memories, Surprise and more in one microsite
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="text-center fade-in-up delay-4 hover-scale">
                                <div className="mb-3 d-inline-flex align-items-center justify-content-center pulse home-icon-circle-step"
                                    style={{
                                        '--icon-bg': 'var(--gradient-warm)',
                                        '--icon-shadow': '0 8px 25px rgba(255, 107, 107, 0.3)',
                                        animationDelay: '1.5s'
                                    }}>
                                    <Zap size={36} color="white" />
                                </div>
                                <h5 className="fw-semibold mb-2">100% Free</h5>
                                <p className="text-muted-light small px-2">
                                    Create unlimited microsites for all your special occasions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA with Animated Gradient Background */}
            <section className="py-5 position-relative overflow-hidden">
                <div className="bg-decoration home-final-cta-decoration" />

                <div className="container position-relative z-index-10">
                    <div className="text-center py-5">
                        <h2 className="display-5 fw-bold mb-4 fade-in-up">
                            Ready to Create Something <span className="gradient-text-animated">Special</span>?
                        </h2>
                        <p className="lead text-muted-light mb-5 fade-in-up delay-1">
                            No login needed • Free forever • 2 minutes to create
                        </p>
                        <div className="fade-in-up delay-2">
                            <Link to="/create" className="btn btn-gradient btn-lg px-5 py-3 btn-ripple hover-glow">
                                <Sparkles size={20} className="me-2" />
                                Create Your Free Microsite
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;

