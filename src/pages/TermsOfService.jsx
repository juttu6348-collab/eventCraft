import { FileCheck2, ShieldAlert } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

function TermsOfService() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="legal-page flex-grow-1">
        <section className="legal-hero">
          <div className="container">
            <div className="legal-icon">
              <FileCheck2 size={30} />
            </div>

            <h1>Terms of Service</h1>

            <p>
              These terms explain the conditions for accessing and using the
              EventCraft platform.
            </p>

            <span>Last updated: July 2026</span>
          </div>
        </section>

        <section className="container legal-content">
          <div className="legal-card">
            <h2>1. Acceptance of terms</h2>

            <p>
              By accessing or using EventCraft, you agree to follow these terms
              and all applicable laws.
            </p>
          </div>

          <div className="legal-card">
            <h2>2. Account responsibilities</h2>

            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for activity performed through your
              account.
            </p>
          </div>

          <div className="legal-card">
            <h2>3. Acceptable use</h2>

            <p>
              You must not upload unlawful, harmful, abusive, misleading, or
              copyrighted material without permission.
            </p>
          </div>

          <div className="legal-card">
            <div className="legal-heading-row">
              <ShieldAlert size={22} />
              <h2>4. Platform availability</h2>
            </div>

            <p>
              EventCraft may update, suspend, or discontinue parts of the
              service when required for maintenance, security, or operational
              reasons.
            </p>
          </div>

          <div className="legal-card">
            <h2>5. User content</h2>

            <p>
              You retain responsibility for the content you upload. You grant
              EventCraft permission to process that content only as required to
              provide the platform service.
            </p>
          </div>

          <div className="legal-card">
            <h2>6. Account suspension</h2>

            <p>
              EventCraft may suspend accounts that violate these terms, misuse
              the platform, or create a security risk.
            </p>
          </div>

          <div className="legal-card">
            <h2>7. Contact</h2>

            <p>
              For questions about these terms, contact
              support@eventcraft.com.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfService;