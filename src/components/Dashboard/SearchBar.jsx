import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar-wrapper position-relative">
            <Search size={18} className="search-icon" />
            <input
                type="text"
                className="form-control form-control-dark ps-5"
                placeholder="Search events..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="btn btn-link position-absolute search-clear-btn"
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SearchBar;
