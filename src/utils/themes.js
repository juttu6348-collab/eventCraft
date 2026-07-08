export const themes = [
    {
        id: 'elegant',
        name: 'Elegant',
        description: 'Soft & Romantic',
        colors: ['#ec4899', '#8b5cf6', '#3b82f6'],
        gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)',
        preview: 'Pink/violet radial gradients with gentle animations'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean & Modern',
        colors: ['#f9fafb', '#e5e7eb', '#9ca3af'],
        gradient: 'linear-gradient(135deg, #f9fafb, #e5e7eb)',
        preview: 'Light background with subtle grays'
    },
    {
        id: 'neon',
        name: 'Neon',
        description: 'Vibrant & Electric',
        colors: ['#ec4899', '#38bdf8', '#a855f7'],
        gradient: 'linear-gradient(135deg, #ec4899, #38bdf8)',
        preview: 'Bright pink/blue with electric glow effects'
    },
    {
        id: 'vintage',
        name: 'Vintage',
        description: 'Warm & Nostalgic',
        colors: ['#fb7185', '#bef264', '#fef3c7'],
        gradient: 'linear-gradient(135deg, #fb7185, #bef264)',
        preview: 'Warm pink/green on cream background'
    },
    {
        id: 'ocean',
        name: 'Ocean',
        description: 'Cool & Serene',
        colors: ['#0ea5e9', '#0c4a6e', '#06b6d4'],
        gradient: 'linear-gradient(135deg, #0ea5e9, #0c4a6e)',
        preview: 'Deep blue ocean vibes'
    }
];

export const getThemeById = (id) => {
    return themes.find(theme => theme.id === id) || themes[0];
};

/**
 * Applies theme variables to the document root or specific element
 * @param {string} themeId - The ID of the theme to apply
 * @param {HTMLElement} element - Optional element to apply styles to (default: document.documentElement)
 */
export const applyTheme = (themeId, element = document.documentElement) => {
    const theme = getThemeById(themeId);

    // Set custom properties for the theme
    element.style.setProperty('--primary-gradient', theme.gradient);

    // You might want to map specific colors to semantic variables here
    // For now, let's expose the raw colors
    element.style.setProperty('--theme-color-1', theme.colors[0]);
    element.style.setProperty('--theme-color-2', theme.colors[1]);
    element.style.setProperty('--theme-color-3', theme.colors[2] || theme.colors[1]);

    // Add specific overrides based on theme ID if needed
    if (theme.id === 'minimal') {
        element.style.setProperty('--bg-primary', '#ffffff');
        element.style.setProperty('--text-primary', '#1f2937');
    } else if (theme.id === 'ocean') {
        // Ocean specific overrides
    }
};
