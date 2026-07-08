import { useState, useEffect, useRef } from 'react';
import { getEventConfig } from '../../utils/eventConfig';
import { generateMessage } from '../../utils/messageTemplates';

function Letter({ event }) {
    const eventConfig = getEventConfig(event.eventType, event.relationship);
    const [hearts, setHearts] = useState([]);
    const [sparkles, setSparkles] = useState([]);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showEnvelope, setShowEnvelope] = useState(true);
    const [sealStamped, setSealStamped] = useState(false);
    const typewriterSpeed = 30; // milliseconds per character
    const messageRef = useRef(null);

    const message = event.mainMessage || generateMessage(
        event.eventType,
        event.relationship,
        event.receiverName,
        event.senderName
    );

    useEffect(() => {
        // Generate 15 floating hearts
        const newHearts = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 6 + Math.random() * 4,
            drift: (Math.random() - 0.5) * 60
        }));
        setHearts(newHearts);

        // Generate sparkles
        const newSparkles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 2
        }));
        setSparkles(newSparkles);

        // Envelope opening sequence
        setTimeout(() => {
            setShowEnvelope(false);
        }, 2000);

        // Wax seal animation
        setTimeout(() => {
            setSealStamped(true);
        }, 4000);
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (!showEnvelope && message) {
            let currentIndex = 0;
            setDisplayedText('');
            setIsTyping(true);

            const timer = setInterval(() => {
                if (currentIndex < message.length) {
                    setDisplayedText(message.substring(0, currentIndex + 1));
                    currentIndex++;

                    // Auto-scroll to keep the typing in view
                    if (messageRef.current) {
                        messageRef.current.scrollTop = messageRef.current.scrollHeight;
                    }
                } else {
                    setIsTyping(false);
                    clearInterval(timer);
                }
            }, typewriterSpeed);

            return () => clearInterval(timer);
        }
    }, [showEnvelope, message]);

    return (
        <div
            style={{
                minHeight: 'calc(100vh - 9rem)',
                padding: '140px 0 150px',
                position: 'relative',
                background: `
                    radial-gradient(circle at 30% 20%, ${eventConfig.colors.primary}15 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, ${eventConfig.colors.secondary}15 0%, transparent 50%),
                    linear-gradient(135deg, #0a0e27 0%, #0f172a 100%)
                `,
                overflow: 'hidden'
            }}
        >
            {/* Sparkle Background */}
            {sparkles.map((sparkle) => (
                <div
                    key={`sparkle-${sparkle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                        width: '4px',
                        height: '4px',
                        background: eventConfig.colors.primary,
                        borderRadius: '50%',
                        animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
                        boxShadow: `0 0 10px ${eventConfig.colors.primary}80`,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        transform: 'translate3d(0, 0, 0)'
                    }}
                />
            ))}

            {/* Floating Hearts */}
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    style={{
                        position: 'absolute',
                        left: `${heart.left}%`,
                        bottom: '-60px',
                        fontSize: '2rem',
                        opacity: 0.6,
                        animation: `gentleWave ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
                        pointerEvents: 'none',
                        '--drift': `${heart.drift}px`,
                        willChange: 'transform, opacity',
                        transform: 'translate3d(0, 0, 0)'
                    }}
                >
                    💖
                </div>
            ))}

            <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
                {/* Envelope Opening Animation */}
                {showEnvelope && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '300px',
                            height: '200px',
                            perspective: '1000px'
                        }}>
                            {/* Envelope */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: '#f8f5f0',
                                border: `3px solid ${eventConfig.colors.primary}`,
                                borderRadius: '8px',
                                position: 'relative',
                                boxShadow: `0 20px 60px ${eventConfig.colors.primary}60`,
                                animation: 'pulse 2s ease-in-out infinite'
                            }}>
                                {/* Envelope flap */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '50%',
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}20, ${eventConfig.colors.secondary}20)`,
                                    borderBottom: `2px solid ${eventConfig.colors.primary}40`,
                                    transformOrigin: 'top center',
                                    animation: 'openEnvelope 1.5s ease-out 0.5s forwards',
                                    zIndex: 2
                                }} />

                                {/* Letter peeking out */}
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    right: '20px',
                                    bottom: '20px',
                                    background: 'white',
                                    borderRadius: '4px',
                                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1)',
                                    animation: 'slideUpLetter 1s ease-out 1s forwards',
                                    transform: 'translateY(0)',
                                    zIndex: 1
                                }} />

                                {/* Decorative lines */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '30px',
                                    right: '30px',
                                    transform: 'translateY(-50%)',
                                    zIndex: 3
                                }}>
                                    <div style={{
                                        height: '2px',
                                        background: eventConfig.colors.primary,
                                        marginBottom: '8px',
                                        opacity: 0.3
                                    }} />
                                    <div style={{
                                        height: '2px',
                                        background: eventConfig.colors.primary,
                                        marginBottom: '8px',
                                        opacity: 0.3
                                    }} />
                                    <div style={{
                                        height: '2px',
                                        background: eventConfig.colors.primary,
                                        opacity: 0.3
                                    }} />
                                </div>
                            </div>

                            {/* "Opening..." text */}
                            <p style={{
                                position: 'absolute',
                                bottom: '-50px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: eventConfig.colors.primary,
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                animation: 'pulse 1.5s ease-in-out infinite',
                                whiteSpace: 'nowrap'
                            }}>
                                Opening your letter...
                            </p>
                        </div>
                    </div>
                )}

                {/* Letter Content */}
                {!showEnvelope && (
                    <div style={{
                        animation: 'fadeInUp 1s ease-out, scaleIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    }}>
                        {/* Letter Content */}
                        <div
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '1rem',
                                padding: '4rem 3rem',
                                boxShadow: `
                                    0 30px 90px rgba(0, 0, 0, 0.4),
                                    0 10px 30px rgba(0, 0, 0, 0.3),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                                `,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                position: 'relative',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}
                        >
                            {/* Letterhead */}
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '3rem',
                                paddingBottom: '2rem',
                                borderBottom: `2px solid ${eventConfig.colors.primary}30`,
                                position: 'relative'
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '0.5rem',
                                    animation: 'bounce 2s ease-in-out infinite'
                                }}>
                                    {eventConfig.emoji}
                                </div>
                                <div style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    marginBottom: '0.5rem'
                                }}>
                                    A Special {event.eventType} Letter
                                </div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontStyle: 'italic'
                                }}>
                                    For {event.receiverName}
                                </div>
                            </div>

                            {/* Message with Typewriter Effect */}
                            <div
                                ref={messageRef}
                                style={{
                                    fontSize: '1.15rem',
                                    lineHeight: '2',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: "'Georgia', serif",
                                    marginBottom: '3rem',
                                    minHeight: '300px',
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    paddingRight: '1rem',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                    fontWeight: '400'
                                }}
                            >
                                {displayedText}
                                {isTyping && (
                                    <span style={{
                                        display: 'inline-block',
                                        width: '2px',
                                        height: '1.2em',
                                        background: eventConfig.colors.primary,
                                        marginLeft: '2px',
                                        animation: 'blink 1s step-end infinite',
                                        verticalAlign: 'middle'
                                    }} />
                                )}
                            </div>

                            {/* Decorative bottom border */}
                            <div style={{
                                width: '100px',
                                height: '3px',
                                background: `linear-gradient(90deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                margin: '2rem auto',
                                borderRadius: '2px',
                                opacity: isTyping ? 0 : 1,
                                transition: 'opacity 1s ease-in-out'
                            }} />

                            {/* Wax Seal */}
                            {!isTyping && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-30px',
                                    right: '50px',
                                    width: '80px',
                                    height: '80px',
                                    background: `radial-gradient(circle, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `
                                        0 10px 30px ${eventConfig.colors.primary}60,
                                        inset 0 2px 5px rgba(255, 255, 255, 0.3),
                                        inset 0 -2px 5px rgba(0, 0, 0, 0.3)
                                    `,
                                    border: '3px solid rgba(255, 255, 255, 0.2)',
                                    animation: sealStamped ? 'stampSeal 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both' : '',
                                    transform: sealStamped ? 'scale(1)' : 'scale(0)',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    willChange: 'transform'
                                }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.1) rotate(10deg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1) rotate(0deg)';
                                    }}
                                >
                                    💌
                                </div>
                            )}

                            {/* Paper edge effect */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                borderRadius: '1rem',
                                boxShadow: 'inset 0 0 50px rgba(139, 69, 19, 0.05)',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Additional CSS Animations */}
            <style>{`
                @keyframes openEnvelope {
                    0% {
                        transform: rotateX(0deg);
                    }
                    100% {
                        transform: rotateX(-180deg);
                    }
                }
                
                @keyframes slideUpLetter {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50px);
                    }
                }
                
                @keyframes blink {
                    0%, 50% {
                        opacity: 1;
                    }
                    51%, 100% {
                        opacity: 0;
                    }
                }
                
                @keyframes stampSeal {
                    0% {
                        transform: scale(0) translateY(-100px) rotate(180deg);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.2) translateY(0) rotate(-10deg);
                    }
                    100% {
                        transform: scale(1) translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default Letter;
