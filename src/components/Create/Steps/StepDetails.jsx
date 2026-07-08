function StepDetails({ formData, updateFormData }) {
    const relationships = [
        'Friend',
        'Best Friend',
        'Brother',
        'Sister',
        'Mother',
        'Father',
        'Husband',
        'Wife',
        'Fiancé',
        'Fiancée',
        'Boyfriend',
        'Girlfriend',
        'Son',
        'Daughter',
        'Colleague',
        'Boss',
        'Teacher',
        'Student',
        'Cousin',
        'Aunt',
        'Uncle',
        'Grandparent',
        'Grandmother',
        'Grandfather',
        'Niece',
        'Nephew',
        'Mentor',
        'Partner',
        'Other'
    ];

    return (
        <div>
            <h4 className="fw-semibold mb-2">Event Details</h4>
            <p className="small text-muted-light mb-4">Tell us about your special occasion</p>

            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Event Type</label>
                    <select
                        value={formData.eventType}
                        onChange={(e) => updateFormData({ eventType: e.target.value })}
                        className="form-select form-control-dark"
                    >
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="wedding">Wedding</option>
                        <option value="graduation">Graduation</option>
                        <option value="baby-shower">Baby Shower</option>
                        <option value="success">Success/Achievement</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Event Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData({ date: e.target.value })}
                        className="form-control form-control-dark"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Your Name (Sender)</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.senderName}
                        onChange={(e) => updateFormData({ senderName: e.target.value })}
                        required
                        className="form-control form-control-dark"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Recipient Name</label>
                    <input
                        type="text"
                        placeholder="Who is this for?"
                        value={formData.receiverName}
                        onChange={(e) => updateFormData({ receiverName: e.target.value })}
                        required
                        className="form-control form-control-dark"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Your Relationship to Them</label>
                    <select
                        value={formData.relationship}
                        onChange={(e) => updateFormData({ relationship: e.target.value })}
                        className="form-select form-control-dark"
                    >
                        <option value="">Select relationship...</option>
                        {relationships.map((rel) => (
                            <option key={rel} value={rel}>{rel}</option>
                        ))}
                    </select>
                    <div className="form-text text-muted-light">
                        This helps us personalize the message tone
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label">Main Message (Optional)</label>
                    <textarea
                        rows={5}
                        placeholder="Write your heartfelt message... (Leave blank and AI will write a beautiful message for you based on the relationship!)"
                        value={formData.mainMessage}
                        onChange={(e) => updateFormData({ mainMessage: e.target.value })}
                        className="form-control form-control-dark"
                    />
                    <div className="form-text text-muted-light">
                        ✨ <strong>Pro tip:</strong> Leave this blank and our AI will generate a perfect, emotional message tailored to your relationship!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepDetails;
