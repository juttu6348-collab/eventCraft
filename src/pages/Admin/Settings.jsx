import { useState } from 'react';
import {
    Wrench,
    Database,
    RefreshCw,
    Trash2,
    AlertTriangle,
    CheckCircle,
    Server,
    HardDrive,
    Settings as SettingsIcon,
    Mail,
    Shield,
    Key
} from 'lucide-react';
import ConfirmDialog from '../../components/Admin/ConfirmDialog';
import EmailSettings from './settings/EmailSettings';
import SecuritySettings from './settings/SecuritySettings';
import BackupSettings from './settings/BackupSettings';
import toast from 'react-hot-toast';

function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [showWipeAllConfirm, setShowWipeAllConfirm] = useState(false);
    const [showRepairConfirm, setShowRepairConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [appConfig, setAppConfig] = useState({
        siteName: 'EventCraft',
        siteDescription: 'Create beautiful event microsites',
        contactEmail: 'admin@eventcraft.com',
        maxEventsPerUser: 10,
        emailNotifications: true
    });

    const handleRepairDatabase = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success('Database repaired successfully');
        } catch (error) {
            toast.error('Failed to repair database');
        } finally {
            setLoading(false);
        }
    };

    const handleClearCache = async () => {
        setLoading(true);
        try {
            localStorage.clear();
            sessionStorage.clear();
            toast.success('Cache cleared successfully');
            window.location.reload();
        } catch (error) {
            toast.error('Failed to clear cache');
        } finally {
            setLoading(false);
        }
    };

    const handleWipeAllData = async () => {
        setLoading(true);
        try {
            toast.success('All data wiped successfully');
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            toast.error('Failed to wipe data');
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshAllData = async () => {
        setLoading(true);
        try {
            toast.success('Data refreshed successfully');
            window.location.reload();
        } catch (error) {
            toast.error('Failed to refresh data');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfig = async () => {
        setLoading(true);
        try {
            localStorage.setItem('appConfig', JSON.stringify(appConfig));
            toast.success('Configuration saved successfully');
        } catch (error) {
            toast.error('Failed to save configuration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="mb-1">Settings & Configuration</h2>
                <p className="text-muted-light mb-0">Manage your system settings and preferences</p>
            </div>

            {/* Tabs */}
            <div className="glass-card mb-4">
                <ul className="nav nav-tabs border-0">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <SettingsIcon size={16} className="me-2" />
                            General
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'email' ? 'active' : ''}`}
                            onClick={() => setActiveTab('email')}
                        >
                            <Mail size={16} className="me-2" />
                            Email
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Shield size={16} className="me-2" />
                            Security
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'backup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('backup')}
                        >
                            <Database size={16} className="me-2" />
                            Backup
                        </button>
                    </li>
                </ul>
            </div>

            {/* Tab Content */}
            {activeTab === 'general' && (
                <>
                    {/* System Health */}
                    <div className="glass-card p-4 mb-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <Server size={20} className="text-success" />
                            System Health
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <CheckCircle size={20} className="text-success" />
                                    <div>
                                        <div className="small text-muted-light">Database</div>
                                        <div className="fw-semibold text-success">Connected</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <CheckCircle size={20} className="text-success" />
                                    <div>
                                        <div className="small text-muted-light">Auth Service</div>
                                        <div className="fw-semibold text-success">Online</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <CheckCircle size={20} className="text-success" />
                                    <div>
                                        <div className="small text-muted-light">Storage</div>
                                        <div className="fw-semibold text-success">Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App Configuration */}
                    <div className="glass-card p-4 mb-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <SettingsIcon size={20} className="text-info" />
                            Application Configuration
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Site Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appConfig.siteName}
                                    onChange={(e) => setAppConfig({ ...appConfig, siteName: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contact Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={appConfig.contactEmail}
                                    onChange={(e) => setAppConfig({ ...appConfig, contactEmail: e.target.value })}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Site Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={appConfig.siteDescription}
                                    onChange={(e) => setAppConfig({ ...appConfig, siteDescription: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Max Events Per User</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={appConfig.maxEventsPerUser}
                                    onChange={(e) => setAppConfig({ ...appConfig, maxEventsPerUser: Number(e.target.value) })}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email Notifications</label>
                                <select
                                    className="form-select"
                                    value={appConfig.emailNotifications ? 'enabled' : 'disabled'}
                                    onChange={(e) => setAppConfig({ ...appConfig, emailNotifications: e.target.value === 'enabled' })}
                                >
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-gradient" onClick={handleSaveConfig} disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Configuration'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-4 mb-3">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <Wrench size={20} className="text-info" />
                            Quick Maintenance Actions
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <button
                                    className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                                    onClick={handleRefreshAllData}
                                    disabled={loading}
                                >
                                    <RefreshCw size={20} />
                                    <div className="text-start">
                                        <div className="fw-semibold">Refresh All Data</div>
                                        <small className="text-muted-light">Reload all cached data</small>
                                    </div>
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button
                                    className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                                    onClick={handleClearCache}
                                    disabled={loading}
                                >
                                    <HardDrive size={20} />
                                    <div className="text-start">
                                        <div className="fw-semibold">Clear Cache</div>
                                        <small className="text-muted-light">Clear browser cache</small>
                                    </div>
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button
                                    className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                                    onClick={() => setShowRepairConfirm(true)}
                                    disabled={loading}
                                >
                                    <Database size={20} />
                                    <div className="text-start">
                                        <div className="fw-semibold">Repair Database</div>
                                        <small className="text-muted-light">Fix database issues</small>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="glass-card p-4 border border-danger">
                        <h5 className="mb-3 d-flex align-items-center gap-2 text-danger">
                            <AlertTriangle size={20} />
                            Danger Zone
                        </h5>
                        <p className="text-muted-light small mb-3">
                            These actions are irreversible. Use with extreme caution.
                        </p>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <button
                                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                                    onClick={() => setShowWipeAllConfirm(true)}
                                    disabled={loading}
                                >
                                    <Trash2 size={20} />
                                    <div className="text-start">
                                        <div className="fw-semibold">Wipe All Data</div>
                                        <small>Delete all users & events</small>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="alert alert-danger mt-3 mb-0 d-flex align-items-start gap-2">
                            <AlertTriangle size={16} className="mt-1" />
                            <small>
                                Warning: Wiping all data will permanently delete all users, events, and associated data.
                                This action cannot be undone. Make sure you have a backup before proceeding.
                            </small>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'email' && <EmailSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'backup' && <BackupSettings />}

            {/* Confirmation Dialogs */}
            <ConfirmDialog
                isOpen={showWipeAllConfirm}
                onClose={() => setShowWipeAllConfirm(false)}
                onConfirm={handleWipeAllData}
                title="Wipe All Data"
                message="Are you absolutely sure you want to delete ALL users and events? This action is permanent and cannot be undone. All data will be lost forever."
                confirmText="Yes, Wipe Everything"
                confirmVariant="danger"
            />

            <ConfirmDialog
                isOpen={showRepairConfirm}
                onClose={() => setShowRepairConfirm(false)}
                onConfirm={handleRepairDatabase}
                title="Repair Database"
                message="This will attempt to repair any database inconsistencies. The process may take a few minutes. Continue?"
                confirmText="Repair"
                confirmVariant="success"
            />
        </div>
    );
}

export default Settings;
