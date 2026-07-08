function SkeletonLoader({ type = 'card', count = 1 }) {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="glass-card p-4">
                        <div className="skeleton skeleton-title mb-3"></div>
                        <div className="skeleton skeleton-text mb-2"></div>
                        <div className="skeleton skeleton-text mb-2" style={{ width: '80%' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                    </div>
                );

            case 'table':
                return (
                    <div className="glass-card p-3">
                        <div className="table-responsive">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="d-flex gap-3 mb-3">
                                    <div className="skeleton skeleton-avatar"></div>
                                    <div className="flex-grow-1">
                                        <div className="skeleton skeleton-text mb-2"></div>
                                        <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'stats':
                return (
                    <div className="glass-card p-3 h-100">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="skeleton skeleton-circle"></div>
                            <div className="skeleton skeleton-icon"></div>
                        </div>
                        <div className="skeleton skeleton-title mb-2"></div>
                        <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
                    </div>
                );

            case 'list':
                return (
                    <div className="glass-card p-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="mb-3 pb-3 border-bottom border-secondary">
                                <div className="skeleton skeleton-text mb-2"></div>
                                <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                            </div>
                        ))}
                    </div>
                );

            default:
                return (
                    <div className="skeleton skeleton-text"></div>
                );
        }
    };

    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div key={i} className={count > 1 ? 'mb-3' : ''}>
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
}

export default SkeletonLoader;
