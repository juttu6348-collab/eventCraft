import PropTypes from 'prop-types';
import { Eye, FileText, TrendingUp } from 'lucide-react';

function AnalyticsCards({ analytics }) {
    const cards = [
        {
            icon: FileText,
            label: 'Total Events',
            value: analytics.totalEvents,
            color: '#e91e63',
            gradient: 'linear-gradient(135deg, #e91e63, #9c27b0)'
        },
        {
            icon: Eye,
            label: 'Total Views',
            value: analytics.totalViews.toLocaleString(),
            color: '#2196f3',
            gradient: 'linear-gradient(135deg, #2196f3, #00bcd4)'
        },
        {
            icon: TrendingUp,
            label: 'Most Viewed',
            value: analytics.mostViewedEvent ? analytics.mostViewedEvent.receiverName : 'N/A',
            subValue: analytics.mostViewedEvent ? `${analytics.mostViewedEvent.views} views` : '',
            color: '#4caf50',
            gradient: 'linear-gradient(135deg, #4caf50, #8bc34a)'
        }
    ];

    return (
        <div className="row g-3 mb-4">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="col-12 col-sm-6 col-lg-3">
                        <div className="glass-card p-4 hover-lift analytics-card">
                            <div className="d-flex align-items-start justify-content-between mb-3">
                                <div
                                    className="analytics-icon"
                                    style={{ '--icon-bg': card.gradient }}
                                >
                                    <Icon size={24} color="white" />
                                </div>
                            </div>
                            <h3 className="h2 fw-bold mb-1 analytics-value">{card.value}</h3>
                            <p className="text-muted-light mb-0 small">{card.label}</p>
                            {card.subValue && (
                                <p className="text-info small mb-0 mt-1">{card.subValue}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

AnalyticsCards.propTypes = {
    analytics: PropTypes.shape({
        totalEvents: PropTypes.number.isRequired,
        totalViews: PropTypes.number.isRequired,
        mostViewedEvent: PropTypes.object
    }).isRequired
};

export default AnalyticsCards;

