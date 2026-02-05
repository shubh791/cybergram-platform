import SignupForm from "./SignupForm";
import { Typewriter } from "react-simple-typewriter";
import AuthHeader from "../../components/auth/AuthHeader";

export default function SignupHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <AuthHeader />

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/signup-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/75" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* ✅ STATIC INFO BAR (VISIBLE ON ALL DEVICES) */}
        <div
          className="
            mx-auto mb-8 w-fit
            px-6 py-2 rounded-full
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-black text-sm font-semibold
            text-center
            shadow-md
          "
        >
          🔐 Create Account • Stay Anonymous • Report Cyber Threats Safely
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* ❌ LEFT TEXT — HIDDEN ON MOBILE */}
          <div className="hidden md:block text-white space-y-6">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <Typewriter
                words={["Join Cybergram Security Network"]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={60}
              />
            </h1>

            <p className="text-gray-300 max-w-md leading-relaxed text-lg">
              <Typewriter
                words={[
                  "Protect your digital identity, detect cyber threats, and help others by reporting scams anonymously using Cybergram’s privacy-first cybersecurity platform."
                ]}
                loop={1}
                cursor={false}
                typeSpeed={25}
              />
            </p>

            <div className="text-cyan-400 text-sm font-medium">
              <Typewriter
                words={["Trusted • Secure • Privacy First"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={50}
              />
            </div>

          </div>

          {/* ✅ FORM — ALWAYS VISIBLE */}
          <SignupForm />

        </div>

      </div>

    </section>
  );
}
