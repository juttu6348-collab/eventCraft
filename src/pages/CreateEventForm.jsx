import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { createEvent } from '../services/events';
import { Upload, X, CheckCircle } from 'lucide-react';
import { saveDraft, loadDraft, clearDraft, hasDraft, formatDraftAge, getDraftAge } from '../utils/draftManager';
import Navbar from '../components/Layout/Navbar';
import { themes } from '../utils/themes';
import Footer from '../components/Layout/Footer';
import WizardProgressBar from '../components/UI/WizardProgressBar';
import WizardNavigation from '../components/UI/WizardNavigation';
import SmartSuggestions from '../components/UI/SmartSuggestions';
import { useUI } from '../context/UIContext';

const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

function CreateEventForm() {
    const { eventType } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlTheme = searchParams.get('theme');

    // Wizard State
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);

    // Form State (existing)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        eventType: eventType || 'birthday',
        senderName: '',
        receiverName: '',
        relationship: '',
        date: '',
        mainMessage: '',
        theme: urlTheme || 'elegant',
        enabledPages: ['home'],
        photos: [],
        customPageData: { title: '', body: '' }
    });





    const { confirm } = useUI();
    const hasCheckedDraft = useRef(false);

    // Load draft on component mount
    useEffect(() => {
  const checkDraft = async () => {
    try {
      if (!hasDraft()) {
        return;
      }

      const draft = loadDraft();

      const hasMeaningfulDraft =
        draft &&
        (
          draft.senderName?.trim() ||
          draft.receiverName?.trim() ||
          draft.mainMessage?.trim()
        );

      if (!hasMeaningfulDraft) {
        clearDraft();
        return;
      }

      const age = getDraftAge();
      const ageText = formatDraftAge(age);

      const shouldLoad = await confirm({
        title: 'Resume Editing?',
        message: `You have an unsaved draft from ${ageText}. Would you like to continue where you left off?`,
        confirmText: 'Yes, Resume',
        cancelText: 'No, Start Over',
        variant: 'primary',
      });

      if (shouldLoad) {
        setFormData((currentFormData) => ({
          ...currentFormData,
          ...draft,

          // Always let the user make a fresh Step 4 selection.
          enabledPages: ['home'],

          // Browser File objects cannot safely be restored from localStorage.
          photos: [],
        }));
      } else {
        clearDraft();
      }
    } catch (error) {
      console.error('Failed to restore event draft:', error);
      clearDraft();
    }
  };

  checkDraft();
}, []);

    // Auto-save draft every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (formData.senderName || formData.receiverName || formData.mainMessage) {
                saveDraft(formData);
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [formData]);



    const pages = [
        { id: 'home', name: 'Home', description: 'Welcome page (Always included)', disabled: true },
        { id: 'letter', name: 'Letter', description: 'Heartfelt message with animations' },
        { id: 'gallery', name: 'Gallery', description: 'Photo grid with lightbox' },
        { id: 'memories', name: 'Memories', description: 'Timeline of special moments' },
        { id: 'surprise', name: 'Surprise', description: 'Confetti reveal with secret message' },
        { id: 'custom', name: 'Custom Page', description: 'Your own custom content' }
    ];

    // Wizard Steps Configuration
    const wizardSteps = [
        {
            id: 1,
            title: 'Event Details',
            description: 'Basic information',
            icon: '📝'
        },
        {
            id: 2,
            title: 'Choose Theme',
            description: 'Pick a visual style',
            icon: '🎨'
        },
        {
            id: 3,
            title: 'Add Photos',
            description: 'Upload pictures (optional)',
            icon: '📸'
        },
        {
            id: 4,
            title: 'Select Page',
            description: 'Choose one page',
            icon: '📄'
        }
    ];

    // Validation Logic
    const validateStep = (stepNumber) => {
        switch (stepNumber) {
            case 1:
                return formData.senderName.trim() && formData.receiverName.trim();
            case 2:
                return formData.theme !== '';
            case 3:
                return true; // Photos are optional
            case 4: {
                const selectedAdditionalPages = formData.enabledPages.filter(
                    (pageId) => pageId !== 'home'
                );

                const hasExactlyOneAdditionalPage =
                    selectedAdditionalPages.length === 1;

                const selectedPage = selectedAdditionalPages[0];

                const customPageIsValid =
                    selectedPage !== 'custom' ||
                    Boolean(formData.customPageData.title.trim());

                return hasExactlyOneAdditionalPage && customPageIsValid;
            }
            default:
                return false;
        }
    };

    const isCurrentStepValid = validateStep(currentStep);

    // Wizard Navigation Handlers
    const handleNext = () => {
        if (validateStep(currentStep)) {
            // Mark current step as completed
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps([...completedSteps, currentStep]);
            }
            // Move to next step
            setCurrentStep(currentStep + 1);
            // Save draft
            saveDraft(formData);
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStepClick = (stepId) => {
        // Only allow clicking on completed or current step
        if (completedSteps.includes(stepId) || stepId === currentStep) {
            setCurrentStep(stepId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePhotoUpload = (event) => {
        const selectedFiles = Array.from(event.target.files || []);

        setError('');

        if (selectedFiles.length > MAX_PHOTOS) {
            setError(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
            event.target.value = '';
            return;
        }

        const invalidFile = selectedFiles.find(
            (file) => file.type && !file.type.startsWith('image/')
        );

        if (invalidFile) {
            setError(`"${invalidFile.name}" is not a valid image.`);
            event.target.value = '';
            return;
        }

        const oversizedFile = selectedFiles.find(
            (file) => file.size > MAX_PHOTO_SIZE_BYTES
        );

        if (oversizedFile) {
            setError(
                `"${oversizedFile.name}" exceeds the maximum size of 5 MB.`
            );
            event.target.value = '';
            return;
        }

        setFormData((previousFormData) => ({
            ...previousFormData,
            photos: selectedFiles
        }));

        // Allows the same file to be selected again after removal.
        event.target.value = '';
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };

    const selectSinglePage = (pageId) => {
        if (pageId === 'home') {
            return;
        }

        setError('');

        setFormData((previousFormData) => ({
            ...previousFormData,
            enabledPages: ['home', pageId]
        }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        // Comprehensive validation
        if (!formData.senderName.trim()) {
            setError('Please enter your name');
            document.querySelector('input[placeholder="Enter your name"]')?.focus();
            return;
        }

        if (!formData.receiverName.trim()) {
            setError('Please enter the recipient\'s name');
            document.querySelector('input[placeholder="Who is this for?"]')?.focus();
            return;
        }

        const selectedAdditionalPages = formData.enabledPages.filter(
            (pageId) => pageId !== 'home'
        );

        if (selectedAdditionalPages.length !== 1) {
            setError(
                'Please select exactly one page. Home is included automatically.'
            );
            setCurrentStep(4);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (isCustomPageEnabled && !formData.customPageData.title.trim()) {
            setError('Please provide a title for your custom page');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            console.log('📤 Submitting event data...');
            const slug = await createEvent(formData);
            console.log('✅ Event created successfully!', slug);

            // Small delay to show success state
            setTimeout(() => {
                navigate(`/share/${slug}`);
            }, 300);
        } catch (error) {
            console.error('❌ Submission error:', error);
            setError(error.message || 'Failed to create event. Please try again.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isCustomPageEnabled = formData.enabledPages.includes('custom');

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1 py-5 create-event-main-wrapper">
                <div className="container create-event-container">
                    {/* Header */}
                    <div className="text-center mb-4 fade-in-down">
                        {eventType && (
                            <div className="mb-3">
                                <span className="badge bg-gradient px-4 py-2 text-capitalize">
                                    {eventType.replace('-', ' ')} Event
                                </span>
                            </div>
                        )}
                        <h1 className="display-5 fw-bold mb-3">
                            <span className="gradient-text-animated">Create Your Event Microsite</span>
                        </h1>
                        <p className="lead text-muted-light">
                            Step-by-step wizard to create your beautiful microsite
                        </p>
                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <span className="badge badge-outline-light">✓ No sign-up required</span>
                            <span className="badge badge-outline-light">✓ Free forever</span>
                            <span className="badge badge-outline-light">✓ 3 min wizard</span>
                        </div>
                    </div>

                    {/* Wizard Progress Bar */}
                    <WizardProgressBar
                        steps={wizardSteps}
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />

                    {/* Error Display */}
                    {error && (
                        <div className="alert alert-danger mb-4 shake">
                            {error}
                        </div>
                    )}

                    {/* Main Form */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        {/* Step 1: Event Details */}
                        {currentStep === 1 && (
                            <div className="glass-card p-4 p-md-5 mb-4 wizard-step-content">
                                <h4 className="fw-semibold mb-4">Event Details</h4>

                                {/* Smart Suggestions */}
                                <SmartSuggestions
                                    eventType={formData.eventType}
                                    relationship={formData.relationship}
                                />

                                <div className="row g-3">
                                    {/* Event Type Selector */}
                                    <div className="col-12">
                                        <label className="form-label">Event Type *</label>
                                        <select
                                            className="form-select form-control-dark"
                                            value={formData.eventType}
                                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                            required
                                        >
                                            <option value="birthday">🎂 Birthday</option>
                                            <option value="anniversary">💕 Anniversary</option>
                                            <option value="wedding">💒 Wedding</option>
                                            <option value="engagement">💍 Engagement</option>
                                            <option value="baby">👶 New Baby</option>
                                            <option value="graduation">🎓 Graduation</option>
                                            <option value="success">🏆 Success</option>
                                            <option value="promotion">📈 Promotion</option>
                                            <option value="farewell">👋 Farewell</option>
                                            <option value="retirement">🌟 Retirement</option>
                                            <option value="thankyou">💐 Thank You</option>
                                            <option value="housewarming">🏠 Housewarming</option>
                                            <option value="getwell">💪 Get Well Soon</option>
                                            <option value="apology">🙏 Apology</option>
                                            <option value="mothersday">💝 Mother's Day</option>
                                            <option value="fathersday">👔 Father's Day</option>
                                            <option value="valentine">💘 Valentine's Day</option>
                                            <option value="christmas">🎄 Christmas</option>
                                            <option value="newyear">🎊 New Year</option>
                                            <option value="religious">🕯️ Religious Day</option>
                                        </select>
                                        <small className="text-muted-light">Choose the type of event you're creating</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Your Name (Sender) *</label>
                                        <input
  type="text"
  name="senderName"
  className="form-control form-control-dark"
  placeholder="Enter your name"
  value={formData.senderName}
  onChange={(event) =>
    setFormData((currentFormData) => ({
      ...currentFormData,
      senderName: event.target.value,
    }))
  }
/>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Recipient Name *</label>
                                       <input
  type="text"
  name="receiverName"
  className="form-control form-control-dark"
  placeholder="Who is this for?"
  value={formData.receiverName}
  onChange={(event) =>
    setFormData((currentFormData) => ({
      ...currentFormData,
      receiverName: event.target.value,
    }))
  }
/>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Your Relationship</label>
                                        <select
  name="relationship"
  className="form-select form-control-dark"
  value={formData.relationship}
  onChange={(event) =>
    setFormData((currentFormData) => ({
      ...currentFormData,
      relationship: event.target.value,
    }))
  }
>
  <option value="">Select relationship...</option>
  <option value="Mother">Mother</option>
  <option value="Father">Father</option>
  <option value="Wife">Wife</option>
  <option value="Husband">Husband</option>
  <option value="Friend">Friend</option>
  <option value="Other">Other</option>
</select>
                                        <small className="text-muted-light">This helps personalize the message</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Event Date (Optional)</label>
                                       <input
  type="date"
  name="date"
  className="form-control form-control-dark"
  value={formData.date}
  onChange={(event) =>
    setFormData((currentFormData) => ({
      ...currentFormData,
      date: event.target.value,
    }))
  }
/>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Main Message (Optional)</label>
                                        <textarea
  name="mainMessage"
  className="form-control form-control-dark"
  rows="5"
  placeholder="Write your heartfelt message here..."
  value={formData.mainMessage}
  onChange={(event) =>
    setFormData((currentFormData) => ({
      ...currentFormData,
      mainMessage: event.target.value,
    }))
  }
/>
                                        <small className="text-info">
                                            ✨ <strong>Pro tip:</strong> Leave this blank and our AI will generate a perfect, emotional message tailored to your relationship!
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Choose Theme */}
                        {currentStep === 2 && (
                            <div className="glass-card p-4 p-md-5 mb-4 wizard-step-content">
                                <h4 className="fw-semibold mb-4">Choose Theme</h4>

                                <div className="row g-3">
                                    {themes.map(theme => (
                                        <div key={theme.id} className="col-6 col-md-4">
                                            <div
                                                className={`card h-100 hover-lift theme-selection-card ${formData.theme === theme.id ? 'border-info' : 'card-dark'}`}
                                                onClick={() => setFormData({ ...formData, theme: theme.id })}
                                            >
                                                <div
                                                    className="theme-preview-gradient"
                                                    style={{
                                                        '--theme-gradient': theme.gradient,
                                                    }}
                                                />
                                                <div className="card-body text-center">
                                                    <h6 className="mb-1">{theme.name}</h6>
                                                    {formData.theme === theme.id && (
                                                        <CheckCircle size={20} className="text-info mt-2" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Upload Photos */}
                        {currentStep === 3 && (
                            <div className="glass-card p-4 p-md-5 mb-4 wizard-step-content">
                                <h4 className="fw-semibold mb-4">Upload Photos</h4>
                                <p className="text-muted-light mb-4">Optional - Add up to 10 photos to your microsite</p>

                                <div className="mb-3">
                                    <label className="btn btn-outline-light w-100 py-4 d-flex flex-column align-items-center gap-2 photo-upload-label">
                                        <Upload size={32} />
                                        <span>Click to upload photos or drag and drop</span>
                                        <small className="text-muted-light">
                                            Select image files • Maximum 5 MB per image • Up to 10 images
                                        </small>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,.heic,.heif,.avif,.bmp,.tif,.tiff,.svg"
                                            onChange={handlePhotoUpload}
                                            className="d-none"
                                        />
                                    </label>
                                </div>

                                {formData.photos.length > 0 && (
                                    <div className="row g-2">
                                        {formData.photos.map((photo, index) => (
                                            <div key={index} className="col-4 col-md-3">
                                                <div className="position-relative">
                                                    <img
                                                        src={URL.createObjectURL(photo)}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-100 rounded photo-preview-img"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoto(index)}
                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 photo-remove-btn"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Select Pages */}
                        {currentStep === 4 && (
                            <div className="glass-card p-4 p-md-5 mb-4 wizard-step-content">
                                <h4 className="fw-semibold mb-2">Choose One Page to Include</h4>
                                <p className="text-muted-light mb-4">
                                    Home is always included. Select only one additional page.
                                </p>

                                <div className="row g-3">
                                    {pages.map((page) => (
                                        <div key={page.id} className="col-md-6">
                                            <div
                                                className={`card p-3 hover-lift page-selection-card ${page.disabled ? 'disabled' : ''} ${formData.enabledPages.includes(page.id) ? 'page-card-selected' : 'card-dark'}`}
                                                onClick={() => {
                                                    if (!page.disabled) {
                                                        selectSinglePage(page.id);
                                                    }
                                                }}
                                                role={page.disabled ? undefined : 'radio'}
                                                aria-checked={page.disabled ? undefined : formData.enabledPages.includes(page.id)}
                                                tabIndex={page.disabled ? -1 : 0}
                                                onKeyDown={(event) => {
                                                    if (
                                                        !page.disabled &&
                                                        (event.key === 'Enter' || event.key === ' ')
                                                    ) {
                                                        event.preventDefault();
                                                        selectSinglePage(page.id);
                                                    }
                                                }}
                                            >
                                                <div className="d-flex align-items-start gap-2">
                                                    <input
                                                        type={page.disabled ? 'checkbox' : 'radio'}
                                                        name={page.disabled ? undefined : 'selectedEventPage'}
                                                        className="form-check-input mt-1"
                                                        checked={formData.enabledPages.includes(page.id)}
                                                        disabled={page.disabled}
                                                        onChange={() => {
                                                            if (!page.disabled) {
                                                                selectSinglePage(page.id);
                                                            }
                                                        }}
                                                        onClick={(event) => event.stopPropagation()}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{page.name}</h6>
                                                        <small className="text-muted-light">{page.description}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Custom Page Fields */}
                                {isCustomPageEnabled && (
                                    <div className="mt-4 p-3 border-top custom-fields-section">
                                        <h6 className="mb-3 text-info">Custom Page Details</h6>
                                        <div className="mb-3">
                                            <label className="form-label">Page Title</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-dark"
                                                value={formData.customPageData.title}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    customPageData: { ...formData.customPageData, title: e.target.value }
                                                })}
                                                placeholder="E.g., Our Story, Thank You, etc."
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Page Content</label>
                                            <textarea
                                                className="form-control form-control-dark"
                                                rows={5}
                                                value={formData.customPageData.body}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    customPageData: { ...formData.customPageData, body: e.target.value }
                                                })}
                                                placeholder="Write your custom content here..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wizard Navigation */}
                        <WizardNavigation
                            currentStep={currentStep}
                            totalSteps={4}
                            onNext={handleNext}
                            onBack={handleBack}
                            onSubmit={handleSubmit}
                            isValid={isCurrentStepValid}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default CreateEventForm;