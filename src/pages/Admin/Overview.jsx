import { useState, useEffect } from 'react';
import { Users, Calendar, Eye, TrendingUp, Activity, UserPlus, CalendarPlus } from 'lucide-react';
import { getAdminStats, getAllUsers, getAllEvents } from '../../services/adminService';
import StatsCard from '../../components/Admin/StatsCard';
import toast from 'react-hot-toast';

function Overview() {
    const [stats, setStats] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, usersData, eventsData] = await Promise.all([
                getAdminStats(),
                getAllUsers(),
                getAllEvents()
            ]);

            setStats(statsData);
            setRecentUsers(usersData.slice(0, 5));
            setRecentEvents(eventsData.slice(0, 5));
        } catch (error) {
            console.error('Error loading overview:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    return (
        <div>
            {/* Stats Grid */}
            <div className="row g-3 mb-4">
                <div className="col-lg-3 col-md-6">
                    <StatsCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        icon={Users}
                        trend="up"
                        trendValue="+12%"
                        color="info"
                        subtitle={`${stats?.activeUsers || 0} active`}
                    />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard
                        title="Total Events"
                        value={stats?.totalEvents || 0}
                        icon={Calendar}
                        trend="up"
                        trendValue="+8%"
                        color="success"
                        subtitle={`${stats?.eventsToday || 0} today`}
                    />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard
                        title="Total Views"
                        value={stats?.totalViews || 0}
                        icon={Eye}
                        trend="up"
                        trendValue="+24%"
                        color="warning"
                    />
                </div>
                <div className="col-lg-3 col-md-6">
                    <StatsCard
                        title="Avg Views/Event"
                        value={stats?.totalEvents ? Math.round(stats.totalViews / stats.totalEvents) : 0}
                        icon={TrendingUp}
                        trend="up"
                        trendValue="+5%"
                        color="danger"
                    />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="glass-card p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0 d-flex align-items-center gap-2">
                                <UserPlus size={20} className="text-info" />
                                Recent Users
                            </h5>
                            <a href="/admin/users" className="btn btn-sm btn-outline-info">View All</a>
                        </div>
                        <div className="list-group list-group-flush">
                            {recentUsers.map(user => (
                                <div key={user.id} className="list-group-item bg-transparent border-secondary py-2 px-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-semibold">{user.displayName || 'N/A'}</div>
                                            <small className="text-muted-light">{user.email}</small>
                                        </div>
                                        <span className="badge bg-info">{user.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="glass-card p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0 d-flex align-items-center gap-2">
                                <CalendarPlus size={20} className="text-success" />
                                Recent Events
                            </h5>
                            <a href="/admin/events" className="btn btn-sm btn-outline-success">View All</a>
                        </div>
                        <div className="list-group list-group-flush">
                            {recentEvents.map(event => (
                                <div key={event.id} className="list-group-item bg-transparent border-secondary py-2 px-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-semibold">{event.receiverName}</div>
                                            <small className="text-muted-light">{event.eventType}</small>
                                        </div>
                                        <span className="badge bg-secondary">{event.views || 0} views</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
