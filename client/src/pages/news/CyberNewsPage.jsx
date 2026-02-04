import CyberNewsPanel from "../../components/home/CyberNewsPanel";
import HomeHeader from "../../components/home/HomeHeader";

export default function CyberNewsPage() {

  return (
    <div className="min-h-screen bg-[#050b14]">

      {/* HEADER */}
      <HomeHeader />

      {/* MOBILE NEWS VIEW */}
      <div className="
        max-w-[900px]
        mx-auto
        px-4
        py-5
      ">

        <CyberNewsPanel />

      </div>

    </div>
  );
}
