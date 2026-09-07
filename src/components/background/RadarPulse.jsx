export default function RadarPulse() {
  return (
    <>
      {/* Top Right Radar */}

      <div className="absolute right-[12%] top-[20%]">
        <div className="radar-ring radar-ring-1" />
        <div className="radar-ring radar-ring-2" />
        <div className="radar-ring radar-ring-3" />

        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(20,241,149,.8)]" />
      </div>

      {/* Bottom Left Radar */}

      <div className="absolute left-[10%] bottom-[18%] opacity-60 scale-75">
        <div className="radar-ring radar-ring-1" />
        <div className="radar-ring radar-ring-2" />
        <div className="radar-ring radar-ring-3" />

        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(79,140,255,.8)]" />
      </div>
    </>
  );
}