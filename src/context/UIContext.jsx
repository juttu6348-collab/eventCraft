import { createContext, useContext, useState, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UIContext = createContext();

export function useUI() {
    return useContext(UIContext);
}

export function UIProvider({ children }) {
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        variant: 'primary',
        onConfirm: () => { },
        onCancel: () => { }
    });

    const confirm = useCallback(({
        title = 'Are you sure?',
        message,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        variant = 'primary'
    }) => {
        return new Promise((resolve) => {
            setConfirmModal({
                isOpen: true,
                title,
                message,
                confirmText,
                cancelText,
                variant,
                onConfirm: () => {
                    setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                }
            });
        });
    }, []);

    return (
        <UIContext.Provider value={{ confirm }}>
            {children}

            {/* Global Confirm Modal */}
            <Modal show={confirmModal.isOpen} onHide={confirmModal.onCancel} centered className="glass-modal">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold gradient-text">{confirmModal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-secondary">
                    {confirmModal.message}
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="link" className="text-muted text-decoration-none" onClick={confirmModal.onCancel}>
                        {confirmModal.cancelText}
                    </Button>
                    <Button
                        variant={confirmModal.variant === 'danger' ? 'danger' : 'gradient'}
                        onClick={confirmModal.onConfirm}
                        className={confirmModal.variant !== 'danger' ? 'btn-gradient' : ''}
                    >
                        {confirmModal.confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </UIContext.Provider>
    );
}
