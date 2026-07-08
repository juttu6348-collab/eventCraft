import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function StatsCard({ title, value, icon: Icon, trend, trendValue, color = 'info', subtitle }) {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp size={16} className="text-success" />;
        if (trend === 'down') return <TrendingDown size={16} className="text-danger" />;
        return <Minus size={16} className="text-muted" />;
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'text-success';
        if (trend === 'down') return 'text-danger';
        return 'text-muted';
    };

    return (
        <div className="glass-card p-4 h-100 stats-card">
            <div className="d-flex align-items-start justify-content-between mb-3">
                <div>
                    <p className="text-muted-light small mb-1">{title}</p>
                    <h2 className="mb-0 fw-bold">{value}</h2>
                    {subtitle && <small className="text-muted-light">{subtitle}</small>}
                </div>
                <div className={`stats-icon bg-${color}-subtle`}>
                    <Icon size={24} className={`text-${color}`} />
                </div>
            </div>

            {trendValue && (
                <div className="d-flex align-items-center gap-1">
                    {getTrendIcon()}
                    <span className={`small fw-semibold ${getTrendColor()}`}>
                        {trendValue}
                    </span>
                    <span className="small text-muted-light">vs last month</span>
                </div>
            )}
        </div>
    );
}

export default StatsCard;
