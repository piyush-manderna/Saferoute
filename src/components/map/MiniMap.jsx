import { useState, useEffect } from "react";
import {
  Map,
  X,
  Navigation,
  ShieldCheck,
} from "lucide-react";

export default function MiniMap() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    const handleScroll = () => {
      if (!hero) return;

      const rect = hero.getBoundingClientRect();

      // Show mini map only after Hero is gone
      setVisible(rect.bottom < 120);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Mini Map */}

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className={`
  fixed
  bottom-8
  right-8
  z-[120]
  w-72
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-[#10151F]/90
  backdrop-blur-2xl
  shadow-[0_25px_80px_rgba(0,0,0,.45)]
  transition-all
  duration-700
  ease-[cubic-bezier(.22,1,.36,1)]
  animate-mini-map
  hover:-translate-y-2
  hover:scale-[1.02]
  hover:border-emerald-400/40
  hover:shadow-[0_20px_60px_rgba(20,241,149,.18)]
  ${
    visible
      ? "opacity-100 translate-x-0 translate-y-0 scale-100"
      : "opacity-0 translate-x-10 translate-y-10 scale-95 pointer-events-none"
  }
`}
        >
          {/* Mini Map */}

          <div className="relative h-36 bg-[#0D1524]">

            {/* Grid */}

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
                `,
                backgroundSize: "22px 22px",
              }}
            />

            {/* Route */}

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 300 150"
            >
              <path
                d="M20 120 C80 40 140 100 200 60 C230 40 260 60 280 20"
                stroke="#14F195"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Start */}

            <div className="absolute left-5 bottom-5 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(20,241,149,.6)]" />

            {/* Destination */}

            <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_15px_rgba(255,80,80,.5)]" />

          </div>

          {/* Footer */}

          <div className="flex items-center justify-between p-4">

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Quick Access
              </p>

              <h3 className="mt-1 font-semibold text-white">
                Open Live Map
              </h3>

            </div>

            <div className="rounded-xl bg-emerald-400/10 p-2">
              <Map className="text-emerald-300" />
            </div>

          </div>

        </button>
      )}

      {/* Expanded Map */}

      {expanded && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-md
            animate-fadeUp
          "
        >
          <div
            className="
              relative
              h-[80vh]
              w-[82vw]
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
              bg-[#09111C]
              shadow-[0_40px_120px_rgba(0,0,0,.7)]
            "
          >
            {/* Close */}

            <button
              onClick={() => setExpanded(false)}
              className="
                absolute
                right-6
                top-6
                z-20
                rounded-full
                bg-white/10
                p-3
                transition
                hover:bg-red-500
              "
            >
              <X />
            </button>

            {/* Background */}

            <div className="absolute inset-0 bg-[#0C1422]">

              {/* Grid */}

              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Route */}

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1200 700"
              >
                <path
                  d="M120 600 C300 420 450 520 640 320 C760 180 980 260 1090 120"
                  stroke="#14F195"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

            </div>

            {/* Info Card */}

            <div className="absolute left-8 top-8 rounded-3xl border border-white/10 bg-[#101827]/90 p-6 backdrop-blur-xl">

              <h2 className="text-2xl font-bold">
                Safe Route
              </h2>

              <p className="mt-2 text-slate-400">
                Churchgate → Bandra
              </p>

              <div className="mt-6 flex gap-8">

                <div>

                  <ShieldCheck className="text-emerald-300" />

                  <p className="mt-2 text-sm text-slate-500">
                    Safety
                  </p>

                  <h3 className="text-xl font-bold text-emerald-300">
                    92%
                  </h3>

                </div>

                <div>

                  <Navigation className="text-blue-300" />

                  <p className="mt-2 text-sm text-slate-500">
                    ETA
                  </p>

                  <h3 className="text-xl font-bold text-white">
                    18 min
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}