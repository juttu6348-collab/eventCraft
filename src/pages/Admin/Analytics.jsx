import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, subDays, isWithinInterval } from 'date-fns';
import { Calendar, Download, TrendingUp, Users, Eye } from 'lucide-react';
import { getAllUsers, getAllEvents } from '../../services/adminService';
import toast from 'react-hot-toast';

function Analytics() {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState(30); // Last 30 days

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [usersData, eventsData] = await Promise.all([
                getAllUsers(),
                getAllEvents()
            ]);
            setUsers(usersData);
            setEvents(eventsData);
        } catch (error) {
            toast.error('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    // Process user growth data
    const getUserGrowthData = () => {
        const days = [];
        for (let i = dateRange - 1; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateStr = format(date, 'MMM dd');

            const userCount = users.filter(user => {
                if (!user.createdAt) return false;
                const userDate = user.createdAt.toDate();
                return format(userDate, 'MMM dd yyyy') === format(date, 'MMM dd yyyy');
            }).length;

            days.push({ date: dateStr, users: userCount });
        }
        return days;
    };

    // Process event creation trends
    const getEventTrendsData = () => {
        const days = [];
        for (let i = dateRange - 1; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateStr = format(date, 'MMM dd');

            const eventCount = events.filter(event => {
                if (!event.createdAt) return false;
                const eventDate = event.createdAt.toDate();
                return format(eventDate, 'MMM dd yyyy') === format(date, 'MMM dd yyyy');
            }).length;

            days.push({ date: dateStr, events: eventCount });
        }
        return days;
    };

    // Process views data
    const getViewsData = () => {
        const days = [];
        for (let i = dateRange - 1; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateStr = format(date, 'MMM dd');

            // Sum all views for events created on this day
            const totalViews = events
                .filter(event => {
                    if (!event.createdAt) return false;
                    const eventDate = event.createdAt.toDate();
                    return format(eventDate, 'MMM dd yyyy') === format(date, 'MMM dd yyyy');
                })
                .reduce((sum, event) => sum + (event.views || 0), 0);

            days.push({ date: dateStr, views: totalViews });
        }
        return days;
    };

    // Get events by type distribution
    const getEventsByType = () => {
        const typeCount = {};
        events.forEach(event => {
            typeCount[event.eventType] = (typeCount[event.eventType] || 0) + 1;
        });

        return Object.entries(typeCount).map(([type, count]) => ({
            name: type,
            value: count
        }));
    };

    // Get top events by views
    const getTopEvents = () => {
        return [...events]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 10);
    };

    const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

    const exportToCSV = () => {
        const data = [
            ['Metric', 'Value'],
            ['Total Users', users.length],
            ['Total Events', events.length],
            ['Total Views', events.reduce((sum, e) => sum + (e.views || 0), 0)],
            ['Date Range', `Last ${dateRange} days`]
        ];

        const csv = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${new Date().toISOString()}.csv`;
        a.click();
        toast.success('Analytics exported to CSV');
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    const userGrowthData = getUserGrowthData();
    const eventTrendsData = getEventTrendsData();
    const viewsData = getViewsData();
    const eventsByType = getEventsByType();
    const topEvents = getTopEvents();

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Analytics & Reports</h2>
                    <p className="text-muted-light mb-0">Insights and trends across your platform</p>
                </div>
                <div className="d-flex gap-2">
                    <select
                        className="form-select"
                        value={dateRange}
                        onChange={(e) => setDateRange(Number(e.target.value))}
                        style={{ width: 'auto' }}
                    >
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                    </select>
                    <button className="btn btn-outline-success" onClick={exportToCSV}>
                        <Download size={16} className="me-1" />
                        Export
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="glass-card p-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="stats-icon bg-info-subtle">
                                <Users size={24} className="text-info" />
                            </div>
                            <div>
                                <div className="text-muted-light small">Total Users</div>
                                <h3 className="mb-0">{users.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="glass-card p-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="stats-icon bg-success-subtle">
                                <Calendar size={24} className="text-success" />
                            </div>
                            <div>
                                <div className="text-muted-light small">Total Events</div>
                                <h3 className="mb-0">{events.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="glass-card p-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="stats-icon bg-warning-subtle">
                                <Eye size={24} className="text-warning" />
                            </div>
                            <div>
                                <div className="text-muted-light small">Total Views</div>
                                <h3 className="mb-0">{events.reduce((sum, e) => sum + (e.views || 0), 0)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="row g-3 mb-4">
                {/* User Growth Chart */}
                <div className="col-lg-6">
                    <div className="glass-card p-4">
                        <h5 className="mb-4 d-flex align-items-center gap-2">
                            <TrendingUp size={20} className="text-info" />
                            User Growth
                        </h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line type="monotone" dataKey="users" stroke="#667eea" strokeWidth={3} dot={{ fill: '#667eea', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Event Creation Trends */}
                <div className="col-lg-6">
                    <div className="glass-card p-4">
                        <h5 className="mb-4 d-flex align-items-center gap-2">
                            <Calendar size={20} className="text-success" />
                            Event Creation Trends
                        </h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={eventTrendsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="events" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Views Analytics */}
                <div className="col-lg-8">
                    <div className="glass-card p-4">
                        <h5 className="mb-4 d-flex align-items-center gap-2">
                            <Eye size={20} className="text-warning" />
                            Views Over Time
                        </h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={viewsData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#f59e0b" fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Events by Type */}
                <div className="col-lg-4">
                    <div className="glass-card p-4">
                        <h5 className="mb-4">Events by Type</h5>
                        {eventsByType.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={eventsByType}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {eventsByType.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center text-muted-light py-5">
                                No event data available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Events Table */}
            <div className="glass-card p-4">
                <h5 className="mb-4">Top Events by Views</h5>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Event Name</th>
                                <th>Type</th>
                                <th>Creator</th>
                                <th>Created</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topEvents.map((event, index) => (
                                <tr key={event.id}>
                                    <td>
                                        <span className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'}`}>
                                            #{index + 1}
                                        </span>
                                    </td>
                                    <td className="fw-semibold">{event.receiverName}</td>
                                    <td><span className="badge bg-info">{event.eventType}</span></td>
                                    <td>{event.senderName || 'N/A'}</td>
                                    <td>{event.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                                    <td className="fw-bold text-warning">{event.views || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {topEvents.length === 0 && (
                    <div className="text-center text-muted-light py-4">
                        No events to display
                    </div>
                )}
            </div>
        </div>
    );
}

export default Analytics;

