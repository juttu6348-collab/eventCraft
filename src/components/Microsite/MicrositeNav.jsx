import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Mail, Image, Clock, Gift, FileText, ArrowLeft } from 'lucide-react';
import { getEventConfig } from '../../utils/eventConfig';
import ViewCounter from '../UI/ViewCounter';

function MicrositeNav({ event }) {
    const navigate = useNavigate();
    const location = useLocation();
    const eventConfig = getEventConfig(event.eventType);

    const pages = [
        { id: 'home', name: 'Home', path: '', icon: Home },
        { id: 'letter', name: 'Letter', path: '/letter', icon: Mail },
        { id: 'gallery', name: 'Gallery', path: '/gallery', icon: Image },
        { id: 'memories', name: 'Memories', path: '/memories', icon: Clock },
        { id: 'surprise', name: 'Surprise', path: '/surprise', icon: Gift },
        { id: 'custom', name: 'Custom', path: '/custom', icon: FileText }
    ];

    const enabledPages = pages.filter(page =>
        page.id === 'home' || event.enabledPages.includes(page.id)
    );

    const basePath = `/e/${event.slug}`;
    const currentPath = location.pathname.replace(basePath, '');

    const handleNavigate = (path) => {
        navigate(`${basePath}${path}`);
    };

    return (
        <>
            {/* Top Navigation */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(15, 15, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 0',
                zIndex: 100,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
            }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="btn btn-sm btn-outline-light d-flex align-items-center gap-2"
                        style={{
                            transition: 'all 0.3s ease',
                            fontWeight: '600',
                            borderRadius: '2rem'
                        }}
                    >
                        <ArrowLeft size={16} />
                        <span className="d-none d-sm-inline">EventCraft</span>
                    </button>
                    <div className="d-flex align-items-center gap-2 gap-md-3">
                        <ViewCounter eventSlug={event.slug} />
                        <span
                            className="badge px-3 py-2"
                            style={{
                                background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                color: 'white',
                                fontWeight: '600',
                                borderRadius: '2rem',
                                fontSize: '0.875rem',
                                boxShadow: `0 4px 12px ${eventConfig.colors.primary}40`
                            }}
                        >
                            {eventConfig.emoji} {event.eventType}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1rem 0',
                pointerEvents: 'none'
            }}>
                <div className="container" style={{ pointerEvents: 'auto' }}>
                    <div style={{
                        background: 'rgba(15, 15, 30, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${eventConfig.colors.primary}`,
                        borderRadius: '2rem',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        boxShadow: `0 -4px 30px ${eventConfig.colors.primary}20, 0 0 0 1px rgba(255, 255, 255, 0.05)`,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {enabledPages.map((page) => {
                            const Icon = page.icon;
                            const isActive = currentPath === page.path;

                            return (
                                <button
                                    key={page.id}
                                    onClick={() => handleNavigate(page.path)}
                                    className="btn btn-link text-decoration-none d-flex flex-column align-items-center gap-1 position-relative"
                                    style={{
                                        flex: 1,
                                        color: isActive ? eventConfig.colors.primary : '#94a3b8',
                                        transition: 'all 0.3s ease',
                                        padding: '0.5rem'
                                    }}
                                >
                                    {isActive && (
                                        <>
                                            <div style={{
                                                position: 'absolute',
                                                top: '-4px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '40px',
                                                height: '4px',
                                                background: `linear-gradient(90deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                                                borderRadius: '2px',
                                                boxShadow: `0 2px 8px ${eventConfig.colors.primary}`,
                                                animation: 'slideIn 0.3s ease'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: `radial-gradient(circle, ${eventConfig.colors.primary}20 0%, transparent 70%)`,
                                                opacity: 0.5
                                            }} />
                                        </>
                                    )}
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: isActive ? '700' : '500',
                                        opacity: isActive ? 1 : 0.7
                                    }}>
                                        {page.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-50%) scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}

export default MicrositeNav;
