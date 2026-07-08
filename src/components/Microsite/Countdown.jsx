import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Countdown({ targetDate, eventName }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        if (!targetDate) return null;

        const difference = new Date(targetDate) - new Date();

        if (difference <= 0) {
            return { expired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false
        };
    }

    useEffect(() => {
        if (!targetDate) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate]);

    if (!targetDate || !timeLeft) {
        return null;
    }

    if (timeLeft.expired) {
        return (
            <div className="countdown-container text-center my-5">
                <div className="countdown-expired">
                    <div className="countdown-emoji mb-3">🎉</div>
                    <h3 className="countdown-expired-title">The Event Has Started!</h3>
                    <p className="text-muted-light">Hope you're having a wonderful time!</p>
                </div>
            </div>
        );
    }

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    return (
        <div className="countdown-container my-5">
            <div className="text-center mb-4">
                <h3 className="countdown-title">
                    Time Until {eventName || 'Event'}
                </h3>
            </div>

            <div className="countdown-grid">
                {timeBlocks.map((block, index) => (
                    <div key={block.label} className="countdown-block" style={{ '--delay': `${index * 0.1}s` }}>
                        <div className="countdown-value">
                            {String(block.value).padStart(2, '0')}
                        </div>
                        <div className="countdown-label">
                            {block.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Countdown.propTypes = {
    targetDate: PropTypes.string,
    eventName: PropTypes.string
};

export default Countdown;
