import { useNavigate } from 'react-router-dom';
import { getEventConfig } from '../../utils/eventConfig';
import { useState, useEffect, useRef } from 'react';
import { Share2 } from 'lucide-react';

function Hero({ event }) {
    const navigate = useNavigate();
    const eventConfig = getEventConfig(event.eventType, event.relationship);
    const [particles, setParticles] = useState([]);
    const [stars, setStars] = useState([]);
    const [mouseTrail, setMouseTrail] = useState([]);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const containerRef = useRef(null);
    const trailIdRef = useRef(0);

    useEffect(() => {
        // Generate 20 floating particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 3,
            drift: (Math.random() - 0.5) * 40
        }));
        setParticles(newParticles);

        // Generate 40 twinkling stars
        const newStars = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 2,
            size: 1 + Math.random() * 2
        }));
        setStars(newStars);
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setParallaxOffset(scrollY * 0.5);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse trail effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newParticle = {
                id: trailIdRef.current++,
                x,
                y,
                color: Math.random() > 0.5 ? eventConfig.colors.primary : eventConfig.colors.secondary
            };

            setMouseTrail(prev => [...prev.slice(-8), newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setMouseTrail(prev => prev.filter(p => p.id !== newParticle.id));
            }, 1000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, [eventConfig.colors]);

    // Countdown timer
    useEffect(() => {
        if (!event.date) return;

        const updateCountdown = () => {
            const eventDate = event.date.seconds
                ? new Date(event.date.seconds * 1000)
                : new Date(event.date);

            const now = new Date();
            const diff = eventDate - now;

            if (diff > 0) {
                setCountdown({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                });
            } else {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [event.date]);

    const handleExplore = () => {
        const firstPage = event.enabledPages?.find(p => p !== 'home') || 'letter';
        navigate(`/e/${event.slug}/${firstPage}`);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${event.eventType} for ${event.receiverName}`,
                    text: `Check out this special ${event.eventType} celebration!`,
                    url
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(url);
                }
            }
        } else {
            copyToClipboard(url);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    const formatDate = (dateObj) => {
        if (!dateObj) return '';
        const date = dateObj.seconds ? new Date(dateObj.seconds * 1000) : new Date(dateObj);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 1rem 4rem',
                position: 'relative',
                overflow: 'hidden',
                background: `
                    radial-gradient(circle at 20% 30%, ${eventConfig.colors.primary}25 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, ${eventConfig.colors.secondary}25 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, ${eventConfig.colors.primary}10 0%, transparent 70%),
                    linear-gradient(135deg, #0a0e27 0%, #0f172a 100%)
                `
            }}
        >
            {/* Animated Gradient Mesh Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
                pointerEvents: 'none',
                transform: `translateY(${parallaxOffset}px)`
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: `radial-gradient(circle, ${eventConfig.colors.primary}80, transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 20s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '500px',
                    height: '500px',
                    background: `radial-gradient(circle, ${eventConfig.colors.secondary}80, transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 25s ease-in-out infinite reverse'
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: `radial-gradient(circle, ${eventConfig.colors.primary}60, transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 15s ease-in-out infinite'
                }} />
            </div>

            {/* Twinkling stars */}
            {stars.map((star) => (
                <div
                    key={`star-${star.id}`}
                    style={{
                        position: 'absolute',
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        background: '#fff',
                        borderRadius: '50%',
                        animation: `sparkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                        boxShadow: '0 0 4px #fff',
                        pointerEvents: 'none',
                        transform: `translateY(${parallaxOffset * 0.3}px)`
                    }}
                />
            ))}

            {/* Floating emoji particles */}
            {particles.map((particle) => (
                <div
                    key={`particle-${particle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${particle.left}%`,
                        bottom: '-50px',
                        fontSize: '2rem',
                        animation: `gentleWave ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                        pointerEvents: 'none',
                        opacity: 0.7,
                        '--drift': `${particle.drift}px`
                    }}
                >
                    {eventConfig.emoji}
                </div>
            ))}

            {/* Mouse trail particles */}
            {mouseTrail.map((particle) => (
                <div
                    key={`trail-${particle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: '8px',
                        height: '8px',
                        background: particle.color,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        animation: 'fadeOutScale 1s ease-out forwards',
                        boxShadow: `0 0 10px ${particle.color}`
                    }}
                />
            ))}

            {/* Main Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
                <div className="text-center">
                    {/* Centered wrapper for badge and emoji */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Event Type Badge */}
                        <div
                            style={{
                                display: 'inline-block',
                                padding: '0.75rem 2rem',
                                marginBottom: '2rem',
                                background: `linear-gradient(135deg, ${eventConfig.colors.primary}30, ${eventConfig.colors.secondary}30)`,
                                border: `2px solid ${eventConfig.colors.primary}`,
                                borderRadius: '50px',
                                backdropFilter: 'blur(10px)',
                                fontSize: '1rem',
                                fontWeight: '700',
                                color: eventConfig.colors.primary,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                boxShadow: `0 8px 32px ${eventConfig.colors.primary}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                                animation: 'pulse 3s ease-in-out infinite, shimmer 4s linear infinite',
                                backgroundSize: '200% auto',
                                willChange: 'transform',
                                transform: 'translate3d(0, 0, 0)'
                            }}
                        >
                            {event.eventType}
                        </div>

                        {/* Main Emoji with Pulsing Rings */}
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}>
                            {/* Pulsing rings */}
                            {[1, 2, 3].map((ring) => (
                                <div
                                    key={`ring-${ring}`}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '100%',
                                        height: '100%',
                                        border: `3px solid ${eventConfig.colors.primary}`,
                                        borderRadius: '50%',
                                        animation: `pulseRing ${2 + ring * 0.5}s ease-out infinite`,
                                        animationDelay: `${ring * 0.3}s`,
                                        pointerEvents: 'none'
                                    }}
                                />
                            ))}

                            <div style={{
                                fontSize: 'clamp(5rem, 15vw, 10rem)',
                                animation: 'bounce 3s ease-in-out infinite',
                                filter: `drop-shadow(0 15px 50px ${eventConfig.colors.primary}80)`,
                                position: 'relative',
                                zIndex: 2,
                                willChange: 'transform',
                                transform: 'translate3d(0, 0, 0)',
                                lineHeight: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {eventConfig.emoji}
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 5s linear infinite, fadeInUp 1s ease-out',
                            letterSpacing: '-0.02em',
                            lineHeight: '1.1',
                            textShadow: `0 0 40px ${eventConfig.colors.primary}30`,
                            filter: `drop-shadow(0 5px 15px ${eventConfig.colors.primary}40)`
                        }}
                    >
                        {event.receiverName}
                    </h1>

                    {/* Date */}
                    {event.date && (
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#cbd5e1',
                            marginBottom: '3rem',
                            fontWeight: '500',
                            animation: 'fadeIn 1.2s ease-out 0.3s both'
                        }}>
                            📅 {formatDate(event.date)}
                        </p>
                    )}

                    {/* Countdown Timer */}
                    {countdown.days + countdown.hours + countdown.minutes + countdown.seconds > 0 && (
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            marginBottom: '3rem',
                            animation: 'fadeInUp 1s ease-out 0.5s both'
                        }}>
                            {[
                                { label: 'Days', value: countdown.days },
                                { label: 'Hours', value: countdown.hours },
                                { label: 'Mins', value: countdown.minutes },
                                { label: 'Secs', value: countdown.seconds }
                            ].map((item, index) => (
                                <div
                                    key={item.label}
                                    style={{
                                        background: `linear-gradient(135deg, rgba(20, 30, 50, 0.95), rgba(15, 23, 42, 0.95))`,
                                        borderRadius: '1rem',
                                        padding: '1.5rem 1rem',
                                        minWidth: '80px',
                                        border: `2px solid ${eventConfig.colors.primary}40`,
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: `0 10px 30px ${eventConfig.colors.primary}20`,
                                        animation: `scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.7 + index * 0.1}s both`
                                    }}
                                >
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        lineHeight: '1',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        fontWeight: '600'
                                    }}>
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sender */}
                    <p style={{
                        fontSize: '1.4rem',
                        color: '#f1f5f9',
                        marginBottom: '3rem',
                        fontWeight: '500',
                        animation: 'fadeIn 1.4s ease-out 0.6s both'
                    }}>
                        From {event.senderName} with{' '}
                        <span style={{
                            display: 'inline-block',
                            animation: 'heartbeat 1.5s ease-in-out infinite'
                        }}>
                            💕
                        </span>
                    </p>

                    {/* Explore Button */}
                    <button
                        onClick={handleExplore}
                        className="btn btn-lg"
                        style={{
                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                            border: 'none',
                            color: 'white',
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            borderRadius: '60px',
                            padding: '1.2rem 3rem',
                            boxShadow: `0 15px 50px ${eventConfig.colors.primary}60, 0 5px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            animation: 'fadeInUp 1s ease-out 0.8s both'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-8px) scale(1.08)';
                            e.target.style.boxShadow = `0 20px 70px ${eventConfig.colors.primary}80, 0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = `0 15px 50px ${eventConfig.colors.primary}60, 0 5px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>Explore ✨</span>
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                            transform: 'rotate(45deg)',
                            animation: 'shimmer 3s infinite'
                        }} />
                    </button>

                    {/* Scroll Indicator */}
                    <div style={{
                        marginTop: '4rem',
                        animation: 'fadeIn 1.6s ease-out 1s both'
                    }}>
                        <div style={{
                            width: '30px',
                            height: '50px',
                            border: `3px solid ${eventConfig.colors.primary}`,
                            borderRadius: '25px',
                            margin: '0 auto',
                            position: 'relative',
                            filter: `drop-shadow(0 5px 15px ${eventConfig.colors.primary}60)`
                        }}>
                            <div style={{
                                width: '6px',
                                height: '10px',
                                background: eventConfig.colors.primary,
                                borderRadius: '3px',
                                position: 'absolute',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                animation: 'scrollIndicator 2s ease-in-out infinite'
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Magical bottom gradient */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: `linear-gradient(to top, ${eventConfig.colors.primary}15, transparent)`,
                pointerEvents: 'none'
            }} />

            {/* Share Floating Action Button */}
            <button
                onClick={handleShare}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: `0 10px 30px ${eventConfig.colors.primary}60`,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: 1000,
                    animation: 'pulse 3s ease-in-out infinite'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1) rotate(15deg)';
                    e.target.style.boxShadow = `0 15px 40px ${eventConfig.colors.primary}80`;
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.boxShadow = `0 10px 30px ${eventConfig.colors.primary}60`;
                }}
                aria-label="Share"
            >
                <Share2 size={24} />
            </button>

            {/* Additional CSS animations needed */}
            <style>{`
                @keyframes pulseRing {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }
                
                @keyframes fadeOutScale {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0);
                    }
                }
                
                @keyframes scrollIndicator {
                    0%, 100% {
                        top: 10px;
                        opacity: 1;
                    }
                    50% {
                        top: 25px;
                        opacity: 0.3;
                    }
                }
            `}</style>
        </div>
    );
}

export default Hero;
