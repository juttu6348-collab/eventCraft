import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, Share2, ExternalLink, QrCode as QrIcon, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

function SharePage() {
    const { slug } = useParams();
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const eventUrl = `${window.location.origin}/e/${slug}`;

    useEffect(() => {
        // Enhanced confetti effect on load
        if (!showConfetti) return;

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                setShowConfetti(false);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            // Create confetti particles
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = '-10px';
                particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.opacity = '1';
                particle.style.transition = 'all 3s ease-out';

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.style.top = '100vh';
                    particle.style.left = `${parseFloat(particle.style.left) + randomInRange(-20, 20)}%`;
                    particle.style.transform = `rotate(${randomInRange(0, 720)}deg)`;
                    particle.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    document.body.removeChild(particle);
                }, 3000);
            }
        }, 250);

        return () => {
            clearInterval(interval);
        };
    }, [showConfetti]);

    const copyLink = () => {
        navigator.clipboard.writeText(eventUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareWhatsApp = () => {
        const message = `Check out this special microsite I created for you! ${eventUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
    };

    const shareNative = () => {
        if (navigator.share) {
            navigator.share({
                title: 'EventCraft Microsite',
                text: 'Check out this special microsite!',
                url: eventUrl
            });
        }
    };

    const downloadQR = () => {
        const svg = document.getElementById('qr-code');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `eventcraft-qr-${slug}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            });
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative overflow-hidden px-3 py-5 share-page-main-wrapper">

                <div className="bg-decoration share-bg-decor-pink" />
                <div className="bg-decoration share-bg-decor-blue" />

                <div className="container position-relative share-container">
                    {/* Success Message */}
                    <div className="text-center mb-5 bounce-in">
                        <div className="d-inline-flex align-items-center justify-content-center mb-4 pulse share-success-icon-wrapper">
                            <CheckCircle size={56} color="white" />
                        </div>
                        <h1 className="display-4 fw-bold mb-3">
                            🎉 <span className="gradient-text-animated">Success!</span> 🎉
                        </h1>
                        <p className="lead text-muted-light">
                            Your beautiful microsite is ready to share!
                        </p>
                    </div>

                    {/* Share Card */}
                    <div className="glass-card p-4 p-md-5 mb-4 fade-in-up hover-lift" style={{ animationDelay: '0.2s' }}>
                        <h5 className="text-center text-info mb-4">Your Unique Link</h5>

                        {/* URL Display */}
                        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
                            <input
                                type="text"
                                value={eventUrl}
                                readOnly
                                className="form-control form-control-dark flex-grow-1 share-url-input"
                            />
                            <button
                                onClick={copyLink}
                                className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 btn-ripple hover-glow share-copy-btn"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={18} />
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>

                        {/* QR Code */}
                        <div className="text-center mb-4 scale-in" style={{ animationDelay: '0.4s' }}>
                            <div className="d-inline-block p-4 bg-white rounded-3 shadow-lg hover-scale share-qr-card">
                                <QRCodeSVG
                                    id="qr-code"
                                    value={eventUrl}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                    style={{ display: 'block' }}
                                />
                            </div>
                            <div className="mt-3">
                                <p className="small text-muted-light mb-2">
                                    Scan QR code to open microsite
                                </p>
                                <button
                                    onClick={downloadQR}
                                    className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-2 hover-lift"
                                >
                                    <Download size={16} />
                                    Download QR Code
                                </button>
                            </div>
                        </div>

                        <hr className="share-divider" />

                        {/* Share Buttons */}
                        <h6 className="text-center mb-3">Share via</h6>
                        <div className="row g-2 mb-4">
                            <div className="col-6 col-md-3">
                                <button
                                    onClick={shareWhatsApp}
                                    className="btn btn-success w-100 d-flex flex-column align-items-center gap-2 py-3 hover-lift btn-ripple"
                                >
                                    <Share2 size={24} />
                                    <span className="small">WhatsApp</span>
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    onClick={shareFacebook}
                                    className="btn btn-primary w-100 d-flex flex-column align-items-center gap-2 py-3 hover-lift btn-ripple"
                                >
                                    <Share2 size={24} />
                                    <span className="small">Facebook</span>
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    onClick={copyLink}
                                    className="btn btn-secondary w-100 d-flex flex-column align-items-center gap-2 py-3 hover-lift btn-ripple"
                                >
                                    <Copy size={24} />
                                    <span className="small">Instagram</span>
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button
                                    onClick={shareNative}
                                    className="btn btn-outline-light w-100 d-flex flex-column align-items-center gap-2 py-3 hover-lift btn-ripple"
                                >
                                    <Share2 size={24} />
                                    <span className="small">More</span>
                                </button>
                            </div>
                        </div>

                        {/* What's Inside */}
                        <div className="alert alert-info mb-0 fade-in-up share-info-alert" role="alert">
                            <strong>📦 What's inside your microsite:</strong>
                            <ul className="small mb-0 mt-2">
                                <li>Beautiful welcome page with animations</li>
                                <li>Heartfelt letter page</li>
                                <li>Photo gallery (if photos uploaded)</li>
                                <li>Memory timeline with special moments</li>
                                <li>Surprise reveal with confetti effect</li>
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center fade-in-up share-actions-wrapper">
                        <Link
                            to={`/e/${slug}`}
                            target="_blank"
                            className="btn btn-gradient btn-lg d-flex align-items-center justify-content-center gap-2 btn-ripple hover-glow"
                        >
                            <ExternalLink size={20} />
                            Open Microsite Now
                        </Link>
                        <Link
                            to="/create"
                            className="btn btn-outline-light btn-lg hover-lift btn-ripple"
                        >
                            Create Another One
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SharePage;
