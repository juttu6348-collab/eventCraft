import { useState } from 'prop-types';
import PropTypes from 'prop-types';
import { Calendar, Filter, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

function AdvancedFilters({ onFilterChange, savedPresets = [], onSavePreset }) {
    const [showFilters, setShowFilters] = useState(false);
    const [presetName, setPresetName] = useState('');
    const [showSavePreset, setShowSavePreset] = useState(false);

    const [filters, setFilters] = useState({
        dateRange: {
            start: '',
            end: ''
        },
        viewCount: {
            min: '',
            max: ''
        },
        eventTypes: [],
        favorites: false
    });

    const eventTypes = [
        { value: 'birthday', label: '🎂 Birthday', color: '#ff6b9d' },
        { value: 'wedding', label: '💒 Wedding', color: '#feca57' },
        { value: 'anniversary', label: '💕 Anniversary', color: '#ff6348' },
        { value: 'graduation', label: '🎓 Graduation', color: '#48dbfb' },
        { value: 'baby shower', label: '👶 Baby Shower', color: '#ff9ff3' },
        { value: 'success', label: '🎉 Success', color: '#1dd1a1' },
        { value: 'other', label: '📅 Other', color: '#a29bfe' }
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleTypeToggle = (type) => {
        const newTypes = filters.eventTypes.includes(type)
            ? filters.eventTypes.filter(t => t !== type)
            : [...filters.eventTypes, type];

        handleFilterChange('eventTypes', newTypes);
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            dateRange: { start: '', end: '' },
            viewCount: { min: '', max: '' },
            eventTypes: [],
            favorites: false
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
        toast.success('Filters cleared');
    };

    const handleSavePreset = () => {
        if (!presetName.trim()) {
            toast.error('Please enter a preset name');
            return;
        }

        onSavePreset?.({ name: presetName, filters });
        setPresetName('');
        setShowSavePreset(false);
        toast.success('Filter preset saved');
    };

    const loadPreset = (preset) => {
        setFilters(preset.filters);
        onFilterChange(preset.filters);
        toast.success(`Loaded preset: ${preset.name}`);
    };

    const activeFilterCount =
        (filters.dateRange.start || filters.dateRange.end ? 1 : 0) +
        (filters.viewCount.min || filters.viewCount.max ? 1 : 0) +
        (filters.eventTypes.length > 0 ? 1 : 0) +
        (filters.favorites ? 1 : 0);

    return (
        <div className="advanced-filters">
            <button
                className={`btn btn-outline-info ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
            >
                <Filter size={16} className="me-2" />
                Filters
                {activeFilterCount > 0 && (
                    <span className="badge bg-info ms-2">{activeFilterCount}</span>
                )}
            </button>

            {showFilters && (
                <div className="filters-panel glass-card p-4 mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Advanced Filters</h6>
                        <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => setShowFilters(false)}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Date Range Filter */}
                    <div className="filter-section mb-4">
                        <label className="form-label">
                            <Calendar size={16} className="me-2" />
                            Date Range
                        </label>
                        <div className="row g-2">
                            <div className="col-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={filters.dateRange.start}
                                    onChange={(e) => handleFilterChange('dateRange', {
                                        ...filters.dateRange,
                                        start: e.target.value
                                    })}
                                    placeholder="Start date"
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={filters.dateRange.end}
                                    onChange={(e) => handleFilterChange('dateRange', {
                                        ...filters.dateRange,
                                        end: e.target.value
                                    })}
                                    placeholder="End date"
                                />
                            </div>
                        </div>
                    </div>

                    {/* View Count Filter */}
                    <div className="filter-section mb-4">
                        <label className="form-label">View Count Range</label>
                        <div className="row g-2">
                            <div className="col-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={filters.viewCount.min}
                                    onChange={(e) => handleFilterChange('viewCount', {
                                        ...filters.viewCount,
                                        min: e.target.value
                                    })}
                                    placeholder="Min"
                                    min="0"
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={filters.viewCount.max}
                                    onChange={(e) => handleFilterChange('viewCount', {
                                        ...filters.viewCount,
                                        max: e.target.value
                                    })}
                                    placeholder="Max"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Event Types Filter */}
                    <div className="filter-section mb-4">
                        <label className="form-label">Event Types</label>
                        <div className="event-types-grid">
                            {eventTypes.map(type => (
                                <button
                                    key={type.value}
                                    className={`event-type-chip ${filters.eventTypes.includes(type.value) ? 'active' : ''}`}
                                    onClick={() => handleTypeToggle(type.value)}
                                    style={{
                                        borderColor: filters.eventTypes.includes(type.value) ? type.color : 'var(--border-color)',
                                        background: filters.eventTypes.includes(type.value) ? `${type.color}20` : 'transparent'
                                    }}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Favorites Toggle */}
                    <div className="filter-section mb-4">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="favoritesOnly"
                                checked={filters.favorites}
                                onChange={(e) => handleFilterChange('favorites', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="favoritesOnly">
                                Show favorites only
                            </label>
                        </div>
                    </div>

                    {/* Saved Presets */}
                    {savedPresets.length > 0 && (
                        <div className="filter-section mb-4">
                            <label className="form-label">Saved Presets</label>
                            <div className="d-flex flex-wrap gap-2">
                                {savedPresets.map((preset, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => loadPreset(preset)}
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="filter-actions d-flex gap-2">
                        <button
                            className="btn btn-outline-secondary flex-1"
                            onClick={clearAllFilters}
                        >
                            Clear All
                        </button>
                        {!showSavePreset ? (
                            <button
                                className="btn btn-outline-info flex-1"
                                onClick={() => setShowSavePreset(true)}
                                disabled={activeFilterCount === 0}
                            >
                                <Save size={16} className="me-2" />
                                Save Preset
                            </button>
                        ) : (
                            <div className="d-flex gap-2 flex-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Preset name"
                                    value={presetName}
                                    onChange={(e) => setPresetName(e.target.value)}
                                />
                                <button
                                    className="btn btn-info"
                                    onClick={handleSavePreset}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

AdvancedFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    savedPresets: PropTypes.array,
    onSavePreset: PropTypes.func
};

export default AdvancedFilters;
