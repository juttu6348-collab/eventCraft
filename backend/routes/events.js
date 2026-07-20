
const multer = require('multer');
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth');
const {
    cloudinary,
    ensureCloudinaryConfigured
} = require('../config/cloudinary');

const ALLOWED_ADDITIONAL_PAGES = new Set([
    'letter',
    'gallery',
    'memories',
    'surprise',
    'custom'
]);

function normalizeEnabledPages(value) {
    let parsedPages = value;

    if (typeof parsedPages === 'string') {
        try {
            parsedPages = JSON.parse(parsedPages);
        } catch {
            const error = new Error('Invalid page selection.');
            error.status = 400;
            throw error;
        }
    }

    if (!Array.isArray(parsedPages)) {
        const error = new Error(
            'Please select exactly one page. Home is included automatically.'
        );

        error.status = 400;
        throw error;
    }

    const additionalPages = [
        ...new Set(
            parsedPages.filter((pageId) => pageId !== 'home')
        )
    ];

    if (
        additionalPages.length !== 1 ||
        !ALLOWED_ADDITIONAL_PAGES.has(additionalPages[0])
    ) {
        const error = new Error(
            'Please select exactly one page. Home is included automatically.'
        );

        error.status = 400;
        throw error;
    }

    return ['home', additionalPages[0]];
}

function normalizePhotoUrls(value) {
    if (value === undefined || value === null) {
        return [];
    }

    if (!Array.isArray(value)) {
        const error = new Error('Invalid photo information.');
        error.status = 400;
        throw error;
    }

    if (value.length > 10) {
        const error = new Error(
            'You can upload a maximum of 10 photos.'
        );

        error.status = 400;
        throw error;
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    const hasInvalidUrl = value.some((photoUrl) => {
        if (typeof photoUrl !== 'string') {
            return true;
        }

        try {
            const parsedUrl = new URL(photoUrl);

            return !(
                parsedUrl.protocol === 'https:' &&
                parsedUrl.hostname === 'res.cloudinary.com' &&
                parsedUrl.pathname.startsWith(
                    `/${cloudName}/image/upload/`
                )
            );
        } catch {
            return true;
        }
    });

    if (hasInvalidUrl) {
        const error = new Error(
            'One or more uploaded photo URLs are invalid.'
        );

        error.status = 400;
        throw error;
    }

    return value;
}



function uploadImageBuffer(fileBuffer) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'eventcraft/events',
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(fileBuffer);
    });
}

// Helper function to generate slug
function generateSlug(senderName, receiverName) {
    const base = `${senderName}-${receiverName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    const random = Math.random().toString(36).substring(2, 8);
    return `${base}-${random}`;
}



router.post(
    '/upload-signature',
    authMiddleware,
    (req, res) => {
        try {
            ensureCloudinaryConfigured();

            const timestamp = Math.floor(Date.now() / 1000);
            const folder = `eventcraft/users/${req.user.id}`;

            const signature =
                cloudinary.utils.api_sign_request(
                    {
                        timestamp,
                        folder
                    },
                    process.env.CLOUDINARY_API_SECRET
                );

            return res.status(200).json({
                timestamp,
                signature,
                folder,
                cloudName:
                    process.env.CLOUDINARY_CLOUD_NAME,
                apiKey:
                    process.env.CLOUDINARY_API_KEY
            });
        } catch (error) {
            console.error(
                'Cloudinary signature error:',
                error
            );

            return res
                .status(error.status || 500)
                .json({
                    error:
                        error.message ||
                        'Unable to prepare photo upload.'
                });
        }
    }
);

// Create new event
router.post(
    '/',
    authMiddleware,
    async (req, res) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const {
            eventType,
            senderName,
            receiverName,
            relationship,
            date,
            mainMessage,
            theme,
            enabledPages,
            customPageTitle,
            customPageBody,
            photoUrls
        } = req.body;

        // Validation
        

        if (
                !String(senderName || '').trim() ||
                !String(receiverName || '').trim()
            ) {
                const error = new Error(
                    'Sender name and receiver name are required.'
                );

                error.status = 400;
                throw error;
            }

            const normalizedEnabledPages =
                normalizeEnabledPages(enabledPages);

            const selectedPage =
                normalizedEnabledPages[1];

            if (
                selectedPage === 'custom' &&
                !String(customPageTitle || '').trim()
            ) {
                const error = new Error(
                    'Please provide a title for the custom page.'
                );

                error.status = 400;
                throw error;
            }

            const normalizedPhotoUrls =
                normalizePhotoUrls(photoUrls);

            const slug = generateSlug(
                senderName,
                receiverName
            );

            const [eventResult] =
                await connection.query(
                    `INSERT INTO events (
                        slug,
                        event_type,
                        sender_name,
                        receiver_name,
                        relationship,
                        event_date,
                        main_message,
                        theme,
                        enabled_pages,
                        user_id
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        slug,
                        eventType || 'birthday',
                        senderName.trim(),
                        receiverName.trim(),
                        relationship || '',
                        date || null,
                        mainMessage || '',
                        theme || 'elegant',
                        JSON.stringify(
                            normalizedEnabledPages
                        ),
                        req.user.id
                    ]
                );

            const eventId = eventResult.insertId;

            for (
                let index = 0;
                index < normalizedPhotoUrls.length;
                index += 1
            ) {
                await connection.query(
                    `INSERT INTO event_photos (
                        event_id,
                        photo_url,
                        upload_order
                    )
                    VALUES (?, ?, ?)`,
                    [
                        eventId,
                        normalizedPhotoUrls[index],
                        index
                    ]
                );
            }

            if (selectedPage === 'custom') {
                await connection.query(
                    `INSERT INTO custom_pages (
                        event_id,
                        title,
                        body
                    )
                    VALUES (?, ?, ?)`,
                    [
                        eventId,
                        customPageTitle.trim(),
                        customPageBody || ''
                    ]
                );
            }

            await connection.query(
                `INSERT INTO event_stats (
                    event_slug,
                    views
                )
                VALUES (?, ?)`,
                [slug, 0]
            );

            await connection.commit();

            return res.status(201).json({
                slug,
                eventId,
                message: 'Event created successfully'
            });
        } catch (error) {
            await connection.rollback();

            console.error(
                'Create event error:',
                error
            );

            return res
                .status(error.status || 500)
                .json({
                    error:
                        error.status
                            ? error.message
                            : 'Failed to create event'
                });
        } finally {
            connection.release();
        }
    }
);

// Get event by slug (public or authenticated)
router.get('/:slug', optionalAuthMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;

        // Get event
        const [events] = await pool.query(
            'SELECT * FROM events WHERE slug = ?',
            [slug]
        );

        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const event = events[0];

        // Get photos
        const [photos] = await pool.query(
            'SELECT photo_url FROM event_photos WHERE event_id = ? ORDER BY upload_order',
            [event.id]
        );

        // Get custom page
        const [customPages] = await pool.query(
            'SELECT title, body FROM custom_pages WHERE event_id = ? LIMIT 1',
            [event.id]
        );

        // Get stats
        const [stats] = await pool.query(
            'SELECT views, shares FROM event_stats WHERE event_slug = ?',
            [slug]
        );

        // Increment view count
        await pool.query(
            'UPDATE event_stats SET views = views + 1, last_viewed = NOW() WHERE event_slug = ?',
            [slug]
        );

        // Parse enabled_pages if it's a string
        let enabledPages = event.enabled_pages;
        if (typeof enabledPages === 'string') {
            try {
                enabledPages = JSON.parse(enabledPages);
            } catch (e) {
                enabledPages = ['home'];
            }
        }

        res.json({
            id: event.id,
            slug: event.slug,
            eventType: event.event_type,
            senderName: event.sender_name,
            receiverName: event.receiver_name,
            relationship: event.relationship,
            date: event.event_date,
            mainMessage: event.main_message,
            theme: event.theme,
            enabledPages: enabledPages,
            photos: photos.map(p => p.photo_url),
            customPageData: customPages.length > 0 ? {
                title: customPages[0].title,
                body: customPages[0].body
            } : { title: '', body: '' },
            views: stats.length > 0 ? stats[0].views : 0,
            shares: stats.length > 0 ? stats[0].shares : 0,
            userId: event.user_id,
            isFavorite: event.is_favorite,
            createdAt: event.created_at,
            updatedAt: event.updated_at
        });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ error: 'Failed to get event' });
    }
});

// Update event
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Check ownership
        const [events] = await pool.query(
            'SELECT user_id FROM events WHERE id = ?',
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (events[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Build update query
        const allowedFields = ['sender_name', 'receiver_name', 'relationship', 'event_date', 'main_message', 'theme', 'enabled_pages'];
        const updateFields = [];
        const values = [];

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                const dbField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
                updateFields.push(`${dbField} = ?`);
                values.push(updates[field]);
            }
        }

        if (updateFields.length > 0) {
            values.push(id);
            await pool.query(
                `UPDATE events SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`,
                values
            );
        }

        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete event
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Check ownership
        const [events] = await pool.query(
            'SELECT user_id, slug FROM events WHERE id = ?',
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (events[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Delete event (cascade will delete photos, stats, etc.)
        await pool.query('DELETE FROM events WHERE id = ?', [id]);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// Duplicate event
router.post('/:id/duplicate', authMiddleware, async (req, res) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { id } = req.params;

        // Get original event
        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (events.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Event not found' });
        }

        const original = events[0];

        // Generate new slug
        const newSlug = generateSlug(original.sender_name, `${original.receiver_name} (Copy)`);

        // Create duplicate event
        const [result] = await connection.query(
            `INSERT INTO events (slug, event_type, sender_name, receiver_name, relationship, event_date, main_message, theme, enabled_pages, user_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newSlug,
                original.event_type,
                original.sender_name,
                `${original.receiver_name} (Copy)`,
                original.relationship,
                original.event_date,
                original.main_message,
                original.theme,
                original.enabled_pages,
                req.user.id
            ]
        );

        const newEventId = result.insertId;

        // Copy photos
        const [photos] = await connection.query(
            'SELECT photo_url, upload_order FROM event_photos WHERE event_id = ?',
            [id]
        );

        for (const photo of photos) {
            await connection.query(
                'INSERT INTO event_photos (event_id, photo_url, upload_order) VALUES (?, ?, ?)',
                [newEventId, photo.photo_url, photo.upload_order]
            );
        }

        // Copy custom page
        const [customPages] = await connection.query(
            'SELECT title, body FROM custom_pages WHERE event_id = ?',
            [id]
        );

        if (customPages.length > 0) {
            await connection.query(
                'INSERT INTO custom_pages (event_id, title, body) VALUES (?, ?, ?)',
                [newEventId, customPages[0].title, customPages[0].body]
            );
        }

        // Create stats entry
        await connection.query(
            'INSERT INTO event_stats (event_slug, views) VALUES (?, ?)',
            [newSlug, 0]
        );

        await connection.commit();

        res.status(201).json({
            slug: newSlug,
            eventId: newEventId,
            message: 'Event duplicated successfully'
        });
    } catch (error) {
        await connection.rollback();
        console.error('Duplicate event error:', error);
        res.status(500).json({ error: 'Failed to duplicate event' });
    } finally {
        connection.release();
    }
});

// Toggle favorite
router.put('/:id/favorite', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { isFavorite } = req.body;

        // Check ownership
        const [events] = await pool.query(
            'SELECT user_id FROM events WHERE id = ?',
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (events[0].user_id !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await pool.query(
            'UPDATE events SET is_favorite = ? WHERE id = ?',
            [isFavorite ? 1 : 0, id]
        );

        res.json({ message: 'Favorite status updated' });
    } catch (error) {
        console.error('Toggle favorite error:', error);
        res.status(500).json({ error: 'Failed to update favorite' });
    }
});

// Get event analytics
router.get('/:id/analytics', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const [events] = await pool.query(
            `SELECT
                e.*,
                COALESCE(s.views, 0) AS views,
                COALESCE(s.shares, 0) AS shares
             FROM events e
             LEFT JOIN event_stats s
                ON e.slug = s.event_slug
             WHERE e.id = ?`,
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }

        const event = events[0];

        const eventOwnerId = Number(event.user_id);
        const loggedInUserId = Number(req.user.id);

        if (
            eventOwnerId !== loggedInUserId &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                error: 'Not authorized to view this event analytics'
            });
        }

        return res.status(200).json({
            success: true,
            analytics: {
                eventId: event.id,
                slug: event.slug,
                views: Number(event.views || 0),
                shares: Number(event.shares || 0),
                createdAt: event.created_at,
                updatedAt: event.updated_at
            }
        });
    } catch (error) {
        console.error('Get event analytics error:', error);

        return res.status(500).json({
            error: 'Failed to retrieve event analytics'
        });
    }
}
);

module.exports = router;
