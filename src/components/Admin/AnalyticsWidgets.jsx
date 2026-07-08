import { useState, useEffect } from 'react';
import { Users, TrendingUp, Eye, Activity } from 'lucide-react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../../services/firebase';

function AnalyticsWidgets() {
    const [stats, setStats] = useState({
        onlineUsers: 0,
        todayUsers: 0,
        todayEvents: 0,
        todayViews: 0
    });

    useEffect(() => {
        loadStats();
        const interval = setInterval(loadStats, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const loadStats = async () => {
        try {
            const now = new Date();
            const todayStart = new Date(now.setHours(0, 0, 0, 0));
            const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);

            // Online users (active in last 5 minutes)
            const usersSnap = await getDocs(collection(db, 'users'));
            const onlineUsers = usersSnap.docs.filter(doc => {
                const lastActive = doc.data().lastActive?.toDate();
                return lastActive && lastActive >= fiveMinsAgo;
            }).length;

            // Today's registrations
            const todayUsersQuery = query(
                collection(db, 'users'),
                where('createdAt', '>=', Timestamp.fromDate(todayStart))
            );
            const todayUsersSnap = await getDocs(todayUsersQuery);

            // Today's events
            const todayEventsQuery = query(
                collection(db, 'events'),
                where('createdAt', '>=', Timestamp.fromDate(todayStart))
            );
            const todayEventsSnap = await getDocs(todayEventsQuery);

            // Calculate today's views (simplified)
            const eventsSnap = await getDocs(collection(db, 'events'));
            const todayViews = eventsSnap.docs.reduce((sum, doc) => sum + (doc.data().views || 0), 0);

            setStats({
                onlineUsers,
                todayUsers: todayUsersSnap.size,
                todayEvents: todayEventsSnap.size,
                todayViews
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    return (
        <div className="row g-3 mb-4">
            {/* Real-time Users */}
            <div className="col-md-3 col-sm-6">
                <div className="glass-card p-3 h-100 position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-2">
                        <Activity size={40} className="text-success opacity-10" />
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="pulse-dot"></div>
                        <small className="text-muted-light">Online Now</small>
                    </div>
                    <h3 className="mb-0 text-success">{stats.onlineUsers}</h3>
                    <small className="text-muted-light">Active users</small>
                </div>
            </div>

            {/* Today's Users */}
            <div className="col-md-3 col-sm-6">
                <div className="glass-card p-3 h-100 position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-2">
                        <Users size={40} className="text-info opacity-10" />
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <Users size={16} className="text-info" />
                        <small className="text-muted-light">New Today</small>
                    </div>
                    <h3 className="mb-0 text-info">{stats.todayUsers}</h3>
                    <small className="text-muted-light">Registrations</small>
                </div>
            </div>

            {/* Today's Events */}
            <div className="col-md-3 col-sm-6">
                <div className="glass-card p-3 h-100 position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-2">
                        <TrendingUp size={40} className="text-warning opacity-10" />
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-warning" />
                        <small className="text-muted-light">Created Today</small>
                    </div>
                    <h3 className="mb-0 text-warning">{stats.todayEvents}</h3>
                    <small className="text-muted-light">New events</small>
                </div>
            </div>

            {/* Total Views */}
            <div className="col-md-3 col-sm-6">
                <div className="glass-card p-3 h-100 position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 p-2">
                        <Eye size={40} className="text-purple opacity-10" />
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <Eye size={16} className="text-purple" />
                        <small className="text-muted-light">Total Views</small>
                    </div>
                    <h3 className="mb-0 text-purple">{stats.todayViews}</h3>
                    <small className="text-muted-light">All time</small>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsWidgets;
