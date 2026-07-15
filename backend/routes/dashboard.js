const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Get user's events
router.get('/events', authMiddleware, async (req, res) => {
    try {
        const [events] = await pool.query(
            `SELECT e.*, 
                    (SELECT COUNT(*) FROM event_photos WHERE event_id = e.id) as photo_count,
                    COALESCE(s.views, 0) as views
             FROM events e
             LEFT JOIN event_stats s ON e.slug = s.event_slug
             WHERE e.user_id = ?
             ORDER BY e.created_at DESC`,
            [req.user.id]
        );

        // Parse enabled_pages for each event
        const formattedEvents = events.map(event => ({
            id: event.id,
            slug: event.slug,
            eventType: event.event_type,
            senderName: event.sender_name,
            receiverName: event.receiver_name,
            relationship: event.relationship,
            date: event.event_date,
            mainMessage: event.main_message,
            theme: event.theme,
            enabledPages: typeof event.enabled_pages === 'string'
                ? JSON.parse(event.enabled_pages)
                : event.enabled_pages,
            isFavorite: event.is_favorite,
            views: event.views,
            photoCount: event.photo_count,
            createdAt: event.created_at,
            updatedAt: event.updated_at
        }));

        res.json(formattedEvents);
    } catch (error) {
        console.error('Get user events error:', error);
        res.status(500).json({ error: 'Failed to get events' });
    }
});

// Get user analytics
router.get('/analytics', authMiddleware, async (req, res) => {
    try {
        const [stats] = await pool.query(
            `SELECT 
                COUNT(*) as totalEvents,
                COALESCE(SUM(s.views), 0) as totalViews
             FROM events e
             LEFT JOIN event_stats s ON e.slug = s.event_slug
             WHERE e.user_id = ?`,
            [req.user.id]
        );

        // Get most viewed event
        const [mostViewed] = await pool.query(
            `SELECT e.receiver_name, COALESCE(s.views, 0) as views
             FROM events e
             LEFT JOIN event_stats s ON e.slug = s.event_slug
             WHERE e.user_id = ?
             ORDER BY views DESC
             LIMIT 1`,
            [req.user.id]
        );

        res.json({
            totalEvents: stats[0].totalEvents,
            totalViews: stats[0].totalViews,
            mostViewed: mostViewed.length > 0 ? {
                name: mostViewed[0].receiver_name,
                views: mostViewed[0].views
            } : null
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Failed to get analytics' });
    }
});

module.exports = router;
