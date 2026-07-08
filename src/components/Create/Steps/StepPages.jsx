const AVAILABLE_PAGES = [
    { id: 'home', name: 'Home', description: 'Hero section with main message', disabled: true },
    { id: 'letter', name: 'Letter', description: 'A heartfelt letter to the recipient' },
    { id: 'gallery', name: 'Gallery', description: 'Photo gallery with your uploads' },
    { id: 'memories', name: 'Memories', description: 'Shared memories & timeline' },
    { id: 'surprise', name: 'Surprise', description: 'Special surprise reveal with confetti' },
    { id: 'custom', name: 'Custom Page', description: 'Create your own custom content' }
];

function StepPages({ formData, updateFormData }) {
    const togglePage = (pageId) => {
        if (pageId === 'home') return;

        const newEnabledPages = formData.enabledPages.includes(pageId)
            ? formData.enabledPages.filter(p => p !== pageId)
            : [...formData.enabledPages, pageId];

        updateFormData({ enabledPages: newEnabledPages });
    };

    return (
        <div>
            <h4 className="fw-semibold mb-2">Select Pages</h4>
            <p className="small text-muted-light mb-4">Choose which sections to include in your microsite</p>

            <div className="list-group">
                {AVAILABLE_PAGES.map((page) => (
                    <div
                        key={page.id}
                        onClick={() => !page.disabled && togglePage(page.id)}
                        className={`list-group-item list-group-item-action wizard-page-item ${formData.enabledPages.includes(page.id) ? 'active' : ''} ${page.disabled ? 'disabled' : ''}`}
                    >
                        <div className="d-flex align-items-start">
                            <div className="me-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input mt-0"
                                    checked={formData.enabledPages.includes(page.id)}
                                    disabled={page.disabled}
                                    readOnly
                                />
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                    <h6 className="mb-0">{page.name}</h6>
                                    {page.disabled && (
                                        <span className="badge bg-secondary">Required</span>
                                    )}
                                </div>
                                <p className="small text-muted-light mb-0">{page.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {formData.enabledPages.includes('custom') && (
                <div className="glass-card p-4 mt-4">
                    <h6 className="text-info mb-3">Custom Page Content</h6>
                    <div className="mb-3">
                        <label className="form-label">Page Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Our Story, Thank You"
                            value={formData.customPageData.title}
                            onChange={(e) => updateFormData({
                                customPageData: { ...formData.customPageData, title: e.target.value }
                            })}
                            className="form-control form-control-dark"
                        />
                    </div>
                    <div>
                        <label className="form-label">Page Content</label>
                        <textarea
                            rows={4}
                            placeholder="Write your custom content here..."
                            value={formData.customPageData.body}
                            onChange={(e) => updateFormData({
                                customPageData: { ...formData.customPageData, body: e.target.value }
                            })}
                            className="form-control form-control-dark"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default StepPages;
