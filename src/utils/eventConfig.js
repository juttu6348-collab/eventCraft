/**
 * Event-specific styling and configuration
 * Returns colors, emojis, and animations based on event type and relationship
 */

export const eventConfig = {
    birthday: {
        emoji: '🎂',
        altEmojis: ['🎉', '🎁', '🎈', '🥳', '🍰'],
        colors: {
            primary: '#ec4899',
            secondary: '#8b5cf6',
            accent: '#f59e0b'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(236, 72, 153, 0.3), transparent 60%), radial-gradient(circle at bottom, rgba(139, 92, 246, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))'
        },
        particles: '🎉🎊🎈🎁',
        animation: 'bounce',
        music: 'upbeat'
    },
    anniversary: {
        emoji: '💕',
        altEmojis: ['❤️', '💖', '💗', '💝', '🌹'],
        colors: {
            primary: '#e91e63',
            secondary: '#ec407a',
            accent: '#f48fb1'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(233, 30, 99, 0.3), transparent 60%), radial-gradient(circle at bottom, rgba(236, 64, 122, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(233, 30, 99, 0.15), rgba(236, 64, 122, 0.1))'
        },
        particles: '❤️💖💕💗',
        animation: 'pulse',
        music: 'romantic'
    },
    wedding: {
        emoji: '💒',
        altEmojis: ['💍', '💐', '🤵', '👰', '🥂'],
        colors: {
            primary: '#f43f5e',
            secondary: '#fda4af',
            accent: '#fecdd3'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(244, 63, 94, 0.2), transparent 60%), radial-gradient(circle at bottom, rgba(253, 164, 175, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(253, 164, 175, 0.1))'
        },
        particles: '💒💍💐🥂',
        animation: 'elegant-fade',
        music: 'classical'
    },
    success: {
        emoji: '🏆',
        altEmojis: ['🎯', '⭐', '✨', '🌟', '💪'],
        colors: {
            primary: '#f59e0b',
            secondary: '#fbbf24',
            accent: '#fcd34d'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(245, 158, 11, 0.3), transparent 60%), radial-gradient(circle at bottom, rgba(251, 191, 36, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.1))'
        },
        particles: '🏆⭐✨🎯',
        animation: 'rise-up',
        music: 'triumphant'
    },
    baby: {
        emoji: '👶',
        altEmojis: ['🍼', '🧸', '🎀', '💙', '💗'],
        colors: {
            primary: '#06b6d4',
            secondary: '#22d3ee',
            accent: '#67e8f9'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(6, 182, 212, 0.2), transparent 60%), radial-gradient(circle at bottom, rgba(34, 211, 238, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(34, 211, 238, 0.1))'
        },
        particles: '👶🍼🧸🎀',
        animation: 'gentle-float',
        music: 'lullaby'
    },
    graduation: {
        emoji: '🎓',
        altEmojis: ['📚', '🎉', '🏅', '📜', '🌟'],
        colors: {
            primary: '#8b5cf6',
            secondary: '#a78bfa',
            accent: '#c4b5fd'
        },
        gradients: {
            hero: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.3), transparent 60%), radial-gradient(circle at bottom, rgba(167, 139, 250, 0.2), transparent 60%)',
            card: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.1))'
        },
        particles: '🎓📚🏅✨',
        animation: 'rise-up',
        music: 'inspirational'
    }
};

export const relationshipStyles = {
    // Romantic relationships - soft, elegant, romantic
    romantic: {
        relationships: ['husband', 'wife', 'boyfriend', 'girlfriend', 'fiancé', 'fiancée', 'partner', 'love'],
        animation: 'gentle-pulse',
        particle: '💕',
        fontStyle: 'cursive',
        tone: 'romantic'
    },
    // Family - warm, comforting, heartfelt
    family: {
        relationships: ['mother', 'father', 'mom', 'dad', 'brother', 'sister', 'son', 'daughter', 'grandmother', 'grandfather', 'grandparent', 'aunt', 'uncle', 'cousin', 'niece', 'nephew'],
        animation: 'warm-glow',
        particle: '❤️',
        fontStyle: 'serif',
        tone: 'warm'
    },
    // Friends - fun, playful, energetic
    friends: {
        relationships: ['friend', 'best friend', 'buddy', 'pal', 'mate'],
        animation: 'bounce-fun',
        particle: '🎉',
        fontStyle: 'sans-serif',
        tone: 'playful'
    },
    // Professional - respectful, appreciative
    professional: {
        relationships: ['colleague', 'boss', 'mentor', 'teacher', 'student', 'coworker'],
        animation: 'slide-elegant',
        particle: '⭐',
        fontStyle: 'sans-serif',
        tone: 'professional'
    }
};

/**
 * Get event configuration
 */
export function getEventConfig(eventType) {
    return eventConfig[eventType] || eventConfig.birthday;
}

/**
 * Get relationship style category
 */
export function getRelationshipStyle(relationship) {
    const rel = (relationship || '').toLowerCase();

    for (const [category, config] of Object.entries(relationshipStyles)) {
        if (config.relationships.some(r => rel.includes(r))) {
            return { category, ...config };
        }
    }

    // Default to friends style
    return { category: 'friends', ...relationshipStyles.friends };
}

/**
 * Get contextual particle emojis for animations
 */
export function getParticles(eventType, relationship) {
    const config = getEventConfig(eventType);
    const relStyle = getRelationshipStyle(relationship);

    return {
        event: config.particles.split(''),
        relationship: relStyle.particle,
        all: [...config.particles.split(''), relStyle.particle]
    };
}

/**
 * Get animation class based on context
 */
export function getAnimationClass(eventType, relationship) {
    const config = getEventConfig(eventType);
    const relStyle = getRelationshipStyle(relationship);

    return {
        event: config.animation,
        relationship: relStyle.animation,
        combined: `${config.animation} ${relStyle.animation}`
    };
}

export default {
    eventConfig,
    relationshipStyles,
    getEventConfig,
    getRelationshipStyle,
    getParticles,
    getAnimationClass
};
