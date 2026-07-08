import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

function ViewCounter({ eventSlug }) {
    const [views, setViews] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const trackView = async () => {
            if (!eventSlug) return;

            try {
                // View tracking is now handled by the backend API
                // The backend increments views automatically when GET /api/events/:slug is called
                // So we don't need to do anything here except fetch the current count

                // For now, we'll just mark as loaded
                // The view count is displayed separately where the event data is fetched
                if (isMounted) {
                    setLoading(false);
                }
            } catch (error) {
                console.log('View tracking unavailable');
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        trackView();

        return () => {
            isMounted = false;
        };
    }, [eventSlug]);

    // View counter is now part of the event data from the API
    // This component can be simplified or removed
    if (loading || views === 0) return null;

    return (
        <div
            className="d-flex align-items-center gap-2"
            style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                fontWeight: '500'
            }}
        >
            <Eye size={16} />
            <span>{views} {views === 1 ? 'view' : 'views'}</span>
        </div>
    );
}

export default ViewCounter;
