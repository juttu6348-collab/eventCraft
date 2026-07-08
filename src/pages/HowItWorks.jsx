import { Link } from 'react-router-dom';
import { FileText, Palette, Share2, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FloatingParticles from '../components/UI/FloatingParticles';

function HowItWorks() {
    const pages = [
        { name: 'Home', description: 'Welcome page with beautiful intro', emoji: '🏠' },
        { name: 'Letter', description: 'Heartfelt message with floating hearts', emoji: '💌' },
        { name: 'Gallery', description: 'Photo grid with lightbox view', emoji: '📸' },
        { name: 'Memories', description: 'Timeline of special moments', emoji: '⏳' },
        { name: 'Surprise', description: 'Confetti reveal with secret message', emoji: '🎉' }
    ];

    const faqs = [
        { q: 'Is it free?', a: 'Yes! EventCraft is 100% free. Create unlimited microsites for all your occasions.' },
        { q: 'Do I need to sign up?', a: 'No sign-up required! Just create and share instantly.' },
        { q: 'How long does it take?', a: 'Less than 2 minutes from start to finish.' },
        { q: 'Can I edit after creating?', a: 'Once created, microsites are permanent. But you can always create a new one!' }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* Hero with Particles */}
            <section className="position-relative py-5 overflow-hidden mt-nav">
                <FloatingParticles
                    emojis={['🎨', '✨', '🎯', '💫', '📝', '🚀']}
                    count={20}
                    speed="normal"
                />

                <div className="bg-decoration bg-decoration-purple" />

                <div className="container position-relative z-content">
                    <div className="text-center py-4">
                        <h1 className="display-4 fw-bold mb-3 fade-in-up">
                            How <span className="gradient-text-animated">EventCraft</span> Works
                        </h1>
                        <p className="lead text-muted-light px-3 fade-in-up delay-1">
                            Create beautiful event microsites in 3 simple steps
                        </p>
                    </div>
                </div>
            </section>

            {/* 3 Steps */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-5">
                        {/* Step 1 */}
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <div className="glass-card glass-card-hover p-4 p-md-5 fade-in-up">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="badge-circle-lg home-icon-circle-step"
                                                style={{
                                                    '--badge-bg': 'var(--gradient-pink-purple)',
                                                    '--badge-shadow': '0 8px 20px rgba(233, 30, 99, 0.3)'
                                                }}>
                                                <span className="fw-bold fs-4">1</span>
                                            </div>
                                            <Palette size={32} className="text-info pulse" />
                                        </div>
                                        <h4 className="fw-bold mb-3">Choose Occasion & Theme</h4>
                                        <p className="text-muted-light mb-4">
                                            Pick your event type (Birthday, Anniversary, Wedding, etc.) and select from 5 stunning themes
                                            that match your style.
                                        </p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                6 event types to choose from
                                            </li>
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                5 beautiful themes (Elegant, Minimal, Neon, Vintage, Ocean)
                                            </li>
                                            <li className="d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                Live preview of each theme
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center">
                                    <div className="icon-circle-xl hover-scale pulse home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-pink-purple)',
                                            '--icon-shadow': '0 20px 40px rgba(233, 30, 99, 0.4)'
                                        }}>
                                        <Palette size={70} color="white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="col-12">
                            <div className="row align-items-center flex-md-row-reverse">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <div className="glass-card glass-card-hover p-4 p-md-5 fade-in-up delay-1">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="badge-circle-lg home-icon-circle-step"
                                                style={{
                                                    '--badge-bg': 'var(--gradient-purple-blue)',
                                                    '--badge-shadow': '0 8px 20px rgba(156, 39, 176, 0.3)'
                                                }}>
                                                <span className="fw-bold fs-4">2</span>
                                            </div>
                                            <FileText size={32} className="text-info pulse pulse-delay-025" />
                                        </div>
                                        <h4 className="fw-bold mb-3">Add Names, Message & Photos</h4>
                                        <p className="text-muted-light mb-4">
                                            Fill in sender and receiver names, choose your relationship, and add your message.
                                            Upload your favorite photos to make it personal!
                                        </p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                20+ relationship options (Friend, Family, Partner, etc.)
                                            </li>
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                Upload up to 10 photos (or skip & use defaults)
                                            </li>
                                            <li className="d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                Fully customizable messages and content
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center">
                                    <div className="icon-circle-xl hover-scale pulse home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-purple-blue)',
                                            '--icon-shadow': '0 20px 40px rgba(156, 39, 176, 0.4)',
                                            animationDelay: '0.5s'
                                        }}>
                                        <FileText size={70} color="white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <div className="glass-card glass-card-hover p-4 p-md-5 fade-in-up delay-2">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="badge-circle-lg home-icon-circle-step"
                                                style={{
                                                    '--badge-bg': 'var(--gradient-pink-blue)',
                                                    '--badge-shadow': '0 8px 20px rgba(33, 150, 243, 0.3)'
                                                }}>
                                                <span className="fw-bold fs-4">3</span>
                                            </div>
                                            <Share2 size={32} className="text-info pulse pulse-delay-05" />
                                        </div>
                                        <h4 className="fw-bold mb-3">Get Unique Link & QR Code</h4>
                                        <p className="text-muted-light mb-4">
                                            Instantly get a shareable link and QR code. Share via WhatsApp, Instagram, Facebook or any platform.
                                        </p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                One-click copy link button
                                            </li>
                                            <li className="mb-2 d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                Downloadable QR code
                                            </li>
                                            <li className="d-flex align-items-center gap-2 small text-muted-light">
                                                <CheckCircle size={16} className="text-info flex-shrink-0" />
                                                Direct WhatsApp & social sharing
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center">
                                    <div className="icon-circle-xl hover-scale pulse home-icon-circle-step"
                                        style={{
                                            '--icon-bg': 'var(--gradient-pink-blue)',
                                            '--icon-shadow': '0 20px 40px rgba(33, 150, 243, 0.4)',
                                            animationDelay: '1s'
                                        }}>
                                        <Share2 size={70} color="white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Inside Section */}
            <section className="py-5 position-relative overflow-hidden bg-gradient-subtle">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3 fade-in-up">What's Inside a Microsite?</h2>
                        <p className="text-muted-light fade-in-up delay-1">Each microsite includes multiple beautiful pages</p>
                    </div>

                    <div className="row g-3">
                        {pages.map((page, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className={`glass-card  glass-card-hover p-4 h-100 fade-in-up delay-${index + 1}`}>
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <span className="font-size-2rem">{page.emoji}</span>
                                        <h6 className="fw-bold mb-0 gradient-text-animated">{page.name}</h6>
                                    </div>
                                    <p className="small text-muted-light mb-0 ps-5">{page.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <div className="icon-circle-md mb-3 pulse home-icon-circle-step"
                            style={{
                                '--icon-bg': 'var(--gradient-pink-purple)',
                                '--icon-shadow': '0 10px 25px rgba(233, 30, 99, 0.3)'
                            }}>
                            <HelpCircle size={40} color="white" />
                        </div>
                        <h2 className="h2 fw-bold mb-3 fade-in-up">Frequently Asked Questions</h2>
                        <p className="text-muted-light fade-in-up delay-1">Everything you need to know</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">
                                {faqs.map((faq, index) => (
                                    <div key={index} className={`glass-card glass-card-hover p-0 mb-3 overflow-hidden fade-in-up delay-${index + 1}`}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed bg-transparent text-light border-0 p-4"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#faq${index}`}
                                            >
                                                <strong className="gradient-text-animated">{faq.q}</strong>
                                            </button>
                                        </h2>
                                        <div id={`faq${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body bg-transparent text-muted-light border-top border-secondary pt-3">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center glass-card glass-card-hover p-4 p-md-5 bounce-in">
                        <h2 className="h3 fw-bold mb-4">
                            Ready to Get <span className="gradient-text-animated">Started</span>?
                        </h2>
                        <p className="text-muted-light mb-4">
                            Create your first microsite in under 2 minutes • No sign-up • Free forever
                        </p>
                        <Link to="/create" className="btn btn-gradient btn-lg px-5 btn-ripple hover-glow">
                            <Sparkles size={20} className="me-2" />
                            Create Your Microsite Now
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HowItWorks;

