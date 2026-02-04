export default function FeatureCard({ icon, title, desc }) {

  return (
    <div
      className="
        cyber-glass cyber-glow
        p-7 md:p-8 rounded-xl
        hover:scale-105 transition
      "
    >

      <div className="text-cyan-400 text-2xl mb-3">
        {icon}
      </div>

      <h3 className="font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

    </div>
  );
}
