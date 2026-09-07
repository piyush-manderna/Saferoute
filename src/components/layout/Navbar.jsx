import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Report Incident", href: "#report-incident" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="
      sticky
      top-4
      z-50
      mx-auto
      w-[97%]
      max-w-[1600px]
      rounded-2xl
      border
      border-white/10
      bg-[#0f172acc]
      backdrop-blur-3xl
      shadow-[0_10px_40px_rgba(0,0,0,.45)]
      "
    >
      {/* glow line */}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <nav className="flex h-[72px] items-center justify-between px-6">

        {/* ---------------- Logo ---------------- */}

        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >

          <div
            className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-emerald-400/30
            bg-gradient-to-br
            from-emerald-400/15
            to-blue-500/15
            transition
            duration-300
            group-hover:scale-110
            group-hover:shadow-[0_0_25px_rgba(20,241,149,.45)]
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 blur-xl opacity-0 transition group-hover:opacity-100"/>

            <ShieldCheck className="relative h-6 w-6 text-emerald-300"/>
          </div>

          <div>

            <p className="text-lg font-bold tracking-tight text-white">

              Safe
              <span className="text-emerald-300">Route</span>

            </p>

            <p className="text-[11px] uppercase tracking-[3px] text-slate-500">

              Women's Safety

            </p>

          </div>

        </a>

        {/* ---------------- Desktop Links ---------------- */}

        <div className="hidden items-center gap-2 md:flex">

          {navigationLinks.map(({ label, href }) => {

            if (label === "Report Incident") {

              return (

                <a
                  key={label}
                  href={href}
                  className="
                  group
                  relative
                  overflow-hidden
                  rounded-full
                  bg-gradient-to-r
                  from-rose-500
                  to-rose-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:scale-105
                  hover:shadow-[0_0_20px_rgba(244,63,94,.45)]
                  "
                >

                  <span className="absolute left-0 top-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full"/>

                  <span className="relative flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-white animate-pulse"/>

                    {label}

                  </span>

                </a>

              );

            }

            return (

              <a
                key={label}
                href={href}
                className="
                group
                relative
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-white/5
                hover:text-white
                "
              >

                {label}

                <span className="absolute bottom-1 left-4 right-4 h-[2px] scale-x-0 rounded-full bg-emerald-400 transition duration-300 group-hover:scale-x-100"/>

              </a>

            );

          })}

        </div>

        {/* ---------------- Mobile Button ---------------- */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          transition
          hover:border-emerald-400/50
          hover:text-emerald-300
          md:hidden
          "
        >

          {isMenuOpen ? <X size={18}/> : <Menu size={18}/>}

        </button>

      </nav>

      {/* ---------------- Mobile Menu ---------------- */}

      <div
        className={`
        overflow-hidden
        transition-all
        duration-300
        md:hidden

        ${
          isMenuOpen
            ? "max-h-72 border-t border-white/10"
            : "max-h-0"
        }
        `}
      >

        <div className="space-y-2 p-4">

          {navigationLinks.map(({ label, href }) => (

            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className={`
              block
              rounded-xl
              px-4
              py-3
              transition

              ${
                label === "Report Incident"
                  ? "bg-rose-500 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }
              `}
            >

              {label}

            </a>

          ))}

        </div>

      </div>

    </header>
  );
}