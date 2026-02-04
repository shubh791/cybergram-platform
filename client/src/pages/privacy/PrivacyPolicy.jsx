import LegalHeader from "../../components/layout/LegalHeader";
import Footer from "../../components/landing/Footer";

export default function PrivacyPolicy() {

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">

      {/* HEADER */}
      <LegalHeader />

      {/* SPACER FOR FIXED HEADER */}
      <div className="h-20"></div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400">
            Privacy Policy
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>

        </div>

        {/* IMPORTANT NOTICE */}
        <div className="
          mb-8
          p-4
          border border-yellow-500/40
          bg-yellow-500/5
          rounded-xl
          text-sm
          text-gray-300
        ">

          ⚠ Cybergram is NOT an official government website.  
          It is an independent cybersecurity awareness and social platform.  
          For official cybercrime reporting please visit:
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            className="text-cyan-400 underline ml-1"
          >
            cybercrime.gov.in
          </a>

        </div>

        {/* CONTENT BOX */}
        <div className="
          bg-[#081423]
          border border-cyan-500/20
          rounded-xl
          p-6 sm:p-8
          space-y-8
        ">

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              1. Introduction
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm">

              Cybergram ("we", "our", "platform") respects your privacy and is
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, store, and protect user data
              when you access or use Cybergram services.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              2. Information We Collect
            </h2>

            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">

              <li>Account details such as name, username, and email</li>
              <li>Profile information you voluntarily provide</li>
              <li>Activity data such as posts, likes, comments</li>
              <li>Device and browser technical data for security</li>

            </ul>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              3. How We Use Your Information
            </h2>

            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">

              <li>To provide and improve Cybergram services</li>
              <li>To secure accounts and prevent misuse</li>
              <li>To personalize user experience</li>
              <li>To notify users about important updates</li>

            </ul>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              4. Data Protection & Security
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              Cybergram uses industry-standard security practices including
              encryption, authentication systems, and access control to protect
              user data. However, no online system is 100% secure and users are
              advised to maintain strong passwords.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              5. Cookies & Local Storage
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              Cybergram may use browser storage and cookies for authentication,
              session management, and user experience optimization. These do not
              store sensitive personal data without user consent.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              6. Third-Party Services
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              Cybergram may integrate third-party tools such as analytics or API
              services. These services operate under their own privacy policies.
              We do not sell or trade user data to advertisers.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              7. User Responsibility
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              Users are responsible for maintaining account confidentiality.
              Cybergram will never ask for your password via email or messages.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              8. Policy Updates
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              Cybergram reserves the right to update this Privacy Policy at any
              time. Continued usage of the platform indicates acceptance of
              updated terms.

            </p>

          </section>

          {/* SECTION */}
          <section>

            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              9. Contact Information
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">

              For privacy-related concerns or support queries, please contact
              Cybergram through official communication channels available on the
              platform.

            </p>

          </section>

        </div>

      
      </div>

      {/* FOOTER */}
      <Footer />

    </div>

  );
}
