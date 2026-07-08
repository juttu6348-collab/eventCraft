function StepReview({ formData }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            <h4 className="fw-semibold mb-2">Review & Create</h4>
            <p className="small text-muted-light mb-4">Please review your event details before creating</p>

            <div className="row g-3">
                {/* Event Details Card */}
                <div className="col-12">
                    <div className="card card-dark">
                        <div className="card-body">
                            <h6 className="text-info mb-3">Event Details</h6>
                            <table className="table table-sm table-borderless text-muted-light">
                                <tbody>
                                    <tr>
                                        <td className="text-muted-light">Event Type:</td>
                                        <td className="text-end fw-semibold text-capitalize">{formData.eventType}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted-light">From:</td>
                                        <td className="text-end fw-semibold">{formData.senderName || 'Not specified'}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted-light">To:</td>
                                        <td className="text-end fw-semibold">{formData.receiverName || 'Not specified'}</td>
                                    </tr>
                                    {formData.relationship && (
                                        <tr>
                                            <td className="text-muted-light">Relationship:</td>
                                            <td className="text-end fw-semibold">{formData.relationship}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="text-muted-light">Date:</td>
                                        <td className="text-end fw-semibold">{formatDate(formData.date)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Theme & Pages Card */}
                <div className="col-12">
                    <div className="card card-dark">
                        <div className="card-body">
                            <h6 className="text-info mb-3">Appearance</h6>
                            <table className="table table-sm table-borderless text-muted-light">
                                <tbody>
                                    <tr>
                                        <td className="text-muted-light">Theme:</td>
                                        <td className="text-end fw-semibold text-capitalize">{formData.theme}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted-light">Pages:</td>
                                        <td className="text-end">
                                            {formData.enabledPages.map(page => (
                                                <span key={page} className="badge bg-info me-1 mb-1 text-capitalize">
                                                    {page}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted-light">Photos:</td>
                                        <td className="text-end fw-semibold">{formData.photos.length} uploaded</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Message Preview */}
                {formData.mainMessage && (
                    <div className="col-12">
                        <div className="card card-dark">
                            <div className="card-body">
                                <h6 className="text-info mb-3">Main Message</h6>
                                <p className="text-muted-light small mb-0 pre-wrap">
                                    {formData.mainMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Page Preview */}
                {formData.enabledPages.includes('custom') && formData.customPageData.title && (
                    <div className="col-12">
                        <div className="card card-dark">
                            <div className="card-body">
                                <h6 className="text-info mb-3">Custom Page</h6>
                                <p className="fw-semibold mb-2">{formData.customPageData.title}</p>
                                <p className="text-muted-light small mb-0">
                                    {formData.customPageData.body || 'No content provided'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="alert alert-info mt-4 text-center mb-0" role="alert">
                <small>
                    <strong>✨ Ready to create!</strong> Click "Generate Microsite" below
                </small>
            </div>
        </div>
    );
}

export default StepReview;
