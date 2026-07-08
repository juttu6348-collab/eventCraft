function LoadingDashboard() {
    return (
        <div className="flex-grow-1 py-5">
            <div className="container">
                {/* Header Skeleton */}
                <div className="mb-4">
                    <div className="skeleton skeleton-text" style={{ width: '200px', height: '40px' }}></div>
                    <div className="skeleton skeleton-text mt-2" style={{ width: '300px', height: '20px' }}></div>
                </div>

                {/* Analytics Cards Skeleton */}
                <div className="row g-3 mb-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="col-12 col-md-4">
                            <div className="glass-card p-4">
                                <div className="skeleton skeleton-circle mb-3" style={{ width: '48px', height: '48px' }}></div>
                                <div className="skeleton skeleton-text mb-2" style={{ width: '80px', height: '32px' }}></div>
                                <div className="skeleton skeleton-text" style={{ width: '120px', height: '16px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search/Filter Bar Skeleton */}
                <div className="glass-card p-3 mb-4">
                    <div className="row g-3">
                        <div className="col-12 col-md-5">
                            <div className="skeleton skeleton-input"></div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="skeleton skeleton-input"></div>
                        </div>
                        <div className="col-12 col-md-2">
                            <div className="skeleton skeleton-input"></div>
                        </div>
                    </div>
                </div>

                {/* Events Grid Skeleton */}
                <div className="row g-3">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="col-12 col-md-6 col-lg-4">
                            <div className="glass-card p-3">
                                <div className="skeleton skeleton-circle mb-3" style={{ width: '56px', height: '56px' }}></div>
                                <div className="skeleton skeleton-text mb-2" style={{ width: '70%', height: '24px' }}></div>
                                <div className="skeleton skeleton-text mb-3" style={{ width: '40%', height: '16px' }}></div>
                                <div className="d-flex justify-content-between">
                                    <div className="skeleton skeleton-text" style={{ width: '30%', height: '14px' }}></div>
                                    <div className="skeleton skeleton-text" style={{ width: '30%', height: '14px' }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoadingDashboard;
