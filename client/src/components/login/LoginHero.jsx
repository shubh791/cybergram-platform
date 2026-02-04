import LoginContainer from "./LoginContainer";

export default function LoginHero() {

  return (
    <section className="relative flex-1 overflow-hidden">

      {/* VIDEO */}
      <video
        src="/videos/cyberback.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="
          absolute inset-0 w-full h-full
          object-cover scale-105
          animate-slow-zoom
        "
      />

      {/* OVERLAY FIXED */}
      <div className="
        absolute inset-0
        bg-gradient-to-b
        from-black/70 via-black/60 to-black/90
        pointer-events-none
      " />

      {/* CONTENT */}
      <div className="
        relative z-10
        flex justify-center
        py-24 px-4
      ">

        <LoginContainer />

      </div>

    </section>
  );
}
