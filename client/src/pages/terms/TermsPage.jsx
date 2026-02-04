import Footer from "../../components/landing/Footer";
import LegalHeader from "../../components/layout/LegalHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020814] to-black text-white">

      {/* HEADER */}
      <LegalHeader />

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          {/* INTRO */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Cybergram, you agree to comply with and be
              legally bound by these Terms and Conditions. If you do not agree
              with any part of these terms, you must discontinue using our
              platform.
            </p>
          </section>

          {/* PLATFORM PURPOSE */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Platform Purpose
            </h2>
            <p>
              Cybergram is an independent cyber awareness and reporting platform
              created for educational and informational purposes. It helps users
              share experiences, detect cyber scams, and stay digitally safe.
            </p>

            <p className="mt-2 text-yellow-400">
              ⚠ Cybergram is NOT an official government website or law enforcement portal.
            </p>
          </section>

          {/* USER RESPONSIBILITY */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. User Responsibilities
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Provide accurate and lawful information.</li>
              <li>Do not post harmful, illegal, abusive, or misleading content.</li>
              <li>Respect privacy and digital safety of other users.</li>
              <li>Do not misuse the platform for fraudulent activities.</li>
            </ul>
          </section>

          {/* ACCOUNT SECURITY */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Account Security
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Cybergram is not responsible for unauthorized
              access caused by user negligence.
            </p>
          </section>

          {/* CONTENT OWNERSHIP */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Content Ownership
            </h2>
            <p>
              Users retain ownership of the content they post. However, by
              submitting content on Cybergram, you grant us permission to display
              and distribute it within the platform for awareness and community
              safety purposes.
            </p>
          </section>

          {/* LIMITATION */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              Cybergram shall not be held liable for any loss, damages, or legal
              consequences resulting from the use of the platform or reliance on
              user-generated content.
            </p>
          </section>

          {/* TERMINATION */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              platform rules, spread misinformation, or engage in harmful
              activities.
            </p>
          </section>

          {/* MODIFICATIONS */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Changes to Terms
            </h2>
            <p>
              Cybergram may update these Terms at any time. Continued use of the
              platform after changes indicates acceptance of the revised terms.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Contact Information
            </h2>
            <p>
              If you have any questions regarding these Terms, you may contact us
              through the Cybergram platform support channels.
            </p>
          </section>

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
