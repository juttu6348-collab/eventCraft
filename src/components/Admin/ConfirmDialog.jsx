import { X } from 'lucide-react';

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', confirmVariant = 'danger' }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content glass-card border-0">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-muted-light mb-0">{message}</p>
                        </div>
                        <div className="modal-footer border-top border-secondary">
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                className={`btn btn-${confirmVariant}`}
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmDialog;
