import { useEffect, useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import { getEventBySlug } from '../services/events';
import MicrositeNav from '../components/Microsite/MicrositeNav';
import Hero from '../components/Microsite/Hero';
import Letter from '../components/Microsite/Letter';
import Gallery from '../components/Microsite/Gallery';
import Memories from '../components/Microsite/Memories';
import Surprise from '../components/Microsite/Surprise';
import CustomPage from '../components/Microsite/CustomPage';
import { applyTheme } from '../utils/themes';

function EventView() {
    const { slug } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const eventData = await getEventBySlug(slug);
                if (eventData) {
                    setEvent(eventData);
                    applyTheme(eventData.theme);
                    document.body.className = `theme-${eventData.theme}`;
                    document.body.style.background = '#0f172a';
                } else {
                    setError('Event not found');
                }
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Failed to load event');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();

        return () => {
            document.body.className = '';
            document.body.style.background = '';
        };
    }, [slug]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0f172a'
            }}>
                <div className="text-center">
                    <div className="spinner-border text-info mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p style={{ color: '#94a3b8' }}>Loading your event...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
                background: '#0f172a'
            }}>
                <div className="text-center">
                    <h1
                        className="display-1 fw-bold mb-3"
                        style={{
                            background: 'linear-gradient(135deg, #e91e63, #9c27b0, #2196f3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        404
                    </h1>
                    <p className="h4 mb-4" style={{ color: '#94a3b8' }}>{error || 'Event not found'}</p>
                    <a
                        href="/create"
                        className="btn btn-lg px-5 py-3"
                        style={{
                            background: 'linear-gradient(135deg, #e91e63, #9c27b0, #2196f3)',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600',
                            borderRadius: '2rem'
                        }}
                    >
                        Create an Event
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f172a',
            position: 'relative'
        }}>
            <MicrositeNav event={event} />
            <Routes>
                <Route index element={<Hero event={event} />} />
                {event.enabledPages?.includes('letter') && (
                    <Route path="letter" element={<Letter event={event} />} />
                )}
                {event.enabledPages?.includes('gallery') && (
                    <Route path="gallery" element={<Gallery event={event} />} />
                )}
                {event.enabledPages?.includes('memories') && (
                    <Route path="memories" element={<Memories event={event} />} />
                )}
                {event.enabledPages?.includes('surprise') && (
                    <Route path="surprise" element={<Surprise event={event} />} />
                )}
                {event.enabledPages?.includes('custom') && (
                    <Route path="custom" element={<CustomPage event={event} />} />
                )}
                <Route path="*" element={<Navigate to={`/e/${slug}`} replace />} />
            </Routes>
        </div>
    );
}

export default EventView;
