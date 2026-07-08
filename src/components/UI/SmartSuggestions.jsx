import PropTypes from 'prop-types';
import { Lightbulb } from 'lucide-react';

function SmartSuggestions({ eventType, relationship }) {
    const getSuggestions = () => {
        // Event type specific suggestions
        const eventSuggestions = {
            birthday: {
                pages: ['letter', 'gallery', 'memories'],
                tip: 'Birthday events work great with a heartfelt letter and photo gallery!',
                messageHint: 'Share your favorite memories and wishes for the year ahead.'
            },
            anniversary: {
                pages: ['letter', 'memories', 'gallery'],
                tip: 'Anniversary events love a timeline of memories together!',
                messageHint: 'Reflect on your journey and the moments that matter most.'
            },
            wedding: {
                pages: ['letter', 'gallery', 'custom'],
                tip: 'Wedding events shine with beautiful photos and a custom "Our Story" page!',
                messageHint: 'Tell your love story and what makes your bond special.'
            },
            engagement: {
                pages: ['letter', 'gallery', 'surprise'],
                tip: 'Engagement celebrations are perfect with a surprise reveal and beautiful photos!',
                messageHint: 'Share how you met, your journey together, and excitement for the future.'
            },
            baby: {
                pages: ['letter', 'gallery', 'custom'],
                tip: 'New baby events are perfect for sharing joy with photos and heartfelt wishes!',
                messageHint: 'Express your excitement and share wishes for the new arrival and family.'
            },
            graduation: {
                pages: ['letter', 'gallery', 'surprise'],
                tip: 'Graduation events are perfect for celebrating achievements with photos and surprises!',
                messageHint: 'Celebrate their hard work and inspire their future journey.'
            },
            success: {
                pages: ['letter', 'gallery', 'surprise'],
                tip: 'Success events celebrate achievements with congratulations and memories!',
                messageHint: 'Acknowledge their hard work and share your pride in their accomplishment.'
            },
            promotion: {
                pages: ['letter', 'gallery', 'memories'],
                tip: 'Promotion celebrations highlight career growth and achievements!',
                messageHint: 'Congratulate their achievement and share confidence in their continued success.'
            },
            farewell: {
                pages: ['letter', 'memories', 'gallery'],
                tip: 'Farewell events should include shared memories and heartfelt messages.',
                messageHint: 'Express gratitude, share memorable moments, and wish them well on their journey.'
            },
            retirement: {
                pages: ['letter', 'memories', 'gallery'],
                tip: 'Retirement celebrations honor years of dedication with memories and gratitude!',
                messageHint: 'Celebrate their career, share favorite moments, and wish them a happy retirement.'
            },
            thankyou: {
                pages: ['letter', 'gallery'],
                tip: 'Thank you messages are heartfelt with a personal letter and meaningful photos!',
                messageHint: 'Express sincere gratitude and share how they made a difference.'
            },
            housewarming: {
                pages: ['letter', 'gallery', 'custom'],
                tip: 'Housewarming celebrations share joy with home photos and warm wishes!',
                messageHint: 'Congratulate on the new home and share wishes for happiness and memories ahead.'
            },
            getwell: {
                pages: ['letter', 'gallery', 'surprise'],
                tip: 'Get well messages bring comfort with encouraging words and cheerful photos!',
                messageHint: 'Send healing wishes, encouragement, and remind them they are thought of.'
            },
            apology: {
                pages: ['letter'],
                tip: 'Sincere apologies are best expressed through a heartfelt, personal letter.',
                messageHint: 'Express genuine remorse, take responsibility, and share how you will make amends.'
            },
            mothersday: {
                pages: ['letter', 'gallery', 'memories'],
                tip: "Mother's Day celebrations honor moms with heartfelt messages and cherished photos!",
                messageHint: 'Express gratitude for her love, sacrifices, and all the special moments together.'
            },
            fathersday: {
                pages: ['letter', 'gallery', 'memories'],
                tip: "Father's Day events celebrate dads with appreciation and memorable photos!",
                messageHint: 'Thank him for his guidance, support, and share favorite father-child memories.'
            },
            valentine: {
                pages: ['letter', 'gallery', 'surprise'],
                tip: "Valentine's Day messages express love with romantic letters and beautiful photos!",
                messageHint: 'Share why you love them, favorite memories, and your hopes for the future together.'
            },
            christmas: {
                pages: ['letter', 'gallery', 'custom'],
                tip: 'Christmas celebrations spread joy with festive photos and warm holiday wishes!',
                messageHint: 'Share holiday cheer, gratitude, and wishes for peace and happiness.'
            },
            newyear: {
                pages: ['letter', 'memories', 'surprise'],
                tip: 'New Year events celebrate fresh starts with reflections and exciting plans!',
                messageHint: 'Reflect on the past year, share resolutions, and express hopes for the year ahead.'
            },
            religious: {
                pages: ['letter', 'gallery'],
                tip: 'Religious celebrations honor faith with meaningful messages and sacred moments!',
                messageHint: 'Share blessings, spiritual reflections, and joy in celebrating your faith together.'
            }
        };

        return eventSuggestions[eventType] || { pages: [], tip: '', messageHint: '' };
    };

    const suggestions = getSuggestions();

    // Don't show if no event type or no suggestions
    if (!eventType || !suggestions.tip) return null;

    return (
        <div className="alert alert-info mb-4 d-flex align-items-start gap-3 smart-suggestions-alert">
            <Lightbulb size={24} className="text-info mt-1 flex-shrink-0" />
            <div className="flex-grow-1">
                <h6 className="mb-2 fw-semibold text-info">
                    💡 Smart Suggestion for {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
                </h6>
                <p className="mb-2 small smart-suggestion-tip">
                    {suggestions.tip}
                </p>
                <div className="small smart-suggestion-detail">
                    <strong>Recommended pages:</strong> {suggestions.pages.join(', ')}
                </div>
                {relationship && suggestions.messageHint && (
                    <div className="small mt-2 smart-suggestion-detail">
                        <strong>Message tip:</strong> {suggestions.messageHint}
                    </div>
                )}
            </div>
        </div>
    );
}

SmartSuggestions.propTypes = {
    eventType: PropTypes.string,
    relationship: PropTypes.string
};

export default SmartSuggestions;
