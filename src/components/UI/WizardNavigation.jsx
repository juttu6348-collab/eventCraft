import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

function WizardNavigation({
    currentStep,
    totalSteps,
    onNext,
    onBack,
    onSubmit,
    isValid,
    isSubmitting,
    nextLabel = 'Next Step',
    submitLabel = 'Generate Microsite 🚀'
}) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    const handleNext = () => {
        if (isLastStep) {
            onSubmit();
        } else {
            onNext();
        }
    };

    return (
        <div className="wizard-navigation">
            {/* Back Button */}
            {!isFirstStep && (
                <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-glass wizard-nav-button hover-scale"
                    disabled={isSubmitting}
                >
                    <ChevronLeft size={20} className="me-2" />
                    Back
                </button>
            )}

            {/* Spacer for first step */}
            {isFirstStep && <div className="wizard-nav-spacer" />}

            {/* Optional: Progress Indicator */}
            <div className="text-center flex-grow-1 d-none d-md-block">
                <small className="text-muted">
                    {isValid ? (
                        <span className="text-success">
                            <Check size={16} className="me-1" />
                            Step {currentStep} complete
                        </span>
                    ) : (
                        <span>
                            Complete the required fields to continue
                        </span>
                    )}
                </small>
            </div>

            {/* Next/Submit Button */}
            <button
                type="button"
                onClick={handleNext}
                className={`btn ${isLastStep ? 'btn-gradient' : 'btn-primary'} wizard-nav-button hover-glow btn-ripple`}
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Generating...
                    </>
                ) : isLastStep ? (
                    <>
                        {submitLabel}
                    </>
                ) : (
                    <>
                        {nextLabel}
                        <ChevronRight size={20} className="ms-2" />
                    </>
                )}
            </button>
        </div>
    );
}

WizardNavigation.propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    nextLabel: PropTypes.string,
    submitLabel: PropTypes.string
};

export default WizardNavigation;
