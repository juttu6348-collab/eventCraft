import { useNavigate } from 'react-router-dom';
import { Cake, Heart, Trophy, Baby, GraduationCap, Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FloatingParticles from '../components/UI/FloatingParticles';

function Events() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const eventTypes = [
        { id: 'birthday', name: 'Birthday', emoji: '🎂', icon: Cake, color: '#ec4899', category: 'Personal' },
        { id: 'anniversary', name: 'Anniversary', emoji: '💕', icon: Heart, color: '#e91e63', category: 'Personal' },
        { id: 'wedding', name: 'Wedding', emoji: '💒', icon: Heart, color: '#f43f5e', category: 'Personal' },
        { id: 'engagement', name: 'Engagement', emoji: '💍', icon: Heart, color: '#f472b6', category: 'Personal' },
        { id: 'baby', name: 'New Baby', emoji: '👶', icon: Baby, color: '#06b6d4', category: 'Personal' },
        { id: 'graduation', name: 'Graduation', emoji: '🎓', icon: GraduationCap, color: '#8b5cf6', category: 'Achievement' },
        { id: 'success', name: 'Success', emoji: '🏆', icon: Trophy, color: '#f59e0b', category: 'Achievement' },
        { id: 'promotion', name: 'Promotion', emoji: '📈', icon: Trophy, color: '#10b981', category: 'Achievement' },
        { id: 'farewell', name: 'Farewell', emoji: '👋', icon: Heart, color: '#6366f1', category: 'Social' },
        { id: 'retirement', name: 'Retirement', emoji: '🌟', icon: Trophy, color: '#a855f7', category: 'Achievement' },
        { id: 'thankyou', name: 'Thank You', emoji: '💐', icon: Heart, color: '#ec4899', category: 'Gratitude' },
        { id: 'housewarming', name: 'Housewarming', emoji: '🏠', icon: Heart, color: '#14b8a6', category: 'Social' },
        { id: 'getwell', name: 'Get Well Soon', emoji: '💪', icon: Heart, color: '#ef4444', category: 'Support' },
        { id: 'apology', name: 'Apology', emoji: '🙏', icon: Heart, color: '#f97316', category: 'Gratitude' },
        { id: 'mothersday', name: "Mother's Day", emoji: '💝', icon: Heart, color: '#db2777', category: 'Special Days' },
        { id: 'fathersday', name: "Father's Day", emoji: '👔', icon: Heart, color: '#3b82f6', category: 'Special Days' },
        { id: 'valentine', name: "Valentine's Day", emoji: '💘', icon: Heart, color: '#f43f5e', category: 'Special Days' },
        { id: 'christmas', name: 'Christmas', emoji: '🎄', icon: Heart, color: '#22c55e', category: 'Special Days' },
        { id: 'newyear', name: 'New Year', emoji: '🎊', icon: Heart, color: '#facc15', category: 'Special Days' },
        { id: 'religious', name: 'Religious Day', emoji: '🕯️', icon: Heart, color: '#a855f7', category: 'Special Days' }
    ];

    const filteredEvents = eventTypes.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = ['All', 'Personal', 'Achievement', 'Social', 'Gratitude', 'Support', 'Special Days'];
    const [selectedCategory, setSelectedCategory] = useState('All');

    const displayedEvents = selectedCategory === 'All'
        ? filteredEvents
        : filteredEvents.filter(e => e.category === selectedCategory);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <FloatingParticles />

            <main className="flex-grow-1">
                {/* Hero Section */}
                <section className="py-5 bg-gradient-hero mt-nav">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="display-4 fw-bold mb-4 fade-in-up">
                                    All Event Types
                                </h1>
                                <p className="lead text-muted-light mb-5 fade-in-up delay-1">
                                    Choose from {eventTypes.length} event types to create your perfect microsite
                                </p>

                                {/* Search Bar */}
                                <div className="glass-card p-4 mb-4 fade-in-up delay-2">
                                    <div className="position-relative">
                                        <div className="position-absolute top-50 start-0 translate-middle-y ps-4 events-search-icon-wrapper">
                                            <Search size={20} className="text-muted-light" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-dark ps-5 py-3 input-lg-text events-search-input"
                                            placeholder="Search events (e.g., Birthday, Wedding)..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Event Categories */}
                                <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`btn rounded-pill px-4 py-2 ${selectedCategory === category ? 'btn-gradient shadow-lg' : 'btn-glass'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Events Grid */}
                <section className="py-5">
                    <div className="container">
                        <div className="row g-3 g-md-4">
                            {displayedEvents.map((event, index) => (
                                <div key={event.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <div
                                        onClick={() => navigate(`/create/${event.id}`)}
                                        className="event-card-wrapper"
                                    >
                                        <div
                                            className={`event-card-glass hover-tilt fade-in-up delay-${(index % 6) + 1}`}
                                            style={{
                                                '--event-color': event.color,
                                                '--event-shadow': `${event.color}40`
                                            }}
                                        >
                                            <div className="mb-2 mb-md-3 emoji-lg">
                                                {event.emoji}
                                            </div>
                                            <h6 className="mb-2 fw-semibold events-card-name">
                                                {event.name}
                                            </h6>
                                            <small className="event-category-badge" style={{
                                                '--category-bg': `${event.color}20`,
                                                '--category-border': `${event.color}40`,
                                                '--category-color': event.color,
                                            }}>
                                                {event.category}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayedEvents.length === 0 && (
                            <div className="text-center py-5">
                                <p className="text-muted-light">No events found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Events;
