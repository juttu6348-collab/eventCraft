import { useState, useEffect } from 'react';
import { Save, Folder, Download, Upload } from 'lucide-react';
import { db } from '../../services/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function EventTemplates({ onLoadTemplate }) {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        if (!currentUser) return;

        try {
            const q = query(
                collection(db, 'eventTemplates'),
                where('userId', '==', currentUser.uid)
            );
            const snapshot = await getDocs(q);
            const templatesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTemplates(templatesData);
        } catch (error) {
            console.error('Error loading templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveAsTemplate = async (eventData, templateName) => {
        try {
            await addDoc(collection(db, 'eventTemplates'), {
                userId: currentUser.uid,
                name: templateName,
                eventType: eventData.eventType,
                template: {
                    eventType: eventData.eventType,
                    theme: eventData.theme,
                    pages: eventData.pages,
                    customization: eventData.customization
                },
                createdAt: serverTimestamp()
            });

            toast.success('Template saved');
            loadTemplates();
        } catch (error) {
            toast.error('Failed to save template');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-4">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading templates...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="event-templates">
            <div className="mb-4">
                <h5 className="mb-2">
                    <Folder size={20} className="me-2" />
                    Event Templates
                </h5>
                <p className="text-muted-light small">Save and reuse event configurations</p>
            </div>

            {templates.length === 0 ? (
                <div className="glass-card p-4 text-center">
                    <Folder size={48} className="text-muted mb-3" />
                    <p className="text-muted-light">No templates saved yet</p>
                    <p className="small text-muted-light">
                        Create an event and save it as a template for future use
                    </p>
                </div>
            ) : (
                <div className="row g-3">
                    {templates.map(template => (
                        <div key={template.id} className="col-md-6 col-lg-4">
                            <div className="glass-card p-3 hover-lift">
                                <div className="d-flex align-items-start justify-content-between mb-2">
                                    <div>
                                        <h6 className="mb-1">{template.name}</h6>
                                        <span className="badge bg-secondary text-capitalize">
                                            {template.eventType}
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-info"
                                        onClick={() => {
                                            onLoadTemplate(template.template);
                                            toast.success(`Loaded template: ${template.name}`);
                                        }}
                                    >
                                        <Upload size={14} />
                                    </button>
                                </div>
                                <small className="text-muted-light">
                                    {template.createdAt?.toDate?.().toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 p-3 glass-card">
                <h6 className="mb-2">💡 Tips</h6>
                <ul className="small text-muted-light mb-0">
                    <li>Templates save your event type, theme, and page selections</li>
                    <li>Perfect for recurring events or consistent branding</li>
                    <li>Templates are private to your account</li>
                </ul>
            </div>
        </div>
    );
}

export default EventTemplates;
