import { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success('Thank you. Your message has been received.');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="contact-page flex-grow-1">
        <section className="contact-hero">
          <div className="container text-center">
            <div className="legal-icon mx-auto">
              <MessageSquare size={30} />
            </div>

            <h1>Contact EventCraft</h1>

            <p>
              Have a question, technical issue, or business enquiry? Our team
              is ready to help.
            </p>
          </div>
        </section>

        <section className="container contact-section">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-info-card">
                <h2>Get in touch</h2>

                <p>
                  Contact us for account support, platform questions, event
                  creation assistance, or general enquiries.
                </p>

                <div className="contact-info-item">
                  <Mail size={22} />

                  <div>
                    <strong>Email</strong>
                    <span>support@eventcraft.com</span>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MapPin size={22} />

                  <div>
                    <strong>Location</strong>
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MessageSquare size={22} />

                  <div>
                    <strong>Support hours</strong>
                    <span>Monday to Friday, 9:00 AM to 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form className="contact-form-card" onSubmit={handleSubmit}>
                <h2>Send us a message</h2>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email address</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Subject</label>

                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Message</label>

                    <textarea
                      name="message"
                      rows="6"
                      className="form-control"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-gradient px-4 py-3 d-inline-flex align-items-center gap-2"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;