import { useState } from 'react';
import { Upload, X } from 'lucide-react';

function StepPhotos({ formData, updateFormData }) {
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = [...formData.photos, ...files];
        updateFormData({ photos: newPhotos });

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        const newPhotos = formData.photos.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        updateFormData({ photos: newPhotos });
        setPreviews(newPreviews);
    };

    return (
        <div>
            <h4 className="fw-semibold mb-2">Upload Photos</h4>
            <p className="small text-muted-light mb-4">Add photos to your event gallery (optional)</p>

            <label
                htmlFor="photo-upload"
                className="border border-2 border-dashed rounded p-5 text-center d-block wizard-photo-label"
            >
                <div className="mb-3 d-inline-flex align-items-center justify-content-center wizard-photo-icon-wrapper">
                    <Upload size={24} className="text-info" />
                </div>
                <p className="mb-1 fw-semibold">Click to upload photos</p>
                <p className="small text-muted-light mb-0">
                    Up to 10 photos • JPG, PNG, or WebP • Max 2MB each
                </p>
                <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="d-none"
                />
            </label>

            {previews.length > 0 && (
                <div className="mt-4">
                    <h6 className="text-muted-light mb-3">
                        {previews.length} Photo{previews.length !== 1 ? 's' : ''} Uploaded
                    </h6>
                    <div className="row g-3">
                        {previews.map((preview, index) => (
                            <div key={index} className="col-6 col-md-4 col-lg-3">
                                <div className="position-relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="img-fluid rounded border border-secondary wizard-photo-preview"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center wizard-photo-remove-btn"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {previews.length === 0 && (
                <div className="alert alert-secondary mt-3 text-center" role="alert">
                    <small className="text-muted-light">
                        No photos uploaded yet. Skip this step if you don't want to add photos.
                    </small>
                </div>
            )}
        </div>
    );
}

export default StepPhotos;
