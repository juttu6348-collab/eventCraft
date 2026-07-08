const THEMES = [
    { id: 'elegant', name: 'Elegant', description: 'Soft & Romantic', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)' },
    { id: 'minimal', name: 'Minimal', description: 'Clean & Modern', gradient: 'linear-gradient(135deg, #f9fafb, #e5e7eb)' },
    { id: 'neon', name: 'Neon', description: 'Vibrant & Electric', gradient: 'linear-gradient(135deg, #ec4899, #38bdf8)' },
    { id: 'vintage', name: 'Vintage', description: 'Warm & Nostalgic', gradient: 'linear-gradient(135deg, #fb7185, #bef264)' },
    { id: 'ocean', name: 'Ocean', description: 'Cool & Serene', gradient: 'linear-gradient(135deg, #0ea5e9, #0c4a6e)' },
    { id: 'sunset', name: 'Sunset', description: 'Warm & Dreamy', gradient: 'linear-gradient(135deg, #f97316, #dc2626)' }
];

function StepTheme({ formData, updateFormData }) {
    return (
        <div>
            <h4 className="fw-semibold mb-2">Choose a Theme</h4>
            <p className="small text-muted-light mb-4">Select the visual style for your event microsite</p>

            <div className="row g-3">
                {THEMES.map((theme) => (
                    <div key={theme.id} className="col-md-4">
                        <div
                            onClick={() => updateFormData({ theme: theme.id })}
                            className={`card card-dark p-3 wizard-theme-card ${formData.theme === theme.id ? 'border-info border-2 active' : ''}`}
                        >
                            <div
                                className="rounded mb-3 wizard-theme-preview"
                                style={{
                                    '--theme-gradient': theme.gradient,
                                }}
                            />
                            <h6 className="mb-1">{theme.name}</h6>
                            <p className="small text-muted-light mb-0">{theme.description}</p>
                            {formData.theme === theme.id && (
                                <div className="position-absolute top-0 end-0 m-2">
                                    <span className="badge bg-info rounded-circle p-2">✓</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="alert alert-info mt-4 mb-0" role="alert">
                <small>
                    <strong>💡 Preview:</strong> The selected theme will apply throughout your microsite
                </small>
            </div>
        </div>
    );
}

export default StepTheme;
