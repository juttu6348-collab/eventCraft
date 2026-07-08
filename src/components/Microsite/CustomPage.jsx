import { getEventConfig } from '../../utils/eventConfig';
import { useState, useEffect } from 'react';
import { ExternalLink, Heart, Star } from 'lucide-react';

function CustomPage({ event }) {
    const eventConfig = getEventConfig(event.eventType);
    const customData = event.customPageData || { title: '', body: '' };
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const newSparkles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 2
        }));
        setSparkles(newSparkles);
    }, []);

    // Rich text parser for markdown-style formatting
    const parseRichText = (text) => {
        if (!text) return null;

        const lines = text.split('\n');
        const elements = [];

        lines.forEach((line, index) => {
            // Quote blocks (lines starting with >)
            if (line.trim().startsWith('>')) {
                elements.push(
                    <blockquote
                        key={index}
                        style={{
                            margin: '2rem 0',
                            padding: '1.5rem 2rem',
                            borderLeft: `4px solid ${eventConfig.colors.primary}`,
                            background: `linear-gradient(90deg, ${eventConfig.colors.primary}10, transparent)`,
                            fontStyle: 'italic',
                            fontSize: '1.3rem',
                            color: '#f8fafc',
                            borderRadius: '0 8px 8px 0',
                            boxShadow: `0 5px 20px ${eventConfig.colors.primary}20`
                        }}
                    >
                        {line.substring(1).trim()}
                    </blockquote>
                );
                return;
            }

            // Dividers (lines with ---)
            if (line.trim() === '---') {
                elements.push(
                    <div
                        key={index}
                        style={{
                            margin: '3rem auto',
                            textAlign: 'center',
                            position: 'relative',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary}, transparent)`,
                            opacity: 0.5
                        }} />
                        <div style={{
                            position: 'relative',
                            background: '#0f172a',
                            padding: '0 1rem',
                            fontSize: '1.5rem'
                        }}>
                            ✨
                        </div>
                    </div>
                );
                return;
            }

            // Headings (lines starting with #)
            const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const text = headingMatch[2];
                const sizes = ['2.5rem', '2rem', '1.5rem'];
                elements.push(
                    <h3
                        key={index}
                        style={{
                            fontSize: sizes[level - 1],
                            fontWeight: '800',
                            background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                            animation: 'fadeInUp 0.6s ease-out'
                        }}
                    >
                        {text}
                    </h3>
                );
                return;
            }

            // CTA buttons (lines starting with [Button:])
            const buttonMatch = line.match(/^\[Button:\s*(.+?)\s*\|\s*(.+?)\]$/);
            if (buttonMatch) {
                const buttonText = buttonMatch[1];
                const buttonLink = buttonMatch[2];
                elements.push(
                    <div key={index} style={{ textAlign: 'center', margin: '2rem 0' }}>
                        <a
                            href={buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 2.5rem',
                                background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                boxShadow: `0 10px 30px ${eventConfig.colors.primary}60`,
                                transition: 'all 0.3s ease',
                                border: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                                e.target.style.boxShadow = `0 15px 40px ${eventConfig.colors.primary}80`;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.boxShadow = `0 10px 30px ${eventConfig.colors.primary}60`;
                            }}
                        >
                            {buttonText}
                            <ExternalLink size={18} />
                        </a>
                    </div>
                );
                return;
            }

            // Empty lines
            if (line.trim() === '') {
                elements.push(<br key={index} />);
                return;
            }

            // Regular text with inline formatting
            let formatted = line;

            // Bold (**text**)
            formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong style="color: ' + eventConfig.colors.primary + '; font-weight: 800;">$1</strong>');

            // Italic (*text*)
            formatted = formatted.replace(/\*(.+?)\*/g, '<em style="color: #cbd5e1;">$1</em>');

            // Highlight (==text==)
            formatted = formatted.replace(/==(.+?)==/g, '<mark style="background: linear-gradient(135deg, ' + eventConfig.colors.primary + '30, ' + eventConfig.colors.secondary + '30); color: #fff; padding: 0.2rem 0.5rem; border-radius: 4px;">$1</mark>');

            elements.push(
                <p
                    key={index}
                    style={{
                        color: '#e2e8f0',
                        fontSize: '1.15rem',
                        lineHeight: '1.9',
                        marginBottom: '1rem'
                    }}
                    dangerouslySetInnerHTML={{ __html: formatted }}
                />
            );
        });

        return elements;
    };

    if (!customData.title && !customData.body) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 9rem)',
                padding: '140px 0 150px',
                background: `
                    radial-gradient(circle at 20% 30%, ${eventConfig.colors.primary}12 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, ${eventConfig.colors.secondary}12 0%, transparent 50%),
                    linear-gradient(135deg, #0a0e27 0%, #0f172a 100%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="text-center">
                    <div style={{
                        fontSize: '6rem',
                        marginBottom: '1.5rem',
                        opacity: 0.6,
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>📝</div>
                    <h3 style={{
                        color: '#cbd5e1',
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                    }}>No Custom Content</h3>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1.2rem'
                    }}>This page hasn't been customized yet</p>
                </div>
            </div>
        );
    }

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
            overflow: 'hidden',
            backgroundAttachment: 'fixed'
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

            {/* Subtle pattern overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    radial-gradient(circle at 20px 20px, ${eventConfig.colors.primary}05 1px, transparent 1px),
                    radial-gradient(circle at 60px 60px, ${eventConfig.colors.secondary}05 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                opacity: 0.5,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
                {/* Custom Content Card */}
                <div
                    style={{
                        background: 'rgba(20, 30, 50, 0.95)',
                        borderRadius: '2rem',
                        border: `2px solid ${eventConfig.colors.primary}40`,
                        boxShadow: `0 20px 70px ${eventConfig.colors.primary}30`,
                        overflow: 'hidden',
                        animation: 'fadeInUp 0.8s ease-out, scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    {/* Gradient top border */}
                    <div style={{
                        height: '4px',
                        background: `linear-gradient(90deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                        animation: 'shimmer 3s linear infinite',
                        backgroundSize: '200% auto'
                    }} />

                    {/* Header */}
                    {customData.title && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '3rem 2rem 2rem',
                                background: `linear-gradient(135deg, ${eventConfig.colors.primary}15, ${eventConfig.colors.secondary}15)`,
                                borderBottom: `1px solid ${eventConfig.colors.primary}30`,
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                animation: 'bounce 2s ease-in-out infinite'
                            }}>
                                {eventConfig.emoji}
                            </div>
                            <h2
                                style={{
                                    background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: '900',
                                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                                    marginBottom: '0',
                                    letterSpacing: '-0.02em',
                                    animation: 'shimmer 4s linear infinite',
                                    backgroundSize: '200% auto'
                                }}
                            >
                                {customData.title}
                            </h2>

                            {/* Decorative stars */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginTop: '1.5rem',
                                fontSize: '1.5rem',
                                opacity: 0.6
                            }}>
                                <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>⭐</span>
                                <span style={{ animation: 'pulse 2s ease-in-out 0.3s infinite' }}>✨</span>
                                <span style={{ animation: 'pulse 2s ease-in-out 0.6s infinite' }}>💫</span>
                            </div>
                        </div>
                    )}

                    {/* Body Content with Rich Text */}
                    {customData.body && (
                        <div style={{
                            padding: '3rem 2.5rem',
                            wordWrap: 'break-word'
                        }}>
                            {parseRichText(customData.body)}

                            {/* Footer decoration */}
                            <div style={{
                                marginTop: '3rem',
                                paddingTop: '2rem',
                                borderTop: `2px dashed ${eventConfig.colors.primary}30`,
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    color: eventConfig.colors.primary,
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    animation: 'pulse 3s ease-in-out infinite'
                                }}>
                                    <Heart size={20} fill={eventConfig.colors.primary} />
                                    <span>Made with love</span>
                                    <Heart size={20} fill={eventConfig.colors.primary} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Formatting Guide Hint */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(20, 30, 50, 0.6)',
                    borderRadius: '1rem',
                    border: `1px solid ${eventConfig.colors.primary}20`,
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.9rem',
                    color: '#94a3b8',
                    animation: 'fadeIn 1s ease-out 0.5s both'
                }}>
                    <div style={{
                        fontWeight: '700',
                        color: eventConfig.colors.primary,
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Star size={16} />
                        Formatting Tips
                    </div>
                    <div style={{ lineHeight: '1.7' }}>
                        • Use **bold** for emphasis • Use *italic* for style • Use ==highlight== to highlight<br />
                        • Start lines with # for headings • Use &gt; for quotes • Use --- for dividers<br />
                        • Add buttons: [Button: Text | URL]
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomPage;
