import PropTypes from 'prop-types';
import { Grid, List } from 'lucide-react';

function ViewToggle({ viewMode, onChange }) {
    return (
        <div className="btn-group w-100" role="group">
            <button
                type="button"
                className={`btn ${viewMode === 'grid' ? 'btn-info' : 'btn-outline-light'}`}
                onClick={() => onChange('grid')}
                aria-label="Grid view"
            >
                <Grid size={18} />
            </button>
            <button
                type="button"
                className={`btn ${viewMode === 'list' ? 'btn-info' : 'btn-outline-light'}`}
                onClick={() => onChange('list')}
                aria-label="List view"
            >
                <List size={18} />
            </button>
        </div>
    );
}

ViewToggle.propTypes = {
    viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
    onChange: PropTypes.func.isRequired
};

export default ViewToggle;
