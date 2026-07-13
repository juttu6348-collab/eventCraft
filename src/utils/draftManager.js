/**
 * Draft Manager - Auto-save and restore event creation drafts
 */

const DRAFT_KEY = 'eventcraft_draft';

/**
 * Save draft to localStorage
 */
export function saveDraft(formData) {
    try {
        const {
            photos,
            ...serializableFormData
        } = formData;

        const draft = {
            ...serializableFormData,
            photos: [],
            savedAt: new Date().toISOString(),
            version: '1.1'
        };

        localStorage.setItem(
            DRAFT_KEY,
            JSON.stringify(draft)
        );

        return true;
    } catch (error) {
        console.error('Error saving draft:', error);
        return false;
    }
}

/**
 * Load draft from localStorage
 */
export function loadDraft() {
    try {
        const draftJson = localStorage.getItem(DRAFT_KEY);
        if (!draftJson) return null;

        const draft = JSON.parse(draftJson);
        console.log('📂 Draft loaded from:', new Date(draft.savedAt).toLocaleString());
        return draft;
    } catch (error) {
        console.error('❌ Error loading draft:', error);
        return null;
    }
}

/**
 * Clear draft from localStorage
 */
export function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_KEY);
        console.log('🗑️ Draft cleared');
        return true;
    } catch (error) {
        console.error('❌ Error clearing draft:', error);
        return false;
    }
}

/**
 * Check if draft exists
 */
export function hasDraft() {
    return localStorage.getItem(DRAFT_KEY) !== null;
}

/**
 * Get draft age in minutes
 */
export function getDraftAge() {
    const draft = loadDraft();
    if (!draft || !draft.savedAt) return null;

    const savedTime = new Date(draft.savedAt).getTime();
    const now = new Date().getTime();
    const ageInMinutes = Math.floor((now - savedTime) / (1000 * 60));

    return ageInMinutes;
}

/**
 * Format draft age for display
 */
export function formatDraftAge(minutes) {
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
    getDraftAge,
    formatDraftAge
};
