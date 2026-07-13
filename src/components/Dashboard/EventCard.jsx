import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Share2, Edit, Trash2, Copy, Star, MoreVertical, BarChart3 } from 'lucide-react';
import './EventCard.css';

function EventCard({ event, onDelete, onDuplicate, onToggleFavorite }) {
    const [showActions, setShowActions] = useState(false);
    const [isFavorite, setIsFavorite] = useState(event.isFavorite || false);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite?.(event.id, !isFavorite);
    };

    const handleDuplicate = () => {
        onDuplicate?.(event);
        setShowActions(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Delete "${event.receiverName}"?`)) {
            onDelete?.(event.id);
        }
        setShowActions(false);
    };

    const getEventIcon = (type) => {
        const icons = {
            birthday: '🎂',
            wedding: '💒',
            anniversary: '💕',
            graduation: '🎓',
            'baby shower': '👶',
            success: '🎉',
            other: '📅'
        };
        return icons[type] || icons.other;
    };

    const formattedDate = event.createdAt?.toDate?.().toLocaleDateString() || 'N/A';
    const updatedDate = event.updatedAt?.toDate?.().toLocaleDateString();
    const views = event.views || 0;

    return (
        <div className="event-card glass-card">
            {/* Quick Actions Dropdown */}
            <div className="event-card-actions">
                <button
                    className="btn-icon-action"
                    onClick={handleToggleFavorite}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Star size={18} fill={isFavorite ? 'gold' : 'none'} stroke={isFavorite ? 'gold' : 'currentColor'} />
                </button>

                <div className="dropdown">
                    <button
                        className="btn-icon-action"
                        onClick={() => setShowActions(!showActions)}
                        title="More actions"
                    >
                        <MoreVertical size={18} />
                    </button>

                    {showActions && (
                        <div className="dropdown-menu show">
                            <Link to={`/event-analytics/${event.id}`} className="dropdown-item">
                                <BarChart3 size={16} className="me-2" />
                                View Analytics
                            </Link>
                            <Link to={`/edit-event/${event.id}`} className="dropdown-item">
                                <Edit size={16} className="me-2" />
                                Edit Event
                            </Link>
                            <button onClick={handleDuplicate} className="dropdown-item">
                                <Copy size={16} className="me-2" />
                                Duplicate
                            </button>
                            <div className="dropdown-divider"></div>
                            <button onClick={handleDelete} className="dropdown-item text-danger">
                                <Trash2 size={16} className="me-2" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Event Icon & Type */}
            <div className="event-card-header">
                <span className="event-icon">{getEventIcon(event.eventType)}</span>
                <span className="event-type-badge">{event.eventType}</span>
            </div>

            {/* Event Details */}
            <Link to={`/e/${event.slug}`} className="event-card-content">
                <h3 className="event-card-title">{event.receiverName}</h3>
                {event.senderName && (
                    <p className="event-card-sender">From: {event.senderName}</p>
                )}

                <div className="event-card-meta">
                    <div className="meta-item">
                        <Calendar size={14} />
                        <span>Created {formattedDate}</span>
                    </div>
                    {updatedDate && updatedDate !== formattedDate && (
                        <div className="meta-item text-muted-light">
                            <Edit size={14} />
                            <span>Updated {updatedDate}</span>
                        </div>
                    )}
                    <div className="meta-item">
                        <Eye size={14} />
                        <span>{views} {views === 1 ? 'view' : 'views'}</span>
                    </div>
                </div>
            </Link>

            {/* Action Buttons */}
            <div className="event-card-footer">
                <Link to={`/e/${event.slug}`} className="btn btn-sm btn-outline-info">
                    <Eye size={14} className="me-1" />
                    View
                </Link>
                <Link to={`/share/${event.slug}`} className="btn btn-sm btn-outline-success">
                    <Share2 size={14} className="me-1" />
                    Share
                </Link>
            </div>
        </div>
    );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,

    slug: PropTypes.string.isRequired,

    receiverName: PropTypes.string.isRequired,
    senderName: PropTypes.string,
    eventType: PropTypes.string.isRequired,
    views: PropTypes.number,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    updatedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    isFavorite: PropTypes.bool
  }).isRequired,

  onDelete: PropTypes.func,
  onDuplicate: PropTypes.func,
  onToggleFavorite: PropTypes.func
};

export default EventCard;
