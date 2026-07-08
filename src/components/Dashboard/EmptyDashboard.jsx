import { Link } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';

function EmptyDashboard() {
    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
            <div className="text-center" style={{ maxWidth: '500px' }}>
                <div className="mb-4">
                    <Sparkles size={64} className="text-info pulse" />
                </div>
                <h2 className="h3 fw-bold mb-3">No Events Yet</h2>
                <p className="text-muted-light mb-4">
                    You haven't created any events yet. Start by creating your first beautiful microsite!
                </p>
                <Link
                    to="/create"
                    className="btn btn-gradient btn-lg px-5 d-inline-flex align-items-center gap-2 hover-glow"
                >
                    <Plus size={20} />
                    Create Your First Event
                </Link>
            </div>
        </div>
    );
}

export default EmptyDashboard;
