import PropTypes from 'prop-types';

function FilterBar({ filterType, sortBy, onFilterChange, onSortChange }) {
    const eventTypes = [
        { value: 'all', label: 'All Events' },
        { value: 'birthday', label: '🎂 Birthday' },
        { value: 'anniversary', label: '💕 Anniversary' },
        { value: 'wedding', label: '💒 Wedding' },
        { value: 'graduation', label: '🎓 Graduation' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'name', label: 'Alphabetical' },
        { value: 'views', label: 'Most Viewed' }
    ];

    return (
        <div className="d-flex flex-column flex-sm-row gap-2 w-100">
            <select
                className="form-select form-control-dark"
                value={filterType}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
            <select
                className="form-select form-control-dark"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

FilterBar.propTypes = {
    filterType: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired
};

export default FilterBar;
