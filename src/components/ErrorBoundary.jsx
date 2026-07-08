import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
                    <div className="glass-card p-5 text-center" style={{ maxWidth: '500px' }}>
                        <div className="mb-4">
                            <AlertTriangle size={64} className="text-warning" />
                        </div>
                        <h2 className="mb-3">Something went wrong</h2>
                        <p className="text-muted-light mb-4">
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <div className="d-flex gap-2 justify-content-center">
                            <button
                                className="btn btn-gradient"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => this.setState({ hasError: false, error: null })}
                            >
                                Try Again
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-4 p-3 bg-danger bg-opacity-10 border border-danger rounded text-start">
                                <small className="text-danger font-monospace">
                                    {this.state.error.toString()}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
