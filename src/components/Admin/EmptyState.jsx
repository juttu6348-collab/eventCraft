import { Calendar, Inbox } from 'lucide-react';

function EmptyState({ icon: Icon, title, message, action }) {
    return (
        <div className="empty-state-container">
            <div className="empty-state-content">
                <div className="empty-state-icon">
                    <Icon size={64} strokeWidth={1.5} />
                </div>
                <h3 className="empty-state-title">{title}</h3>
                <p className="empty-state-message">{message}</p>
                {action && (
                    <div className="empty-state-action">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmptyState;
