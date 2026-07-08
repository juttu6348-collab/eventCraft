import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Grid, List } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AnalyticsCards from '../components/Dashboard/AnalyticsCards';
import SearchBar from '../components/Dashboard/SearchBar';
import FilterBar from '../components/Dashboard/FilterBar';
import ViewToggle from '../components/Dashboard/ViewToggle';
import EventsList from '../components/Dashboard/EventsList';
import EmptyDashboard from '../components/Dashboard/EmptyDashboard';
import LoadingDashboard from '../components/Dashboard/LoadingDashboard';
import { getUserEvents, getEventAnalytics } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';
import '../dashboard-styles.css';

function Dashboard() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [analytics, setAnalytics] = useState(null);

    // Load events on mount
    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const userEvents = await getUserEvents(user.uid);
            const analyticsData = await getEventAnalytics(userEvents);

            setEvents(userEvents);
            setFilteredEvents(userEvents);
            setAnalytics(analyticsData);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters and search
    useEffect(() => {
        let result = [...events];

        // Search filter
        if (searchQuery) {
            result = result.filter(event =>
                event.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.eventType?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (filterType !== 'all') {
            result = result.filter(event => event.eventType === filterType);
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
                break;
            case 'oldest':
                result.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
                break;
            case 'name':
                result.sort((a, b) => a.receiverName?.localeCompare(b.receiverName));
                break;
            case 'views':
                result.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            default:
                break;
        }

        setFilteredEvents(result);
    }, [searchQuery, filterType, sortBy, events]);

    if (loading) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <LoadingDashboard />
                <Footer />
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <EmptyDashboard />
                <Footer />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1 py-5 dashboard-main-wrapper">
                <div className="container">
                    {/* Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                        <div>
                            <h1 className="display-5 fw-bold mb-2">
                                <span className="gradient-text-animated">My Events</span>
                            </h1>
                            <p className="text-muted-light mb-0">
                                Manage all your special microsites
                            </p>
                        </div>
                        <Link
                            to="/create"
                            className="btn btn-gradient px-4 py-2 d-flex align-items-center gap-2 hover-glow"
                        >
                            <Plus size={20} />
                            Create New Event
                        </Link>
                    </div>

                    {/* Analytics Cards */}
                    {analytics && <AnalyticsCards analytics={analytics} />}

                    {/* Search, Filter, and View Controls */}
                    <div className="glass-card p-3 mb-4">
                        <div className="row g-3 align-items-center">
                            <div className="col-12 col-md-5">
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>
                            <div className="col-12 col-md-5">
                                <FilterBar
                                    filterType={filterType}
                                    sortBy={sortBy}
                                    onFilterChange={setFilterType}
                                    onSortChange={setSortBy}
                                />
                            </div>
                            <div className="col-12 col-md-2">
                                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-3">
                        <p className="text-muted-light small">
                            Showing {filteredEvents.length} of {events.length} events
                        </p>
                    </div>

                    {/* Events List */}
                    <EventsList
                        events={filteredEvents}
                        viewMode={viewMode}
                        onEventUpdated={loadEvents}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
