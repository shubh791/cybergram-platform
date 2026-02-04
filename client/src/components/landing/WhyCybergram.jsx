import FeatureCard from "./FeatureCard";

import SecurityIcon from "@mui/icons-material/Security";
import ReportIcon from "@mui/icons-material/Report";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import PublicIcon from "@mui/icons-material/Public";
import SpeedIcon from "@mui/icons-material/Speed";

export default function WhyCybergram() {

  return (
    <section className="py-20 bg-[#050a14]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-cyan-400">Cybergram</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <FeatureCard icon={<SecurityIcon />} title="Real Scam Alerts"
            desc="Get real-time fraud alerts from verified users." />

          <FeatureCard icon={<ReportIcon />} title="Report Cyber Crime"
            desc="Report scams and protect others." />

          <FeatureCard icon={<GroupsIcon />} title="Trusted Community"
            desc="Follow cyber safety experts." />

          <FeatureCard icon={<VerifiedIcon />} title="Verified Accounts"
            desc="Official trusted profiles." />

          <FeatureCard icon={<PublicIcon />} title="Global Awareness"
            desc="Worldwide threat updates." />

          <FeatureCard icon={<SpeedIcon />} title="Instant Alerts"
            desc="Fast cyber threat notifications." />

        </div>

      </div>

    </section>
  );
}
