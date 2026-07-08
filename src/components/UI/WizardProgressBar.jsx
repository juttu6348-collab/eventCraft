import PropTypes from 'prop-types';

function WizardProgressBar({ steps, currentStep, completedSteps, onStepClick }) {
    const getStepStatus = (stepId) => {
        if (stepId === currentStep) return 'active';
        if (completedSteps.includes(stepId)) return 'completed';
        return 'inactive';
    };

    const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="wizard-progress-container mb-5 fade-in-up">
            {/* Progress Steps */}
            <div className="wizard-progress">
                {/* Background Line */}
                <div className="wizard-progress-line">
                    <div
                        className="wizard-progress-line-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Steps */}
                {steps.map((step) => {
                    const status = getStepStatus(step.id);
                    const isClickable = status === 'completed' || status === 'active';

                    return (
                        <div
                            key={step.id}
                            className={`wizard-step ${isClickable ? 'clickable' : 'not-allowed'}`}
                            onClick={() => isClickable && onStepClick(step.id)}
                        >
                            {/* Step Circle */}
                            <div className={`wizard-step-circle ${status}`}>
                                {status === 'completed' ? (
                                    <span className="wizard-check">✓</span>
                                ) : (
                                    <span className="wizard-step-icon">{step.icon}</span>
                                )}
                            </div>

                            {/* Step Info (hidden on mobile) */}
                            <div className="wizard-step-info mt-3 text-center d-none d-md-block">
                                <div className="wizard-step-title fw-semibold">
                                    {step.title}
                                </div>
                                <div className="wizard-step-description small">
                                    {step.description}
                                </div>
                            </div>

                            {/* Mobile Label */}
                            <div className="wizard-step-mobile d-md-none mt-2 text-center">
                                <small className="fw-semibold">{step.id}</small>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress Text */}
            <div className="text-center mt-4">
                <span className="badge bg-gradient px-3 py-2">
                    Step {currentStep} of {steps.length}
                    <span className="ms-2">•</span>
                    <span className="ms-2">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
                </span>
            </div>
        </div>
    );
}

WizardProgressBar.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    })).isRequired,
    currentStep: PropTypes.number.isRequired,
    completedSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
    onStepClick: PropTypes.func.isRequired
};

export default WizardProgressBar;
