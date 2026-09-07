import {
  ShieldCheck,
  MapPin,
  Navigation,
} from "lucide-react";

export default function JourneySection() {
  return (
    <section className="relative py-52">

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/70">
            Every journey matters
          </p>

          <h2 className="mt-6 text-5xl font-black">

            Your safety starts
            <br />

            before you walk.

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

            SafeRoute evaluates community verified reports,
            safer streets, well lit roads and nearby safe
            places before suggesting your journey.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mx-auto mt-36 flex max-w-md flex-col items-center">

          {/* Vertical Line */}

          <div className="absolute top-0 h-full w-px bg-gradient-to-b from-emerald-400 via-emerald-300/30 to-transparent" />

          {/* Point */}

          <div className="glass relative z-10 flex h-20 w-20 items-center justify-center rounded-full">

            <Navigation className="text-emerald-300" />

          </div>

          <div className="my-20 text-center">

            <h3 className="text-xl font-semibold">

              Choose Destination

            </h3>

            <p className="mt-2 text-slate-400">

              Select where you want to go.

            </p>

          </div>

          {/* Safe */}

          <div className="glass relative z-10 flex h-20 w-20 items-center justify-center rounded-full">

            <ShieldCheck className="text-emerald-300" />

          </div>

          <div className="my-20 text-center">

            <h3 className="text-xl font-semibold">

              Safe Route Selected

            </h3>

            <p className="mt-2 text-slate-400">

              Safer roads.
              Better lighting.
              Trusted community reports.

            </p>

          </div>

          {/* Destination */}

          <div className="glass relative z-10 flex h-20 w-20 items-center justify-center rounded-full">

            <MapPin className="text-red-400" />

          </div>

          <div className="mt-10 text-center">

            <h3 className="text-xl font-semibold">

              Arrive Confidently

            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}