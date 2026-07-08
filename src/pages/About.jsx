import { Link } from 'react-router-dom';
import { Heart, Target, Users, Sparkles, Award, Zap, Shield } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FloatingParticles from '../components/UI/FloatingParticles';

function About() {
    const values = [
        {
            icon: Heart,
            title: 'Celebrate Every Moment',
            description: 'We believe every special moment deserves to be celebrated beautifully, whether it\'s a birthday, anniversary, or any milestone.',
            color: '#e91e63',
            gradient: 'var(--gradient-pink-purple)'
        },
        {
            icon: Target,
            title: 'Simple & Powerful',
            description: 'Create stunning microsites without any technical knowledge. Just fill in the details and we handle the rest.',
            color: '#2196f3',
            gradient: 'var(--gradient-purple-blue)'
        },
        {
            icon: Users,
            title: 'Connect People',
            description: 'Bring people together through shared memories and heartfelt celebrations that last forever.',
            color: '#9c27b0',
            gradient: 'var(--gradient-pink-blue)'
        }
    ];

    const features = [
        {
            icon: Sparkles,
            title: 'Beautiful Themes',
            description: '5 professionally designed themes to match any occasion and personal style',
            gradient: 'var(--gradient-pink-purple)'
        },
        {
            icon: Award,
            title: 'Multiple Pages',
            description: 'Letter, Gallery, Memories, Surprise and more in one beautiful microsite',
            gradient: 'var(--gradient-purple-blue)'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Create a complete multi-page microsite in under 2 minutes. No sign-up required.',
            gradient: 'var(--gradient-pink-blue)'
        },
        {
            icon: Shield,
            title: 'Free Forever',
            description: 'No hidden costs, no premium tiers. Create unlimited microsites completely free.',
            gradient: 'var(--gradient-warm)'
        }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Hero Section with Floating Particles */}
            <section className="position-relative py-5 overflow-hidden mt-nav">
                {/* Floating Particles */}
                <FloatingParticles
                    emojis={['❤️', '🌟', '✨', '💫', '🎉', '💝']}
                    count={25}
                    speed="slow"
                />

                <div className="bg-decoration bg-orb-about-1" />
                <div className="bg-decoration bg-decoration-fast bg-orb-about-2" />

                <div className="container position-relative z-content">
                    <div className="row justify-content-center text-center py-5">
                        <div className="col-lg-8 fade-in-up">
                            <h1 className="display-4 fw-bold mb-4">
                                About <span className="gradient-text-animated">EventCraft</span>
                            </h1>
                            <p className="lead text-muted-light px-2">
                                We're on a mission to make celebrating life's special moments easier,
                                more beautiful, and more memorable than ever before.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="glass-card glass-card-hover p-4 p-md-5 scale-in">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="icon-circle-sm home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-pink-purple)',
                                            '--icon-shadow': '0 8px 20px rgba(233, 30, 99, 0.3)'
                                        }}>
                                        <Sparkles size={28} color="white" />
                                    </div>
                                    <h2 className="h3 mb-0">Our Mission</h2>
                                </div>
                                <p className="lead text-muted-light mb-4">
                                    EventCraft was born from a simple idea: everyone should be able to create
                                    beautiful, personalized event experiences without needing to be a designer or developer.
                                </p>
                                <p className="text-muted-light mb-4">
                                    In today's digital age, we send quick messages and emojis to celebrate special moments.
                                    But what if you could create something more meaningful? Something your loved ones can
                                    revisit, share, and treasure?
                                </p>
                                <p className="text-muted-light mb-0">
                                    That's why we built EventCraft - to give everyone the power to create stunning,
                                    multi-page digital experiences filled with heartfelt messages, cherished photos,
                                    and beautiful memories. <strong className="text-white">No coding. No design skills. Just love.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-5 position-relative overflow-hidden bg-gradient-subtle">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3 fade-in-up">
                            What We <span className="gradient-text-animated">Believe In</span>
                        </h2>
                        <p className="text-muted-light fade-in-up delay-1">Our core values guide everything we do</p>
                    </div>

                    <div className="row g-4 mb-5">
                        {values.map((value, index) => (
                            <div key={index} className="col-md-4">
                                <div className={`glass-card glass-card-hover p-4 h-100 text-center fade-in-up delay-${index + 1}`}>
                                    <div className="icon-circle-md-rounded pulse home-icon-circle-step"
                                        style={{
                                            '--icon-bg': value.gradient,
                                            '--icon-shadow': `${value.color}40`,
                                            animationDelay: `${index * 0.5}s`
                                        }}>
                                        <value.icon size={36} color="white" />
                                    </div>
                                    <h5 className="fw-bold mb-3">{value.title}</h5>
                                    <p className="text-muted-light small mb-0">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features That Make Us Special */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3 fade-in-up">
                            What Makes Us <span className="gradient-text-animated">Special</span>
                        </h2>
                        <p className="text-muted-light fade-in-up delay-1">Built with care for your special moments</p>
                    </div>

                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className={`text-center h-100 fade-in-up delay-${index + 1} hover-scale`}>
                                    <div className="icon-circle-md-rounded pulse home-icon-circle-step"
                                        style={{
                                            '--icon-bg': feature.gradient,
                                            '--icon-shadow': '0 8px 25px rgba(233, 30, 99, 0.3)',
                                            animationDelay: `${index * 0.5}s`
                                        }}>
                                        <feature.icon size={36} color="white" />
                                    </div>
                                    <h6 className="fw-semibold mb-2">{feature.title}</h6>
                                    <p className="text-muted-light small mb-0 px-2">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-5 position-relative overflow-hidden bg-gradient-subtle">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h2 className="h2 fw-bold mb-4 fade-in-up">
                                Built with <span className="gradient-text-animated">❤️</span> for You
                            </h2>
                            <p className="lead text-muted-light mb-5 fade-in-up delay-1">
                                Whether it's a birthday, wedding, anniversary, or any special occasion,
                                EventCraft gives you the tools to create something truly unique.
                            </p>

                            <div className="glass-card glass-card-hover p-4 p-md-5 d-inline-flex flex-wrap align-items-center justify-content-center gap-4 gap-md-5 fade-in-up delay-2">
                                <div className="text-center scale-in delay-1">
                                    <div className="display-4 fw-bold gradient-text-animated mb-2">10K+</div>
                                    <div className="small text-muted-light">Events Created</div>
                                </div>
                                <div className="vr vr-custom d-none d-md-block"></div>
                                <div className="text-center scale-in delay-2">
                                    <div className="display-4 fw-bold gradient-text-animated mb-2">5</div>
                                    <div className="small text-muted-light">Beautiful Themes</div>
                                </div>
                                <div className="vr vr-custom d-none d-md-block"></div>
                                <div className="text-center scale-in delay-3">
                                    <div className="display-4 fw-bold gradient-text-animated mb-2">2min</div>
                                    <div className="small text-muted-light">Average Creation Time</div>
                                </div>
                                <div className="vr vr-custom d-none d-md-block"></div>
                                <div className="text-center scale-in delay-4">
                                    <div className="display-4 fw-bold gradient-text-animated mb-2">100%</div>
                                    <div className="small text-muted-light">Free Forever</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="glass-card glass-card-hover p-4 p-md-5 text-center bounce-in">
                                <h2 className="h3 fw-bold mb-4">
                                    Ready to Create Something <span className="gradient-text-animated">Magical</span>?
                                </h2>
                                <p className="text-muted-light mb-4">
                                    Join thousands of people creating unforgettable event experiences
                                </p>
                                <Link to="/create" className="btn btn-gradient btn-lg px-5 btn-ripple hover-glow">
                                    <Sparkles size={20} className="me-2" />
                                    Start Creating Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;

