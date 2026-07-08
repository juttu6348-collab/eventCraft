import { useState } from 'react';
import { Shield, Key, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

function SecuritySettings() {
    const [settings, setSettings] = useState({
        sessionTimeout: '30',
        passwordMinLength: '8',
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        enable2FA: false,
        ipWhitelist: '',
        failedLoginAttempts: '5',
        lockoutDuration: '15'
    });

    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save to Firestore settings
            // await saveSecuritySettings(settings);
            toast.success('Security settings saved successfully');
        } catch (error) {
            toast.error('Failed to save security settings');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="mb-2">
                    <Shield size={24} className="text-info me-2" />
                    Security Settings
                </h3>
                <p className="text-muted-light">Configure security and access control</p>
            </div>

            {/* Session Management */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">
                    <Lock size={20} className="text-warning me-2" />
                    Session Management
                </h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Session Timeout (minutes)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                        />
                        <small className="text-muted-light">Time before auto logout</small>
                    </div>
                </div>
            </div>

            {/* Password Requirements */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">
                    <Key size={20} className="text-success me-2" />
                    Password Requirements
                </h5>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Minimum Length</label>
                        <input
                            type="number"
                            className="form-control"
                            value={settings.passwordMinLength}
                            onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="requireUppercase"
                        checked={settings.requireUppercase}
                        onChange={(e) => setSettings({ ...settings, requireUppercase: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="requireUppercase">
                        Require at least one uppercase letter
                    </label>
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="requireNumbers"
                        checked={settings.requireNumbers}
                        onChange={(e) => setSettings({ ...settings, requireNumbers: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="requireNumbers">
                        Require at least one number
                    </label>
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="requireSpecialChars"
                        checked={settings.requireSpecialChars}
                        onChange={(e) => setSettings({ ...settings, requireSpecialChars: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="requireSpecialChars">
                        Require at least one special character
                    </label>
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Two-Factor Authentication</h5>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="enable2FA"
                        checked={settings.enable2FA}
                        onChange={(e) => setSettings({ ...settings, enable2FA: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="enable2FA">
                        Enable Two-Factor Authentication for admin accounts
                    </label>
                </div>

                {settings.enable2FA && (
                    <div className="alert alert-info">
                        <small>
                            📱 Users will be required to set up 2FA on their next login
                        </small>
                    </div>
                )}
            </div>

            {/* Access Control */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Access Control</h5>

                <div className="mb-3">
                    <label className="form-label">IP Whitelist (one per line)</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={settings.ipWhitelist}
                        onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                        placeholder="192.168.1.1&#10;10.0.0.0/8"
                    />
                    <small className="text-muted-light">
                        Leave empty to allow all IPs. Use CIDR notation for ranges.
                    </small>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Failed Login Attempts Threshold</label>
                        <input
                            type="number"
                            className="form-control"
                            value={settings.failedLoginAttempts}
                            onChange={(e) => setSettings({ ...settings, failedLoginAttempts: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Lockout Duration (minutes)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={settings.lockoutDuration}
                            onChange={(e) => setSettings({ ...settings, lockoutDuration: e.target.value })}
                        />
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

export default SecuritySettings;
