import { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { getActivityLogs } from '../../services/activityService';
import toast from 'react-hot-toast';

function ActivityLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await getActivityLogs(100);
            setLogs(data);
        } catch (error) {
            toast.error('Failed to load activity logs');
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = filter === 'all'
        ? logs
        : logs.filter(log => log.action.startsWith(filter));

    const getActionIcon = (action) => {
        if (action.includes('user')) return '👤';
        if (action.includes('event')) return '📅';
        if (action.includes('settings')) return '⚙️';
        if (action.includes('delete')) return '🗑️';
        return '📝';
    };

    const getActionColor = (action) => {
        if (action.includes('created')) return 'success';
        if (action.includes('deleted')) return 'danger';
        if (action.includes('updated')) return 'info';
        if (action.includes('suspended')) return 'warning';
        return 'secondary';
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">
                        <Activity size={28} className="text-info me-2" />
                        Activity Logs
                    </h2>
                    <p className="text-muted-light mb-0">Track all administrative actions</p>
                </div>
                <button className="btn btn-outline-info" onClick={loadLogs}>
                    <RefreshCw size={16} className="me-2" />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card p-3 mb-4">
                <div className="row g-2">
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Activities</option>
                            <option value="user">User Activities</option>
                            <option value="event">Event Activities</option>
                            <option value="settings">Settings Changes</option>
                            <option value="system">System Actions</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass-card p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Performed By</th>
                                <th>Details</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map(log => (
                                <tr key={log.id}>
                                    <td>
                                        <span className="me-2">{getActionIcon(log.action)}</span>
                                        <span className={`badge bg-${getActionColor(log.action)}`}>
                                            {log.action.replace(/_/g, ' ').toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="fw-semibold">{log.performedByEmail || 'System'}</div>
                                            <small className="text-muted-light">{log.performedBy}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <small className="text-muted-light">
                                            {JSON.stringify(log.details).slice(0, 100)}
                                        </small>
                                    </td>
                                    <td>
                                        <small>
                                            {log.timestamp?.toDate?.().toLocaleString() || 'N/A'}
                                        </small>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="text-center py-5">
                        <Activity size={48} className="text-muted mb-3" />
                        <p className="text-muted-light">No activity logs found</p>
                    </div>
                )}

                <div className="mt-3">
                    <small className="text-muted-light">
                        Showing {filteredLogs.length} of {logs.length} logs
                    </small>
                </div>
            </div>
        </div>
    );
}

export default ActivityLogs;
