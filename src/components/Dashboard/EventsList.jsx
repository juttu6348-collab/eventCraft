import PropTypes from 'prop-types';
import EventCard from './EventCard';

function EventsList({ events, viewMode, onEventUpdated }) {
    if (events.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted-light">No events found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className={viewMode === 'grid' ? 'row g-3' : 'd-flex flex-column gap-3'}>
            {events.map(event => (
                <div key={event.id} className={viewMode === 'grid' ? 'col-12 col-md-6 col-lg-4' : ''}>
                    <EventCard
                        event={event}
                        viewMode={viewMode}
                        onEventUpdated={onEventUpdated}
                    />
                </div>
            ))}
        </div>
    );
}

EventsList.propTypes = {
    events: PropTypes.array.isRequired,
    viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
    onEventUpdated: PropTypes.func.isRequired
};

export default EventsList;
