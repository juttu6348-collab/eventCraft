import { useState, useEffect, useRef } from 'react';
import { Search, X, Users, Calendar, Settings, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import toast from 'react-hot-toast';

function GlobalSearch({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({
        users: [],
        events: [],
        pages: []
    });
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            loadRecentSearches();
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchTerm.length > 2) {
            performSearch();
        } else {
            setResults({ users: [], events: [], pages: [] });
        }
    }, [searchTerm]);

    const loadRecentSearches = () => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    };

    const saveToRecentSearches = (term) => {
        const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const performSearch = async () => {
        setLoading(true);
        try {
            const lowerSearch = searchTerm.toLowerCase();

            // Search users
            const usersSnap = await getDocs(query(collection(db, 'users'), limit(20)));
            const usersResults = usersSnap.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user =>
                    user.email?.toLowerCase().includes(lowerSearch) ||
                    user.displayName?.toLowerCase().includes(lowerSearch)
                )
                .slice(0, 5);

            // Search events
            const eventsSnap = await getDocs(query(collection(db, 'events'), limit(50)));
            const eventsResults = eventsSnap.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(event =>
                    event.receiverName?.toLowerCase().includes(lowerSearch) ||
                    event.senderName?.toLowerCase().includes(lowerSearch) ||
                    event.eventType?.toLowerCase().includes(lowerSearch)
                )
                .slice(0, 5);

            // Search pages/sections
            const pagesResults = [
                { name: 'Users Management', path: '/admin/users', icon: Users },
                { name: 'Events Management', path: '/admin/events', icon: Calendar },
                { name: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
                { name: 'Settings', path: '/admin/settings', icon: Settings }
            ].filter(page => page.name.toLowerCase().includes(lowerSearch));

            setResults({
                users: usersResults,
                events: eventsResults,
                pages: pagesResults
            });

            saveToRecentSearches(searchTerm);
        } catch (error) {
            console.error('Search error:', error);
            toast.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResultClick = (type, item) => {
        if (type === 'user') {
            navigate('/admin/users');
        } else if (type === 'event') {
            navigate('/admin/events');
        } else if (type === 'page') {
            navigate(item.path);
        }
        onClose();
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    if (!isOpen) return null;

    const hasResults = results.users.length > 0 || results.events.length > 0 || results.pages.length > 0;

    return (
        <>
            <div className="search-overlay" onClick={onClose}></div>
            <div className="global-search-modal">
                <div className="search-header">
                    <Search size={20} className="text-muted" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="Search users, events, pages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {loading && <div className="spinner-border spinner-border-sm text-info"></div>}
                    <button className="btn-icon" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="search-results">
                    {searchTerm.length === 0 && recentSearches.length > 0 && (
                        <div className="search-section">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="text-muted-light small mb-0">Recent Searches</h6>
                                <button className="btn btn-sm btn-ghost" onClick={clearRecentSearches}>
                                    Clear
                                </button>
                            </div>
                            {recentSearches.map((term, idx) => (
                                <button
                                    key={idx}
                                    className="search-result-item"
                                    onClick={() => setSearchTerm(term)}
                                >
                                    <Search size={16} className="text-muted" />
                                    <span>{term}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {searchTerm.length > 0 && !hasResults && !loading && (
                        <div className="text-center py-5 text-muted-light">
                            <Search size={48} className="mb-3 opacity-50" />
                            <p>No results found for "{searchTerm}"</p>
                        </div>
                    )}

                    {results.pages.length > 0 && (
                        <div className="search-section">
                            <h6 className="text-muted-light small mb-2">Pages</h6>
                            {results.pages.map((page, idx) => {
                                const Icon = page.icon;
                                return (
                                    <button
                                        key={idx}
                                        className="search-result-item"
                                        onClick={() => handleResultClick('page', page)}
                                    >
                                        <Icon size={16} className="text-info" />
                                        <span>{page.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {results.users.length > 0 && (
                        <div className="search-section">
                            <h6 className="text-muted-light small mb-2">Users</h6>
                            {results.users.map(user => (
                                <button
                                    key={user.id}
                                    className="search-result-item"
                                    onClick={() => handleResultClick('user', user)}
                                >
                                    <Users size={16} className="text-success" />
                                    <div>
                                        <div>{user.displayName || user.email}</div>
                                        <small className="text-muted-light">{user.email}</small>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {results.events.length > 0 && (
                        <div className="search-section">
                            <h6 className="text-muted-light small mb-2">Events</h6>
                            {results.events.map(event => (
                                <button
                                    key={event.id}
                                    className="search-result-item"
                                    onClick={() => handleResultClick('event', event)}
                                >
                                    <Calendar size={16} className="text-warning" />
                                    <div>
                                        <div>{event.receiverName}</div>
                                        <small className="text-muted-light text-capitalize">{event.eventType}</small>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="search-footer">
                    <small className="text-muted-light">
                        <kbd>↑</kbd> <kbd>↓</kbd> to navigate • <kbd>Enter</kbd> to select • <kbd>Esc</kbd> to close
                    </small>
                </div>
            </div>
        </>
    );
}

export default GlobalSearch;
