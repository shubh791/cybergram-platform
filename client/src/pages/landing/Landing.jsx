import SEO from "../../components/common/SEO";

import LandingHeader from "../../components/landing/LandingHeader";
import VideoSection from "../../components/landing/VideoSection";
import HeroText from "../../components/landing/HeroText";
import WhyCybergram from "../../components/landing/WhyCybergram";
import Footer from "../../components/landing/Footer";

export default function Landing() {

  return (
    <div>

      {/* SEO */}
      <SEO
        title="Cybergram | Cyber Awareness Platform"
        description="Cybergram helps users detect scams, report cyber threats and stay digitally safe using community powered alerts."
        keywords="cybergram, cyber security, scam alerts, online fraud"
      />

      <LandingHeader />

      {/* HERO */}
      <section className="min-h-screen pt-24 flex items-center">

        <div
          className="
            max-w-7xl mx-auto px-6
            grid md:grid-cols-[1.2fr_1fr]
            gap-10 items-center
          "
        >
          <VideoSection />
          <HeroText />
        </div>

      </section>

      <WhyCybergram />

      <Footer />

    </div>
  );
}
