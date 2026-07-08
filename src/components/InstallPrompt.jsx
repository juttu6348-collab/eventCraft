import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import './InstallPrompt.css';

function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Check if user has dismissed before
            const dismissed = localStorage.getItem('pwa-install-dismissed');
            if (!dismissed) {
                // Show after 30 seconds
                setTimeout(() => {
                    setShowPrompt(true);
                }, 30000);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('PWA installed');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
    };

    if (!showPrompt || !deferredPrompt) return null;

    return (
        <div className="install-prompt glass-card">
            <button className="install-close" onClick={handleDismiss}>
                <X size={20} />
            </button>

            <div className="install-icon">
                <Download size={32} />
            </div>

            <div className="install-content">
                <h4>Install EventCraft</h4>
                <p>Install our app for a better experience!</p>
            </div>

            <div className="install-actions">
                <button className="btn-install" onClick={handleInstall}>
                    Install
                </button>
                <button className="btn-dismiss" onClick={handleDismiss}>
                    Not now
                </button>
            </div>
        </div>
    );
}

export default InstallPrompt;
