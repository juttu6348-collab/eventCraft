import { useState, useEffect, useRef, useCallback } from 'react';
import { getEventConfig } from '../../utils/eventConfig';
import { generateSurpriseMessage } from '../../utils/messageTemplates';
import { Gift } from 'lucide-react';

function Surprise({ event }) {
    const eventConfig = getEventConfig(event.eventType, event.relationship);
    const [revealed, setRevealed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(false);
    const [sparkleTrail, setSparkleTrail] = useState([]);
    const canvasRef = useRef(null);
    const sparkleIdRef = useRef(0);
    const fireworksRef = useRef([]);
    const animationFrameRef = useRef(null);
    const containerRef = useRef(null);

    const surpriseMessage = generateSurpriseMessage(
        event.eventType,
        event.relationship,
        event.receiverName
    );

    // Sparkle trail effect
    useEffect(() => {
        if (!revealed) return;

        const handleMouseMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newSparkle = {
                id: sparkleIdRef.current++,
                x,
                y,
                color: Math.random() > 0.5 ? eventConfig.colors.primary : eventConfig.colors.secondary
            };

            setSparkleTrail(prev => [...prev.slice(-10), newSparkle]);

            setTimeout(() => {
                setSparkleTrail(prev => prev.filter(s => s.id !== newSparkle.id));
            }, 800);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, [revealed, eventConfig.colors]);

    // Canvas fireworks animation
    const drawFireworks = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        fireworksRef.current = fireworksRef.current.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= 1;
            particle.alpha = particle.life / 60;

            if (particle.life > 0) {
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                return true;
            }
            return false;
        });

        if (fireworksRef.current.length > 0) {
            animationFrameRef.current = requestAnimationFrame(drawFireworks);
        }
    }, []);

    const launchFirework = useCallback((x, y) => {
        const colors = [
            eventConfig.colors.primary,
            eventConfig.colors.secondary,
            '#fbbf24',
            '#f472b6',
            '#a78bfa',
            '#34d399'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Create explosion
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 2 + Math.random() * 4;
            fireworksRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 60,
                alpha: 1,
                color,
                size: 2 + Math.random() * 2
            });
        }

        drawFireworks();
    }, [eventConfig.colors, drawFireworks]);

    // Set canvas size
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const handleReveal = () => {
        if (isAnimating || showCountdown) return;

        setShowCountdown(true);
        setCountdown(3);

        // Countdown 3...2...1...
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    performReveal();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const performReveal = () => {
        setIsAnimating(true);
        setRevealed(true);
        setShowCountdown(false);

        // Screen shake
        if (containerRef.current) {
            containerRef.current.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.style.animation = '';
                }
            }, 500);
        }

        // Launch multiple fireworks
        const canvas = canvasRef.current;
        if (canvas) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Central explosion
            launchFirework(centerX, centerY);

            // Additional fireworks
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = centerX + (Math.random() - 0.5) * 400;
                    const y = centerY + (Math.random() - 0.5) * 300;
                    launchFirework(x, y);
                }, i * 200);
            }
        }

        // Create magical confetti burst
        for (let i = 0; i < 150; i++) {
            setTimeout(() => createConfetti(), i * 10);
        }

        setTimeout(() => setIsAnimating(false), 1000);
    };

    const createConfetti = () => {
        const confetti = document.createElement('div');
        const colors = [
            eventConfig.colors.primary,
            eventConfig.colors.secondary,
            '#fbbf24',
            '#f472b6',
            '#a78bfa',
            '#34d399'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const startX = 50 + (Math.random() - 0.5) * 30;
        const drift = (Math.random() - 0.5) * 200;

        confetti.style.cssText = `
            position: fixed;
            width: ${8 + Math.random() * 8}px;
            height: ${8 + Math.random() * 8}px;
            top: 50%;
            left: ${startX}%;
            background: ${randomColor};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${2.5 + Math.random() * 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px ${randomColor};
            --drift: ${drift}px;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    };

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: 'calc(100vh - 9rem)',
                padding: '140px 1rem 150px',
                background: `
                    radial-gradient(circle at 20% 30%, ${eventConfig.colors.primary}15 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, ${eventConfig.colors.secondary}15 0%, transparent 50%),
                    linear-gradient(135deg, #0a0e27 0%, #0f172a 100%)
                `,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Canvas for fireworks */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999
                }}
            />

            {/* Sparkle trail */}
            {sparkleTrail.map((sparkle) => (
                <div
                    key={`sparkle-${sparkle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${sparkle.x}px`,
                        top: `${sparkle.y}px`,
                        width: '6px',
                        height: '6px',
                        background: sparkle.color,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        animation: 'fadeOutScale 0.8s ease-out forwards',
                        boxShadow: `0 0 10px ${sparkle.color}, 0 0 20px ${sparkle.color}`,
                        zIndex: 100
                    }}
                />
            ))}

            <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
                <div className="text-center">
                    {!revealed ? (
                        <>
                            {/* Countdown Overlay */}
                            {showCountdown && (
                                <div style={{
                                    position: 'fixed',
                                    inset: 0,
                                    background: 'rgba(0, 0, 0, 0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10000,
                                    animation: 'fadeIn 0.3s ease-out'
                                }}>
                                    <div style={{
                                        fontSize: 'clamp(8rem, 20vw, 15rem)',
                                        fontWeight: '900',
                                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        animation: countdown > 0 ? 'countdownPulse 1s ease-out' : 'countdownExplode 0.5s ease-out',
                                        transformOrigin: 'center',
                                        filter: `drop-shadow(0 0 50px ${eventConfig.colors.primary})`
                                    }}>
                                        {countdown > 0 ? countdown : '🎉'}
                                    </div>
                                </div>
                            )}

                            <h2
                                className="mb-4"
                                style={{
                                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                    fontWeight: '900',
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    marginBottom: '3rem',
                                    animation: 'fadeInUp 1s ease-out, shimmer 5s linear infinite',
                                    backgroundSize: '200% auto'
                                }}
                            >
                                Ready for a Surprise?
                            </h2>

                            {/* 3D Gift Box */}
                            <div style={{
                                perspective: '1000px',
                                margin: '4rem auto',
                                animation: 'fadeInUp 1s ease-out 0.3s both'
                            }}>
                                <div style={{
                                    width: '200px',
                                    height: '200px',
                                    margin: '0 auto',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                    animation: 'rotateGift 10s ease-in-out infinite',
                                    filter: `drop-shadow(0 20px 60px ${eventConfig.colors.primary}60)`
                                }}>
                                    <div style={{
                                        width: '200px',
                                        height: '200px',
                                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        boxShadow: `0 20px 60px ${eventConfig.colors.primary}60, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                                        animation: 'pulse 3s ease-in-out infinite'
                                    }}>
                                        <Gift size={80} color="white" />

                                        {/* Ribbon */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '30px',
                                            height: '100%',
                                            background: 'rgba(255, 255, 255, 0.3)',
                                            backdropFilter: 'blur(5px)'
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 0,
                                            transform: 'translateY(-50%)',
                                            width: '100%',
                                            height: '30px',
                                            background: 'rgba(255, 255, 255, 0.3)',
                                            backdropFilter: 'blur(5px)'
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleReveal}
                                className="btn btn-lg"
                                disabled={isAnimating || showCountdown}
                                style={{
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    borderRadius: '60px',
                                    padding: '1.5rem 4rem',
                                    boxShadow: `0 15px 50px ${eventConfig.colors.primary}60, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    cursor: isAnimating || showCountdown ? 'not-allowed' : 'pointer',
                                    opacity: isAnimating || showCountdown ? 0.6 : 1,
                                    animation: 'fadeInUp 1s ease-out 0.6s both, bounceSubtle 2s ease-in-out infinite 1.6s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isAnimating && !showCountdown) {
                                        e.target.style.transform = 'translateY(-8px) scale(1.08)';
                                        e.target.style.boxShadow = `0 20px 70px ${eventConfig.colors.primary}80, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                    e.target.style.boxShadow = `0 15px 50px ${eventConfig.colors.primary}60, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                                }}
                            >
                                Reveal Surprise! 🎁
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Revealed Content */}
                            <div style={{ animation: 'fadeInUp 0.8s ease-out, scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
                                <div style={{
                                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                                    marginBottom: '2rem',
                                    animation: 'bounce 1s ease-out, rotateIn 0.8s ease-out',
                                    filter: `drop-shadow(0 15px 50px ${eventConfig.colors.primary}80)`
                                }}>
                                    🎉
                                </div>

                                <h2
                                    className="mb-4"
                                    style={{
                                        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                        fontWeight: '900',
                                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        marginBottom: '2rem',
                                        animation: 'shimmer 3s linear infinite',
                                        backgroundSize: '200% auto'
                                    }}
                                >
                                    Surprise!
                                </h2>

                                <div
                                    style={{
                                        background: 'rgba(20, 30, 50, 0.95)',
                                        borderRadius: '2rem',
                                        padding: '3rem 2.5rem',
                                        border: `2px solid ${eventConfig.colors.primary}40`,
                                        boxShadow: `0 20px 60px ${eventConfig.colors.primary}40`,
                                        backdropFilter: 'blur(20px)',
                                        marginTop: '3rem',
                                        animation: 'fadeInUp 1s ease-out 0.3s both'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '1.3rem',
                                        lineHeight: '2',
                                        color: '#e2e8f0',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {surpriseMessage}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Additional CSS */}
            <style>{`
                @keyframes screenShake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
                
                @keyframes countdownPulse {
                    0% {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes countdownExplode {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
                
                @keyframes rotateGift {
                    0%, 100% {
                        transform: rotateY(0deg) rotateX(0deg);
                    }
                    25% {
                        transform: rotateY(15deg) rotateX(5deg);
                    }
                    50% {
                        transform: rotateY(0deg) rotateX(10deg);
                    }
                    75% {
                        transform: rotateY(-15deg) rotateX(5deg);
                    }
                }
                
                @keyframes rotateIn {
                    0% {
                        transform: rotate(-200deg) scale(0);
                        opacity: 0;
                    }
                    100% {
                        transform: rotate(0deg) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes bounceSubtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </div>
    );
}

export default Surprise;
