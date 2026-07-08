import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import PropTypes from 'prop-types';

function QRCodeDisplay({ url, filename = 'qrcode' }) {
    const handleDownload = () => {
        const svg = document.getElementById('qr-code-svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        canvas.width = 512;
        canvas.height = 512;

        img.onload = () => {
            // White background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR code
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${filename}.png`;
                link.click();
                URL.revokeObjectURL(url);
            });
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    return (
        <div className="qr-code-display">
            <div className="qr-code-wrapper">
                <QRCodeSVG
                    id="qr-code-svg"
                    value={url}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="qr-code-svg"
                />
            </div>
            <button
                onClick={handleDownload}
                className="btn btn-outline-light btn-sm mt-3 d-flex align-items-center gap-2 mx-auto"
            >
                <Download size={16} />
                Download QR Code
            </button>
        </div>
    );
}

QRCodeDisplay.propTypes = {
    url: PropTypes.string.isRequired,
    filename: PropTypes.string
};

export default QRCodeDisplay;
