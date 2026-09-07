export default function LightBeams() {
  return (
    <>
      {/* Left Beam */}

      <div
        className="
        absolute
        -left-96
        top-0
        h-[180vh]
        w-[340px]
        rotate-[22deg]
        bg-gradient-to-b
        from-transparent
        via-emerald-400/3
        to-transparent
        blur-[90px]
        animate-light-beam
        "
      />

      {/* Right Beam */}

      <div
        className="
        absolute
        right-[-380px]
        top-[-20%]
        h-[180vh]
        w-[260px]
        -rotate-[18deg]
        bg-gradient-to-b
        from-transparent
        via-blue-400/3
        to-transparent
        blur-[95px]
        animate-light-beam
        "
        style={{
          animationDelay: "7s",
        }}
      />

      {/* Center Beam */}

      <div
        className="
        absolute
        left-1/2
        top-[-30%]
        h-[160vh]
        w-[180px]
        -translate-x-1/2
        rotate-[10deg]
        bg-gradient-to-b
        from-transparent
        via-violet-300/2
        to-transparent
        blur-[110px]
        animate-light-beam
        "
        style={{
          animationDuration: "22s",
        }}
      />
    </>
  );
}