import { useState, useEffect, useRef } from 'react';
import { getEventConfig } from '../../utils/eventConfig';
import { getPhotosOrDefaults } from '../../utils/defaultPhotos';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Pause, Download } from 'lucide-react';

function Gallery({ event }) {
    const eventConfig = getEventConfig(event.eventType);
    const photos = getPhotosOrDefaults(event.photos, event.eventType);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sparkles, setSparkles] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const [slideshow, setSlideshow] = useState(false);
    const slideshowInterval = useRef(null);
    const [loadedImages, setLoadedImages] = useState(new Set());

    useEffect(() => {
        // Generate sparkles
        const newSparkles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 2
        }));
        setSparkles(newSparkles);
    }, []);

    // Slideshow functionality
    useEffect(() => {
        if (slideshow && lightboxOpen) {
            slideshowInterval.current = setInterval(() => {
                nextPhoto();
            }, 3000);
        } else {
            if (slideshowInterval.current) {
                clearInterval(slideshowInterval.current);
            }
        }
        return () => {
            if (slideshowInterval.current) {
                clearInterval(slideshowInterval.current);
            }
        };
    }, [slideshow, lightboxOpen]);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSlideshow(false);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'auto';
    };

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.5, 1));
        if (zoomLevel <= 1.5) {
            setPanPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsPanning(true);
            setStartPan({
                x: e.clientX - panPosition.x,
                y: e.clientY - panPosition.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isPanning && zoomLevel > 1) {
            setPanPosition({
                x: e.clientX - startPan.x,
                y: e.clientY - startPan.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = photos[currentIndex];
        link.download = `photo-${currentIndex + 1}.jpg`;
        link.click();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
            if (e.key === '+' || e.key === '=') handleZoomIn();
            if (e.key === '-' || e.key === '_') handleZoomOut();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, currentIndex, zoomLevel]);

    // Lazy loading
    const handleImageLoad = (index) => {
        setLoadedImages(prev => new Set([...prev, index]));
    };

    if (photos.length === 0) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 9rem)',
                padding: '120px 0',
                background: `linear-gradient(135deg, ${eventConfig.colors.primary}10, #0f172a)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="text-center">
                    <div style={{
                        fontSize: '6rem',
                        marginBottom: '1.5rem',
                        opacity: 0.6,
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>📸</div>
                    <h3 style={{ color: '#cbd5e1', fontSize: '1.8rem', marginBottom: '0.5rem' }}>No Photos Yet</h3>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Photos will appear here when added</p>
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
                        pointerEvents: 'none'
                    }}
                />
            ))}

            <div className="container" style={{ maxWidth: '1400px' }}>
                {/* Title */}
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '900',
                        background: `linear-gradient(135deg, ${eventConfig.colors.primary}, ${eventConfig.colors.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '1rem',
                        animation: 'fadeInUp 1s ease-out, shimmer 5s linear infinite',
                        backgroundSize: '200% auto'
                    }}>
                        Photo Gallery
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#94a3b8',
                        animation: 'fadeIn 1s ease-out 0.3s both'
                    }}>
                        {photos.length} beautiful {photos.length === 1 ? 'memory' : 'memories'}
                    </p>
                </div>

                {/* Masonry Grid with Polaroid Frames */}
                <div style={{
                    columnCount: window.innerWidth > 1200 ? 3 : window.innerWidth > 768 ? 2 : 1,
                    columnGap: '2rem',
                    animation: 'fadeInUp 1s ease-out 0.5s both'
                }}>
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            style={{
                                breakInside: 'avoid',
                                marginBottom: '2rem',
                                cursor: 'pointer',
                                animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                                willChange: 'transform',
                                transform: 'translate3d(0, 0, 0)'
                            }}
                        >
                            {/* Polaroid Frame */}
                            <div
                                style={{
                                    background: '#fff',
                                    padding: '1rem 1rem 3rem 1rem',
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
                                    borderRadius: '4px',
                                    transform: `rotate(${(index % 3 - 1) * 2}deg)`,
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56,  0.64, 1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'rotate(0deg) translateY(-10px) scale(1.05)';
                                    e.currentTarget.style.boxShadow = `0 20px 60px ${eventConfig.colors.primary}40, 0 5px 15px rgba(0, 0, 0, 0.4)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = `rotate(${(index % 3 - 1) * 2}deg)`;
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                {/* Image */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: `${60 + Math.random() * 40}%`,
                                    background: '#f0f0f0',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={photo}
                                        alt={`Memory ${index + 1}`}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad(index)}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: loadedImages.has(index) ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out'
                                        }}
                                    />
                                    {!loadedImages.has(index) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: '#999',
                                            animation: 'pulse 1.5s ease-in-out infinite'
                                        }}>
                                            Loading...
                                        </div>
                                    )}
                                </div>

                                {/* Caption on hover */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '3rem',
                                    left: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    color: 'white',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    opacity: 0,
                                    transform: 'translateY(10px)',
                                    transition: 'all 0.3s ease-out',
                                    pointerEvents: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                                    className="photo-caption"
                                >
                                    Memory #{index + 1}
                                </div>

                                {/* Handwritten note effect */}
                                <div style={{
                                    marginTop: '1rem',
                                    fontFamily: "'Brush Script MT', cursive",
                                    fontSize: '1.1rem',
                                    color: '#333',
                                    textAlign: 'center',
                                    fontStyle: 'italic'
                                }}>
                                    Beautiful moment ✨
                                </div>

                                {/* Zoom icon overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    width: '40px',
                                    height: '40px',
                                    background: eventConfig.colors.primary,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transform: 'scale(0.8)',
                                    transition: 'all 0.3s ease-out',
                                    pointerEvents: 'none'
                                }}
                                    className="zoom-icon"
                                >
                                    <ZoomIn size={20} color="white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced Lightbox */}
            {lightboxOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'fadeIn 0.3s ease-out',
                        backdropFilter: 'blur(10px)'
                    }}
                    onClick={closeLightbox}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            width: '50px',
                            height: '50px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            zIndex: 10001
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <X size={24} />
                    </button>

                    {/* Controls */}
                    <div style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '1rem',
                        zIndex: 10001
                    }}>
                        {/* Zoom Controls */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                            style={{
                                width: '45px',
                                height: '45px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <ZoomOut size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                            style={{
                                width: '45px',
                                height: '45px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <ZoomIn size={20} />
                        </button>

                        {/* Slideshow Toggle */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSlideshow(!slideshow); }}
                            style={{
                                width: '45px',
                                height: '45px',
                                background: slideshow ? eventConfig.colors.primary : 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {slideshow ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        {/* Download Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); downloadImage(); }}
                            style={{
                                width: '45px',
                                height: '45px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <Download size={20} />
                        </button>
                    </div>

                    {/* Navigation Arrows */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                                style={{
                                    position: 'absolute',
                                    left: '2rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 10001
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = `${eventConfig.colors.primary}80`;
                                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'translateY(-50%) scale(1)';
                                }}
                            >
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                                style={{
                                    position: 'absolute',
                                    right: '2rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 10001
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = `${eventConfig.colors.primary}80`;
                                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'translateY(-50%) scale(1)';
                                }}
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image with Zoom & Pan */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={handleMouseDown}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '85vh',
                            position: 'relative',
                            cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={photos[currentIndex]}
                            alt={`Photo ${currentIndex + 1}`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                                transition: isPanning ? 'none' : 'transform 0.3s ease-out',
                                boxShadow: `0 20px 80px ${eventConfig.colors.primary}60`,
                                borderRadius: '8px',
                                willChange: 'transform',
                                userSelect: 'none',
                                draggable: false
                            }}
                        />
                    </div>

                    {/* Photo Counter */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '30px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}>
                        {currentIndex + 1} / {photos.length}
                    </div>
                </div>
            )}

            {/* CSS for hover effects */}
            <style>{`
                .polaroid-frame:hover .photo-caption,
                .polaroid-frame:hover .zoom-icon {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </div>
    );
}

export default Gallery;
