import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/events';
import StepDetails from './Steps/StepDetails';
import StepTheme from './Steps/StepTheme';
import StepPages from './Steps/StepPages';
import StepPhotos from './Steps/StepPhotos';
import StepReview from './Steps/StepReview';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const STEPS = ['Details', 'Theme', 'Pages', 'Photos', 'Review'];

function Wizard() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        eventType: 'birthday',
        senderName: '',
        receiverName: '',
        relationship: '',
        date: '',
        mainMessage: '',
        theme: 'elegant',
        enabledPages: ['home'],
        photos: [],
        customPageData: { title: '', body: '' }
    });

    const updateFormData = (updates) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        console.log('🎯 Submit button clicked');
        console.log('📋 Form data:', formData);

        // Validation
        if (!formData.senderName || !formData.receiverName) {
            setError('Please fill in sender and receiver names');
            alert('Please fill in both your name and the recipient\'s name!');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            console.log('🚀 Starting event creation...');
            const slug = await createEvent(formData);
            console.log('✅ Creation successful, slug:', slug);
            console.log('🔄 Navigating to share page...');
            navigate(`/share/${slug}`);
        } catch (error) {
            console.error('❌ Error in handleSubmit:', error);
            setError(error.message || 'Failed to create event. Please try again.');
            alert(`Failed to create event: ${error.message}\n\nPlease check the console for more details.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <StepDetails formData={formData} updateFormData={updateFormData} />;
            case 1:
                return <StepTheme formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <StepPages formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <StepPhotos formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <StepReview formData={formData} />;
            default:
                return null;
        }
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3 position-relative wizard-main-wrapper">

                <div className="bg-decoration wizard-bg-decor-pink" />
                <div className="bg-decoration wizard-bg-decor-blue" />

                <div className="container position-relative wizard-container">
                    {/* Header */}
                    <div className="text-center mb-4 fade-in-down">
                        <p className="text-uppercase small text-info fw-semibold mb-2">
                            Step {currentStep + 1} · {STEPS[currentStep]}
                        </p>
                        <h1 className="display-5 fw-bold mb-2">
                            <span className="gradient-text-animated">Create Your Event Microsite</span>
                        </h1>
                        <p className="small text-muted-light">
                            Fill in a few details — we'll generate a beautiful, multi-page experience.
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress mb-4 wizard-progress-bar-container">
                        <div className="progress-bar progress-gradient"
                            role="progressbar"
                            style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100">
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="alert alert-danger mb-4 shake" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="glass-card p-4 p-md-5 mb-4 scale-in hover-lift">
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top wizard-nav-container">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="btn btn-outline-light btn-ripple"
                            >
                                ← Previous
                            </button>

                            {currentStep === STEPS.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="btn btn-gradient btn-ripple hover-glow"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        'Generate Microsite 🚀'
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={nextStep}
                                    className="btn btn-gradient btn-ripple"
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Helper Text */}
                    <p className="text-center small text-muted-light fade-in-up">
                        After submitting, you'll get a unique link to share your microsite
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Wizard;
