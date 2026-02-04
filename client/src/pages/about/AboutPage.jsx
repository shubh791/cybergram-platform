import AboutHeader from "../../components/layout/AboutHeader";
import Footer from "../../components/landing/Footer";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublicIcon from "@mui/icons-material/Public";
import BoltIcon from "@mui/icons-material/Bolt";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function AboutUs() {

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* HEADER */}
     <AboutHeader />

      {/* ================= HERO ================= */}

      <section className="pt-28 pb-16 text-center animate-fadeIn">

        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-cyan-400">Cybergram</span>
        </h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Building a secure digital ecosystem for cyber awareness, scam prevention
          and privacy-first communication.
        </p>

      </section>

      {/* ================= SECTION 1 — FOUNDER ================= */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT — FOUNDER CARD */}
          <div className="
            cyber-card
            animate-slideUp
          ">

            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              Founder & Developer
            </h2>

            <h3 className="text-xl font-semibold">
              Shubham Panghal
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed">

              I am a Full Stack Web Developer focused on building scalable,
              secure and production-ready applications.

              Cybergram is my initiative to create a privacy-first cyber awareness
              platform that empowers users to report scams, share cyber alerts,
              and protect their digital identity.

              <br /><br />

              My goal is to transform cybersecurity awareness into practical,
              easy-to-use tools that genuinely protect users.

            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-4 mt-6">

              <a
                href="https://github.com/shubh791"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <GitHubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/shubham-panghal-4b70752b8"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <LinkedInIcon />
              </a>

            </div>

          </div>

          {/* RIGHT — TECH STACK 3D CARD */}
          <div className="tech-3d-card animate-slideUp">

            <div className="tech-glow" />

            <div className="relative z-10">

              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                Tech Stack
              </h3>

              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed">

                <li>• Frontend: HTML5, CSS3, Bootstrap, Tailwind CSS, JavaScript (ES6+), React.js</li>

                <li>• Backend: Node.js, Express.js, REST API Development</li>

                <li>• Database: PostgreSQL, MongoDB, SQL</li>

                <li>• Tools & Concepts: Git, GitHub, API Integration, Authentication, Responsive Design</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SECTION 2 — VISION | MISSION | GOALS ================= */}

      <section className="bg-gradient-to-b from-[#020b16] to-black py-20">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <InfoCard
            icon={<VisibilityIcon />}
            title="Our Vision"
            text="To build a globally trusted cyber awareness platform empowering every digital citizen."
          />

          <InfoCard
            icon={<SecurityIcon />}
            title="Our Mission"
            text="To simplify cybersecurity awareness using modern technology and real-time data."
          />

          <InfoCard
            icon={<BoltIcon />}
            title="Our Goals"
            text="To become India's leading cyber safety platform with real-world impact."
          />

        </div>

      </section>

      {/* ================= SECTION 3 — WHAT CYBERGRAM PROVIDES ================= */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            What <span className="text-cyan-400">Cybergram</span> Provides
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <FeatureCard icon={<PublicIcon />} title="Cyber Awareness Network" text="Community powered scam alert system." />

            <FeatureCard icon={<SecurityIcon />} title="Secure Chat System" text="Encrypted real-time private messaging." />

            <FeatureCard icon={<VisibilityIcon />} title="Verified Cyber News" text="Curated cybersecurity updates." />

            <FeatureCard icon={<LockIcon />} title="Privacy Protection" text="Privacy-first user data handling." />

            <FeatureCard icon={<VerifiedIcon />} title="Trusted Platform" text="Verified cyber safety ecosystem." />

            <FeatureCard icon={<BoltIcon />} title="Fast Reporting" text="Quick and easy cyber incident reporting." />

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}


/* ================= COMPONENTS ================= */

function InfoCard({ icon, title, text }) {

  return (
    <div className="info-card animate-fadeInUp">

      <div className="text-cyan-400 text-4xl mb-3">
        {icon}
      </div>

      <h3 className="font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm">
        {text}
      </p>

    </div>
  );
}


function FeatureCard({ icon, title, text }) {

  return (
    <div className="feature-card">

      <div className="text-cyan-400 text-3xl mb-3">
        {icon}
      </div>

      <h4 className="font-semibold mb-2">
        {title}
      </h4>

      <p className="text-gray-400 text-sm">
        {text}
      </p>

    </div>
  );
}
