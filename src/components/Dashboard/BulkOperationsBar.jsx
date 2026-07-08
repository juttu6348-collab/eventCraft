import { useState } from 'react';
import PropTypes from 'prop-types';
import { Trash2, Download, Archive, Check, X } from 'lucide-react';
import { bulkDeleteEvents } from '../../services/eventService';
import toast from 'react-hot-toast';

function BulkOperationsBar({ selectedEvents, events, onComplete }) {
    const [loading, setLoading] = useState(false);

    const handleBulkDelete = async () => {
        if (!window.confirm(`Delete ${selectedEvents.length} events? This cannot be undone.`)) {
            return;
        }

        setLoading(true);
        try {
            await bulkDeleteEvents(selectedEvents);
            toast.success(`${selectedEvents.length} events deleted`);
            onComplete();
        } catch (error) {
            toast.error('Failed to delete events');
        } finally {
            setLoading(false);
        }
    };

    const handleBulkExport = () => {
        const selectedEventData = events.filter(e => selectedEvents.includes(e.id));

        const csv = [
            ['Event Name', 'Type', 'Sender', 'Created', 'Views'].join(','),
            ...selectedEventData.map(event => [
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
        a.download = `events-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();

        toast.success(`Exported ${selectedEvents.length} events`);
    };

    if (selectedEvents.length === 0) return null;

    return (
        <div className="bulk-operations-bar glass-card">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <Check size={20} className="text-info" />
                    <span className="fw-semibold">{selectedEvents.length} events selected</span>
                </div>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-outline-info"
                        onClick={handleBulkExport}
                        disabled={loading}
                    >
                        <Download size={16} className="me-2" />
                        Export
                    </button>

                    <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => toast.info('Archive feature coming soon')}
                        disabled={loading}
                    >
                        <Archive size={16} className="me-2" />
                        Archive
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleBulkDelete}
                        disabled={loading}
                    >
                        <Trash2 size={16} className="me-2" />
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>

                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={onComplete}
                        disabled={loading}
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

BulkOperationsBar.propTypes = {
    selectedEvents: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    onComplete: PropTypes.func.isRequired
};

export default BulkOperationsBar;
