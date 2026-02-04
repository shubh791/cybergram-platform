export default function VideoSection() {

  return (
    <div
      className="
        relative rounded-xl overflow-hidden
        w-full
        h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]

        border border-cyan-400/40
        video-glow

      "
    >

      {/* VIDEO */}
      <video
        src="/videos/landing.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full h-full object-cover
          brightness-110 contrast-110
        "
      />

      {/* CYBER GRADIENT OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/55 via-transparent to-black/50
        "
      />

      {/* GLOW EDGE EFFECT */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          ring-1 ring-cyan-400/40
          rounded-xl
        "
      />

    </div>
  );
}
