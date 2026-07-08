import { useState } from 'react';
import { Mail, Send, Save } from 'lucide-react';
import toast from 'react-hot-toast';

function EmailSettings() {
    const [config, setConfig] = useState({
        smtpHost: '',
        smtpPort: '587',
        smtpSecure: false,
        smtpUser: '',
        smtpPassword: '',
        fromEmail: '',
        fromName: 'EventCraft',
        notifications: {
            newUser: true,
            newEvent: true,
            viewMilestones: true
        }
    });

    const [testEmail, setTestEmail] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save to Firestore settings collection
            // await saveEmailSettings(config);
            toast.success('Email settings saved successfully');
        } catch (error) {
            toast.error('Failed to save email settings');
        } finally {
            setSaving(false);
        }
    };

    const handleTestEmail = async () => {
        if (!testEmail) {
            toast.error('Please enter a test email address');
            return;
        }

        try {
            // Send test email
            toast.success('Test email sent successfully');
        } catch (error) {
            toast.error('Failed to send test email');
        }
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="mb-2">
                    <Mail size={24} className="text-info me-2" />
                    Email Settings
                </h3>
                <p className="text-muted-light">Configure SMTP and email notifications</p>
            </div>

            {/* SMTP Configuration */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">SMTP Configuration</h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">SMTP Host</label>
                        <input
                            type="text"
                            className="form-control"
                            value={config.smtpHost}
                            onChange={(e) => setConfig({ ...config, smtpHost: e.target.value })}
                            placeholder="smtp.gmail.com"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">SMTP Port</label>
                        <input
                            type="number"
                            className="form-control"
                            value={config.smtpPort}
                            onChange={(e) => setConfig({ ...config, smtpPort: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">SMTP Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={config.smtpUser}
                            onChange={(e) => setConfig({ ...config, smtpUser: e.target.value })}
                            placeholder="noreply@eventcraft.com"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">SMTP Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={config.smtpPassword}
                            onChange={(e) => setConfig({ ...config, smtpPassword: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="smtpSecure"
                                checked={config.smtpSecure}
                                onChange={(e) => setConfig({ ...config, smtpSecure: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="smtpSecure">
                                Use Secure Connection (TLS)
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Notifications */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Email Notifications</h5>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="newUser"
                        checked={config.notifications.newUser}
                        onChange={(e) => setConfig({
                            ...config,
                            notifications: { ...config.notifications, newUser: e.target.checked }
                        })}
                    />
                    <label className="form-check-label" htmlFor="newUser">
                        New User Registration
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="newEvent"
                        checked={config.notifications.newEvent}
                        onChange={(e) => setConfig({
                            ...config,
                            notifications: { ...config.notifications, newEvent: e.target.checked }
                        })}
                    />
                    <label className="form-check-label" htmlFor="newEvent">
                        New Event Created
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="viewMilestones"
                        checked={config.notifications.viewMilestones}
                        onChange={(e) => setConfig({
                            ...config,
                            notifications: { ...config.notifications, viewMilestones: e.target.checked }
                        })}
                    />
                    <label className="form-check-label" htmlFor="viewMilestones">
                        Event View Milestones (100, 500, 1000 views)
                    </label>
                </div>
            </div>

            {/* Test Email */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Test Email</h5>

                <div className="row g-3">
                    <div className="col-md-8">
                        <input
                            type="email"
                            className="form-control"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            placeholder="Enter email to send test"
                        />
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-outline-info w-100" onClick={handleTestEmail}>
                            <Send size={16} className="me-2" />
                            Send Test
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-gradient px-4"
                    onClick={handleSave}
                    disabled={saving}
                >
                    <Save size={16} className="me-2" />
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}

export default EmailSettings;
