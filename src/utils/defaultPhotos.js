/**
 * Default Photos System
 * Provides fallback images when users don't upload photos
 */

// Default photos organized by event type
export const defaultPhotos = {
    birthday: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', // Birthday cake with candles
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', // Birthday balloons
        'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80', // Birthday party
        'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80', // Birthday celebration
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80', // Happy birthday
    ],
    anniversary: [
        'https://images.unsplash.com/photo-1518481612222-68bbe828ecd0?w=800&q=80', // Romantic roses
        'https://images.unsplash.com/photo-1529634597743-3f4f03b5c3d1?w=800&q=80', // Hearts
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80', // Romantic couple
        'https://images.unsplash.com/photo-1522673607106-f5d75e5fb5e4?w=800&q=80', // Love theme
        'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=800&q=80', // Romantic hearts
    ],
    wedding: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', // Wedding couple
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', // Wedding rings
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', // Wedding flowers
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', // Wedding celebration
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', // Wedding venue
    ],
    success: [
        'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&q=80', // Achievement
        'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=800&q=80', // Trophy
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', // Success
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Team success
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', // Celebration
    ],
    baby: [
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80', // Baby items
        'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', // Baby shower
        'https://images.unsplash.com/photo-1487147264018-f937fba0c817?w=800&q=80', // Baby toys
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80', // Newborn
        'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80', // Baby celebration
    ],
    graduation: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', // Graduation cap
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', // Graduation ceremony
        'https://images.unsplash.com/photo-1627556704302-624c8fb2f0b2?w=800&q=80', // Graduation celebration
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', // Education
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', // Academic success
    ]
};

/**
 * Get default photos for an event type
 */
export function getDefaultPhotos(eventType) {
    return defaultPhotos[eventType] || defaultPhotos.birthday;
}

/**
 * Get photos with fallback to defaults
 */
export function getPhotosOrDefaults(userPhotos, eventType) {
    if (userPhotos && userPhotos.length > 0) {
        return userPhotos;
    }
    return getDefaultPhotos(eventType);
}

export default {
    defaultPhotos,
    getDefaultPhotos,
    getPhotosOrDefaults
};
