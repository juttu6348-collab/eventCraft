import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, Share2, Calendar, Download } from 'lucide-react';
import { getEventAnalytics } from '../../services/eventService';
import toast from 'react-hot-toast';

function EventAnalyticsModal({ eventId, eventName, isOpen, onClose }) {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7days');

    useEffect(() => {
        if (isOpen && eventId) {
            loadAnalytics();
        }
    }, [isOpen, eventId, timeRange]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const data = await getEventAnalytics(eventId);
            setAnalytics(data);
        } catch (error) {
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const mockViewsData = [
        { date: '12/15', views: 12 },
        { date: '12/16', views: 19 },
        { date: '12/17', views: 15 },
        { date: '12/18', views: 25 },
        { date: '12/19', views: 22 },
        { date: '12/20', views: 30 },
        { date: '12/21', views: 28 }
    ];

    const exportAnalytics = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            "Date,Views\n" +
            mockViewsData.map(row => `${row.date},${row.views}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${eventName}-analytics.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Analytics exported');
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content glass-card">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title">
                                <TrendingUp size={20} className="me-2" />
                                Analytics: {eventName}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-info" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Time Range Selector */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="btn-group">
                                            <button
                                                className={`btn btn-sm ${timeRange === '7days' ? 'btn-info' : 'btn-outline-info'}`}
                                                onClick={() => setTimeRange('7days')}
                                            >
                                                7 Days
                                            </button>
                                            <button
                                                className={`btn btn-sm ${timeRange === '30days' ? 'btn-info' : 'btn-outline-info'}`}
                                                onClick={() => setTimeRange('30days')}
                                            >
                                                30 Days
                                            </button>
                                            <button
                                                className={`btn btn-sm ${timeRange === 'all' ? 'btn-info' : 'btn-outline-info'}`}
                                                onClick={() => setTimeRange('all')}
                                            >
                                                All Time
                                            </button>
                                        </div>
                                        <button className="btn btn-sm btn-outline-success" onClick={exportAnalytics}>
                                            <Download size={16} className="me-2" />
                                            Export
                                        </button>
                                    </div>

                                    {/* Stats Cards */}
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <div className="glass-card p-3">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <Eye size={16} className="text-info" />
                                                    <small className="text-muted-light">Total Views</small>
                                                </div>
                                                <h4 className="mb-0">{analytics?.totalViews || 0}</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="glass-card p-3">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <Share2 size={16} className="text-success" />
                                                    <small className="text-muted-light">Total Shares</small>
                                                </div>
                                                <h4 className="mb-0">{analytics?.shares || 0}</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="glass-card p-3">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <Calendar size={16} className="text-warning" />
                                                    <small className="text-muted-light">Created</small>
                                                </div>
                                                <h6 className="mb-0 small">
                                                    {analytics?.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Views Over Time Chart */}
                                    <div className="glass-card p-3 mb-4">
                                        <h6 className="mb-3">Views Over Time</h6>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={mockViewsData}>
                                                <defs>
                                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                <XAxis dataKey="date" stroke="#888" />
                                                <YAxis stroke="#888" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#1a1a1a',
                                                        border: '1px solid #333',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="views"
                                                    stroke="#667eea"
                                                    fillOpacity={1}
                                                    fill="url(#colorViews)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Additional Stats */}
                                    <div className="glass-card p-3">
                                        <h6 className="mb-3">Engagement Metrics</h6>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <small className="text-muted-light d-block mb-1">Avg. Daily Views</small>
                                                <strong>{(mockViewsData.reduce((sum, day) => sum + day.views, 0) / mockViewsData.length).toFixed(1)}</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted-light d-block mb-1">Peak Views</small>
                                                <strong>{Math.max(...mockViewsData.map(d => d.views))}</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted-light d-block mb-1">Growth Rate</small>
                                                <strong className="text-success">+15.2%</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted-light d-block mb-1">Last Updated</small>
                                                <strong>{analytics?.updatedAt?.toDate?.().toLocaleDateString() || 'N/A'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer border-top border-secondary">
                            <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

EventAnalyticsModal.propTypes = {
    eventId: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EventAnalyticsModal;
