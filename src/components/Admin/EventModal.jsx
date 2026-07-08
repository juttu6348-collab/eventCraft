import { useState } from 'react';
import toast from 'react-hot-toast';

function EventModal({ isOpen, onClose, onSave, event = null }) {
    const [formData, setFormData] = useState(event || {
        receiverName: '',
        eventType: 'birthday',
        senderName: '',
        visibility: 'public'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(formData);
            toast.success(event ? 'Event updated successfully' : 'Event created successfully');
            onClose();
        } catch (error) {
            toast.error('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card border-0">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title">{event ? 'Edit Event' : 'Create New Event'}</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Event Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent border-secondary text-white"
                                        value={formData.receiverName}
                                        onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Event Type</label>
                                    <select
                                        className="form-select bg-transparent border-secondary text-white"
                                        value={formData.eventType}
                                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                    >
                                        <option value="birthday">Birthday</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="anniversary">Anniversary</option>
                                        <option value="graduation">Graduation</option>
                                        <option value="baby shower">Baby Shower</option>
                                        <option value="success">Success</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Sender Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-transparent border-secondary text-white"
                                        value={formData.senderName}
                                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Visibility</label>
                                    <select
                                        className="form-select bg-transparent border-secondary text-white"
                                        value={formData.visibility}
                                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer border-top border-secondary">
                                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-gradient" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventModal;
