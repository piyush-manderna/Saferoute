import {
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center">

      <div
        className="
          relative
          w-[330px]
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          shadow-[0_25px_80px_rgba(0,0,0,.45)]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:scale-[1.02]
          hover:border-emerald-400/30
        "
      >

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between border-b border-white/10 p-5">

          <div>
            <p className="text-sm text-slate-400">
              Ready to Navigate
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Select your destination
            </h3>
          </div>

          <div
            className="
              rounded-full
              bg-slate-700/40
              px-3
              py-1
              text-sm
              font-medium
              text-slate-300
            "
          >
            WAITING
          </div>

        </div>

        {/* ================= MAP ================= */}

        <div className="relative h-56 overflow-hidden">

          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#090B11] via-[#111827] to-[#182233]" />

          {/* Grid */}

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Roads */}

          <div className="absolute left-12 top-10 h-36 w-[2px] rotate-12 bg-white/10" />
          <div className="absolute left-20 top-8 h-[2px] w-56 bg-white/10" />
          <div className="absolute left-16 top-28 h-[2px] w-52 bg-white/10" />
          <div className="absolute right-12 top-6 h-40 w-[2px] -rotate-12 bg-white/10" />

          {/* Animated Route */}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 360 220"
          >
            <path
              className="route-line"
              d="M40 180 C90 120 140 150 190 100 C240 60 290 100 330 40"
              fill="none"
              stroke="#18F7A9"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* Moving Dot */}

          <div className="route-dot" />

          {/* Empty Start */}

          <div
            className="
              absolute
              bottom-8
              left-8
              h-4
              w-4
              rounded-full
              border
              border-dashed
              border-white/25
            "
          />

          {/* Empty Destination */}

          <div
            className="
              absolute
              right-8
              top-8
              h-4
              w-4
              rounded-full
              border
              border-dashed
              border-white/25
            "
          />

          {/* Bottom Floating Message */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              -translate-x-1/2
              pointer-events-none
            "
          >
            <div
              className="
                rounded-full
                border
                border-white/10
                bg-black/45
                px-5
                py-2.5
                backdrop-blur-xl
                shadow-lg
              "
            >
              <p className="text-xs font-medium tracking-wide text-slate-300 whitespace-nowrap">
                Search a destination to preview the safest route
              </p>
            </div>
          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.02] p-5">

          <div className="text-center">

            <ShieldCheck
              size={22}
              className="mx-auto text-slate-500"
            />

            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              Safety
            </p>

            <h4 className="mt-1 text-xl font-bold text-slate-500">
              --
            </h4>

          </div>

          <div className="text-center">

            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
              ETA
            </p>

            <h4 className="mt-6 text-xl font-bold text-slate-500">
              --
            </h4>

          </div>

          <div className="text-center">

            <ArrowUpRight
              size={22}
              className="mx-auto text-slate-500"
            />

            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              Reports
            </p>

            <h4 className="mt-1 text-xl font-bold text-slate-500">
              --
            </h4>

          </div>

        </div>

      </div>

    </div>
  );
}