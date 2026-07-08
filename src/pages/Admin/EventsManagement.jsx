import { useState, useEffect } from 'react';
import {
    Search,
    Trash2,
    Eye,
    ExternalLink,
    RefreshCw,
    Download,
    Edit,
    Calendar
} from 'lucide-react';
import {
    getAllEvents,
    deleteEventAdmin,
    updateEvent
} from '../../services/adminService';
import EventModal from '../../components/Admin/EventModal';
import ConfirmDialog from '../../components/Admin/ConfirmDialog';
import toast from 'react-hot-toast';

function EventsManagement() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [events, searchQuery, filterType]);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) {
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        let filtered = events;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.senderName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(event => event.eventType === filterType);
        }

        setFilteredEvents(filtered);
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEventAdmin(eventId);
            toast.success('Event deleted successfully');
            loadEvents();
        } catch (error) {
            toast.error('Failed to delete event');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedEvents.length === 0) return;

        try {
            await Promise.all(selectedEvents.map(id => deleteEventAdmin(id)));
            toast.success(`${selectedEvents.length} events deleted`);
            setSelectedEvents([]);
            loadEvents();
        } catch (error) {
            toast.error('Failed to delete events');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['Event Name', 'Type', 'Sender', 'Created', 'Views'].join(','),
            ...filteredEvents.map(event => [
                event.receiverName || 'N/A',
                event.eventType,
                event.senderName || 'N/A',
                event.createdAt?.toDate?.().toLocaleDateString() || 'N/A',
                event.views || 0
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `events-${new Date().toISOString()}.csv`;
        a.click();
        toast.success('Events exported to CSV');
    };

    // Get unique event types
    const eventTypes = ['all', ...new Set(events.map(e => e.eventType))];

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="mb-1">Events Management</h2>
                <p className="text-muted-light mb-0">Manage all events and their data</p>
            </div>

            {/* Actions Bar */}
            <div className="glass-card p-3 mb-3">
                <div className="row g-2">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-secondary">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-transparent border-secondary text-white"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select bg-transparent border-secondary text-white"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            {eventTypes.map(type => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Types' : type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-5 d-flex gap-2 justify-content-end">
                        <button className="btn btn-outline-info" onClick={loadEvents}>
                            <RefreshCw size={16} className="me-1" />
                            Refresh
                        </button>
                        <button className="btn btn-outline-success" onClick={exportToCSV}>
                            <Download size={16} className="me-1" />
                            Export CSV
                        </button>
                        {selectedEvents.length > 0 && (
                            <button className="btn btn-outline-danger" onClick={handleBulkDelete}>
                                <Trash2 size={16} className="me-1" />
                                Delete ({selectedEvents.length})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Events Table */}
            {filteredEvents.length === 0 ? (
                <div className="glass-card p-5">
                    <div className="empty-state-container">
                        <div className="empty-state-content">
                            <div className="empty-state-icon">
                                <Calendar size={64} strokeWidth={1.5} />
                            </div>
                            <h3 className="empty-state-title">
                                {events.length === 0 ? 'No Events Yet' : 'No Events Found'}
                            </h3>
                            <p className="empty-state-message">
                                {events.length === 0
                                    ? 'There are no events in the system yet. Events will appear here once users create them.'
                                    : 'No events match your search criteria. Try adjusting your filters.'}
                            </p>
                            {searchQuery || filterType !== 'all' ? (
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilterType('all');
                                    }}
                                >
                                    Clear Filters
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-3">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedEvents(filteredEvents.map(e => e.id));
                                                } else {
                                                    setSelectedEvents([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th>Event Name</th>
                                    <th>Type</th>
                                    <th>Sender</th>
                                    <th>Created</th>
                                    <th>Views</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map(event => (
                                    <tr key={event.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedEvents.includes(event.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedEvents([...selectedEvents, event.id]);
                                                    } else {
                                                        setSelectedEvents(selectedEvents.filter(id => id !== event.id));
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td className="fw-semibold">{event.receiverName}</td>
                                        <td><span className="badge bg-secondary">{event.eventType}</span></td>
                                        <td>{event.senderName || 'N/A'}</td>
                                        <td>{event.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                                        <td>{event.views || 0}</td>
                                        <td className="text-end">
                                            <div className="btn-group btn-group-sm">
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() => {
                                                        setEditingEvent(event);
                                                        setShowEventModal(true);
                                                    }}
                                                    title="Edit Event"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <a
                                                    href={`/e/${event.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-info"
                                                    title="View Microsite"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        setEventToDelete(event);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 text-muted-light small">
                        Showing {filteredEvents.length} of {events.length} events
                    </div>
                </div>
            )}

            {/* Event Modal */}
            <EventModal
                isOpen={showEventModal}
                onClose={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                }}
                onSave={async (eventData) => {
                    if (editingEvent) {
                        await updateEvent(editingEvent.id, eventData);
                    }
                    loadEvents();
                }}
                event={editingEvent}
            />

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setEventToDelete(null);
                }}
                onConfirm={() => {
                    if (eventToDelete) {
                        handleDeleteEvent(eventToDelete.id);
                    }
                }}
                title="Delete Event"
                message={`Are you sure you want to delete the event "${eventToDelete?.receiverName}"? This action cannot be undone.`}
                confirmText="Delete"
                confirmVariant="danger"
            />
        </div>
    );
}

export default EventsManagement;

