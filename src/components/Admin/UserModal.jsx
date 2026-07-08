import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

function UserModal({ isOpen, onClose, onSave, user = null, onWipeUserData }) {
    const [formData, setFormData] = useState(user || {
        displayName: '',
        email: '',
        role: 'user',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);
    const [showWipeConfirm, setShowWipeConfirm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(formData);
            toast.success(user ? 'User updated successfully' : 'User created successfully');
            onClose();
        } catch (error) {
            toast.error('Failed to save user');
        } finally {
            setLoading(false);
        }
    };

    const handleWipeData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            await onWipeUserData(user.id);
            toast.success('User data wiped successfully');
            setShowWipeConfirm(false);
            onClose();
        } catch (error) {
            toast.error('Failed to wipe user data');
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
                            <h5 className="modal-title">{user ? 'Edit User' : 'Create New User'}</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        {!showWipeConfirm ? (
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Display Name</label>
                                        <input
                                            type="text"
                                            className="form-control bg-transparent border-secondary text-white"
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control bg-transparent border-secondary text-white"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            disabled={!!user}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <select
                                            className="form-select bg-transparent border-secondary text-white"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="guest">Guest</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            className="form-select bg-transparent border-secondary text-white"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="active">Active</option>
                                            <option value="suspended">Suspended</option>
                                        </select>
                                    </div>

                                    {user && user.eventIds && user.eventIds.length > 0 && (
                                        <div className="alert alert-info">
                                            <small>This user has {user.eventIds.length} event(s)</small>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer border-top border-secondary d-flex justify-content-between">
                                    <div>
                                        {user && onWipeUserData && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => setShowWipeConfirm(true)}
                                            >
                                                Wipe User Data
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-outline-secondary me-2" onClick={onClose}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-gradient" disabled={loading}>
                                            {loading ? 'Saving...' : 'Save User'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="modal-body">
                                    <div className="alert alert-danger">
                                        <h6 className="alert-heading">⚠️ Confirm Data Wipe</h6>
                                        <p className="mb-0">
                                            This will permanently delete all events created by <strong>{user?.displayName || user?.email}</strong>.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer border-top border-secondary">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowWipeConfirm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleWipeData}
                                        disabled={loading}
                                    >
                                        {loading ? 'Wiping...' : 'Yes, Wipe All User Data'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserModal;
