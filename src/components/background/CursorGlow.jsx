import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    let frame;

    const move = (e) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };

    window.addEventListener("pointermove", move, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary Soft Glow */}
      <div
        className="
          absolute
          h-[220px]
          w-[220px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400/5
          blur-[90px]
          transition-transform
          duration-150
          ease-out
        "
        style={{
          left: position.x,
          top: position.y,
        }}
      />

      {/* Secondary Cool Glow */}
      <div
        className="
          absolute
          h-[120px]
          w-[120px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-300/5
          blur-[70px]
          transition-transform
          duration-200
          ease-out
        "
        style={{
          left: position.x,
          top: position.y,
        }}
      />

      {/* Tiny White Highlight */}
      <div
        className="
          absolute
          h-[18px]
          w-[18px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/20
          blur-[10px]
          transition-transform
          duration-100
          ease-out
        "
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </div>
  );
}