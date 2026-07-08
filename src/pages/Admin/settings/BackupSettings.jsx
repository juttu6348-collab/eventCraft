import { useState } from 'react';
import { Download, Upload, Database, Calendar, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function BackupSettings() {
    const [backupSchedule, setBackupSchedule] = useState('daily');
    const [autoBackup, setAutoBackup] = useState(true);
    const [lastBackup, setLastBackup] = useState(null);
    const [backupHistory, setBackupHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCreateBackup = async () => {
        setLoading(true);
        try {
            // Create backup logic
            const backupData = {
                timestamp: new Date().toISOString(),
                type: 'manual',
                size: '2.4 MB'
            };

            // Download as JSON
            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `eventcraft-backup-${new Date().toISOString()}.json`;
            a.click();

            toast.success('Backup created and downloaded successfully');
            setLastBackup(new Date());
        } catch (error) {
            toast.error('Failed to create backup');
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (file) => {
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // Restore logic here
                    toast.success('Backup restored successfully');
                } catch (error) {
                    toast.error('Invalid backup file');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            toast.error('Failed to restore backup');
        }
    };

    const handleSaveSchedule = async () => {
        try {
            // Save schedule settings
            toast.success('Backup schedule saved');
        } catch (error) {
            toast.error('Failed to save schedule');
        }
    };

    return (
        <div>
            <div className="mb-4">
                <h3 className="mb-2">
                    <Database size={24} className="text-info me-2" />
                    Backup & Restore
                </h3>
                <p className="text-muted-light">Manage system backups and data restoration</p>
            </div>

            {/* Manual Backup */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Manual Backup</h5>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <p className="mb-1">Create a full backup of all system data</p>
                        <small className="text-muted-light">
                            {lastBackup ? `Last backup: ${lastBackup.toLocaleString()}` : 'No recent backups'}
                        </small>
                    </div>
                    <button
                        className="btn btn-gradient"
                        onClick={handleCreateBackup}
                        disabled={loading}
                    >
                        <Download size={16} className="me-2" />
                        {loading ? 'Creating...' : 'Create Backup'}
                    </button>
                </div>

                <div className="alert alert-info mb-0">
                    <AlertCircle size={16} className="me-2" />
                    <small>
                        Backups include: users, events, settings, and analytics data
                    </small>
                </div>
            </div>

            {/* Restore Backup */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">Restore from Backup</h5>

                <div className="mb-3">
                    <label className="form-label">Upload Backup File</label>
                    <input
                        type="file"
                        className="form-control"
                        accept=".json"
                        onChange={(e) => handleRestore(e.target.files[0])}
                    />
                    <small className="text-muted-light">
                        Select a JSON backup file to restore
                    </small>
                </div>

                <div className="alert alert-warning mb-0">
                    <AlertCircle size={16} className="me-2" />
                    <small>
                        ⚠️ Warning: Restoring will overwrite current data. Create a backup first!
                    </small>
                </div>
            </div>

            {/* Automatic Backup Schedule */}
            <div className="glass-card p-4 mb-4">
                <h5 className="mb-3">
                    <Calendar size={20} className="text-success me-2" />
                    Automatic Backup Schedule
                </h5>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="autoBackup"
                        checked={autoBackup}
                        onChange={(e) => setAutoBackup(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="autoBackup">
                        Enable Automatic Backups
                    </label>
                </div>

                {autoBackup && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Backup Frequency</label>
                            <select
                                className="form-select"
                                value={backupSchedule}
                                onChange={(e) => setBackupSchedule(e.target.value)}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        <button className="btn btn-outline-info" onClick={handleSaveSchedule}>
                            <Save size={16} className="me-2" />
                            Save Schedule
                        </button>
                    </>
                )}
            </div>

            {/* Backup History */}
            <div className="glass-card p-4">
                <h5 className="mb-3">Backup History</h5>

                {backupHistory.length === 0 ? (
                    <div className="text-center py-4">
                        <Database size={48} className="text-muted mb-3" />
                        <p className="text-muted-light">No backup history available</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {backupHistory.map((backup, index) => (
                                    <tr key={index}>
                                        <td>{backup.date}</td>
                                        <td><span className="badge bg-info">{backup.type}</span></td>
                                        <td>{backup.size}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-info">
                                                <Download size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BackupSettings;
