import { ShieldCheck, Database, Lock, UserCheck } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

function PrivacyPolicy() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="legal-page flex-grow-1">
        <section className="legal-hero">
          <div className="container">
            <div className="legal-icon">
              <ShieldCheck size={30} />
            </div>

            <h1>Privacy Policy</h1>

            <p>
              This policy explains how EventCraft collects, uses, stores, and
              protects your personal information.
            </p>

            <span>Last updated: July 2026</span>
          </div>
        </section>

        <section className="container legal-content">
          <div className="legal-card">
            <h2>1. Information we collect</h2>

            <p>
              When you create an EventCraft account, we may collect your name,
              email address, profile information, event details, uploaded
              images, and basic activity information.
            </p>
          </div>

          <div className="legal-card">
            <div className="legal-heading-row">
              <Database size={22} />
              <h2>2. How your information is stored</h2>
            </div>

            <p>
              Account and event information is stored in the EventCraft
              database. Uploaded images may be stored separately on the
              application server or an approved storage service.
            </p>
          </div>

          <div className="legal-card">
            <div className="legal-heading-row">
              <UserCheck size={22} />
              <h2>3. How we use your information</h2>
            </div>

            <p>
              We use your information to create and manage accounts, generate
              event pages, provide platform features, improve performance, and
              maintain platform security.
            </p>
          </div>

          <div className="legal-card">
            <div className="legal-heading-row">
              <Lock size={22} />
              <h2>4. Data security</h2>
            </div>

            <p>
              EventCraft uses password hashing, authenticated API access, and
              database access controls. However, no online system can guarantee
              absolute security.
            </p>
          </div>

          <div className="legal-card">
            <h2>5. Your choices</h2>

            <p>
              You may update your account information or request account
              deletion through the available account settings or by contacting
              EventCraft support.
            </p>
          </div>

          <div className="legal-card">
            <h2>6. Contact</h2>

            <p>
              For questions about this policy, contact us at
              support@eventcraft.com.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;