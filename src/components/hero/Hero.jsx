import HeroSearch from "./HeroSearch";
import HeroVisual from "./HeroVisual";
import { ShieldCheck } from "lucide-react";
import Reveal from "../animations/Reveal";

export default function Hero() {
  return (
    <section
  id="hero"
  className="relative z-10 overflow-hidden"
>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-28 text-center">

        {/* Premium Badge */}
        <Reveal delay={0}>
          <div
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/8
              px-5
              py-2
              text-sm
              font-medium
              text-emerald-300
              backdrop-blur-xl
            "
          >
            <ShieldCheck size={16} />
            Women's Safety • Community Powered Navigation
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.15}>
          <h1
            className="
              max-w-5xl
              text-5xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              md:text-7xl
            "
          >
            Every Journey
            <br />

            <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
              Should Feel Safe.
            </span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.3}>
          <p
            className="
              mt-8
              max-w-3xl
              text-lg
              leading-9
              text-slate-400
              md:text-xl
            "
          >
            SafeRoute combines community reports, verified safe zones,
            real-time safety insights, and intelligent route analysis
            to recommend safer routes—not just the fastest ones.
          </p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.45}>
          <div className="mt-12 w-full max-w-4xl">
            <HeroSearch />
          </div>
        </Reveal>

        {/* Floating Route Card */}
        <Reveal delay={0.6}>
          <div className="mt-24">
            <HeroVisual />
          </div>
        </Reveal>

      </div>
    </section>
  );
}