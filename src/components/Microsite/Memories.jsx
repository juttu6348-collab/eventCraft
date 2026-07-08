import { getEventConfig } from '../../utils/eventConfig';
import { generateMemories } from '../../utils/messageTemplates';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

function Memories({ event }) {
    const eventConfig = getEventConfig(event.eventType, event.relationship);
    const memories = generateMemories(event.eventType, event.relationship, event.receiverName, event.senderName);
    const [sparkles, setSparkles] = useState([]);
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [progress, setProgress] = useState(0);
    const [viewedCount, setViewedCount] = useState(0);
    const cardRefs = useRef([]);
    const progressLineRef = useRef(null);

    useEffect(() => {
        const newSparkles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 2
        }));
        setSparkles(newSparkles);
    }, []);

    // Scroll-triggered animations using IntersectionObserver
    useEffect(() => {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    setVisibleCards(prev => {
                        const newSet = new Set(prev);
                        newSet.add(index);
                        return newSet;
                    });
                }
            });
        }, observerOptions);

        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [memories]);

    // Progress line animation based on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!progressLineRef.current) return;

            const rect = progressLineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const lineHeight = rect.height;

            // Calculate how much of the line is visible
            const visibleTop = Math.max(0, windowHeight - rect.top);
            const visibleBottom = Math.min(lineHeight, windowHeight - rect.top);
            const visibleHeight = Math.max(0, Math.min(visibleBottom, lineHeight) - Math.max(0, -rect.top));

            const progressPercent = Math.min(100, Math.max(0, (visibleHeight / lineHeight) * 100));
            setProgress(progressPercent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update viewed count
    useEffect(() => {
        setViewedCount(visibleCards.size);
    }, [visibleCards]);

    // Milestone icons based on memory type
    const getMilestoneIcon = (index) => {
        const icons = ['🌱', '🌸', '🌟', '💫', '🎯', '👑'];
        return icons[index % icons.length];
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 9rem)',
            padding: '140px 0 150px',
            background: `
                radial-gradient(circle at 20% 30%, ${eventConfig.colors.primary}12 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${eventConfig.colors.secondary}12 0%, transparent 50%),
                linear-gradient(135deg, #0a0e27 0%, #0f172a 100%)
            `,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Sparkles */}
            {sparkles.map((sparkle) => (
                <div
                    key={`sparkle-${sparkle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                        width: '3px',
                        height: '3px',
                        background: eventConfig.colors.primary,
                        borderRadius: '50%',
                        animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
                        boxShadow: `0 0 8px ${eventConfig.colors.primary}80`,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        transform: 'translate3d(0, 0, 0)'
                    }}
                />
            ))}

            <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div className="text-center mb-5" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'pulse 3s ease-in-out infinite' }}>
                        🕰️
                    </div>
                    <h2
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: '800',
                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 4s linear infinite',
                            letterSpacing: '-0.02em',
                            marginBottom: '1rem'
                        }}
                    >
                        Cherished Memories
                    </h2>
                    <p style={{ color: '#cbd5e1', fontSize: '1.2rem', fontWeight: '500' }}>
                        Moments that made us smile ✨
                    </p>
                </div>

                {/* Journey Counter */}
                <div style={{
                    position: 'sticky',
                    top: '100px',
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}20, ${eventConfig.colors.secondary}20)`,
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${eventConfig.colors.primary}40`,
                        borderRadius: '50px',
                        padding: '1rem 2rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: `0 10px 40px ${eventConfig.colors.primary}30`,
                        animation: 'pulse 3s ease-in-out infinite'
                    }}>
                        <CheckCircle2 size={24} color={eventConfig.colors.primary} />
                        <span style={{
                            color: '#f8fafc',
                            fontSize: '1.1rem',
                            fontWeight: '700'
                        }}>
                            {viewedCount} of {memories.length} Memories Viewed
                        </span>
                    </div>
                </div>

                {/* Timeline with Animated Progress Line */}
                <div style={{ position: 'relative' }}>
                    {/* SVG Progress Line */}
                    <svg
                        ref={progressLineRef}
                        style={{
                            position: 'absolute',
                            left: 'calc(50% - 2px)',
                            top: 0,
                            width: '4px',
                            height: '100%',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    >
                        {/* Background line */}
                        <line
                            x1="2"
                            y1="0"
                            x2="2"
                            y2="100%"
                            stroke={`${eventConfig.colors.primary}30`}
                            strokeWidth="4"
                        />
                        {/* Animated progress line */}
                        <line
                            x1="2"
                            y1="0"
                            x2="2"
                            y2={`${progress}%`}
                            stroke={`url(#gradient-${eventConfig.colors.primary})`}
                            strokeWidth="4"
                            style={{
                                transition: 'y2 0.3s ease-out',
                                filter: `drop-shadow(0 0 10px ${eventConfig.colors.primary})`
                            }}
                        />
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id={`gradient-${eventConfig.colors.primary}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={eventConfig.colors.primary} />
                                <stop offset="100%" stopColor={eventConfig.colors.secondary} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Memory Cards */}
                    {memories.map((memory, index) => {
                        const isVisible = visibleCards.has(index);
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                ref={el => cardRefs.current[index] = el}
                                data-index={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                    marginBottom: '4rem',
                                    position: 'relative',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: `${0.1 * index}s`,
                                    willChange: 'transform, opacity'
                                }}
                            >
                                {/* Milestone Icon */}
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    width: '60px',
                                    height: '60px',
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    zIndex: 2,
                                    boxShadow: `
                                        0 10px 30px ${eventConfig.colors.primary}60,
                                        inset 0 2px 5px rgba(255, 255, 255, 0.3)
                                    `,
                                    border: '4px solid #0f172a',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
                                    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    transitionDelay: `${0.3 + 0.1 * index}s`,
                                    animation: isVisible ? 'pulse 3s ease-in-out infinite' : 'none',
                                    animationDelay: `${0.5 + 0.1 * index}s`
                                }}>
                                    {getMilestoneIcon(index)}
                                </div>

                                {/* Memory Card */}
                                <div style={{
                                    width: 'calc(50% - 60px)',
                                    marginLeft: isLeft ? 0 : '60px',
                                    marginRight: isLeft ? '60px' : 0
                                }}>
                                    {/* Polaroid-style card */}
                                    <div style={{
                                        background: '#fff',
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)',
                                        transform: `rotate(${isLeft ? -2 : 2}deg)`,
                                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                                            e.currentTarget.style.boxShadow = `0 20px 70px ${eventConfig.colors.primary}50, 0 10px 25px rgba(0, 0, 0, 0.4)`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = `rotate(${isLeft ? -2 : 2}deg) scale(1)`;
                                            e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)';
                                        }}
                                    >
                                        {/* Photo placeholder */}
                                        <div style={{
                                            width: '100%',
                                            paddingTop: '75%',
                                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}20, ${eventConfig.colors.secondary}20)`,
                                            borderRadius: '8px',
                                            marginBottom: '1.5rem',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                fontSize: '4rem'
                                            }}>
                                                {memory.emoji}
                                            </div>
                                        </div>

                                        {/* Year Badge */}
                                        <div style={{
                                            display: 'inline-block',
                                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                            color: 'white',
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '30px',
                                            fontSize: '0.9rem',
                                            fontWeight: '700',
                                            marginBottom: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            boxShadow: `0 5px 20px ${eventConfig.colors.primary}40`
                                        }}>
                                            {memory.year}
                                        </div>

                                        {/* Title */}
                                        <h4 style={{
                                            color: '#1e293b',
                                            fontSize: '1.5rem',
                                            fontWeight: '800',
                                            marginBottom: '0.75rem',
                                            lineHeight: '1.3'
                                        }}>
                                            {memory.title}
                                        </h4>

                                        {/* Description */}
                                        <p style={{
                                            color: '#475569',
                                            fontSize: '1rem',
                                            lineHeight: '1.7',
                                            margin: 0
                                        }}>
                                            {memory.description}
                                        </p>

                                        {/* Handwritten note */}
                                        <div style={{
                                            marginTop: '1.5rem',
                                            paddingTop: '1rem',
                                            borderTop: '2px dashed #e2e8f0',
                                            fontFamily: "'Brush Script MT', cursive",
                                            fontSize: '1.1rem',
                                            color: '#64748b',
                                            fontStyle: 'italic',
                                            textAlign: 'center'
                                        }}>
                                            A precious memory ✨
                                        </div>
                                    </div>

                                    {/* Connection line to center */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: isLeft ? 'calc(100% - 30px)' : '-30px',
                                        width: '30px',
                                        height: '2px',
                                        background: `linear-gradient(${isLeft ? '90deg' : '-90deg'}, ${eventConfig.colors.primary}, transparent)`,
                                        opacity: isVisible ? 1 : 0,
                                        transition: 'opacity 0.5s ease-out',
                                        transitionDelay: `${0.4 + 0.1 * index}s`
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Journey Complete Message */}
                {viewedCount === memories.length && (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '4rem',
                        animation: 'fadeInUp 1s ease-out, scaleIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1rem',
                            animation: 'bounce 2s ease-in-out infinite'
                        }}>
                            🎉
                        </div>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '0.5rem'
                        }}>
                            Journey Complete!
                        </h3>
                        <p style={{
                            color: '#cbd5e1',
                            fontSize: '1.2rem'
                        }}>
                            You've relived all {memories.length} beautiful memories ✨
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Memories;
