import {
  Users,
  ShieldCheck,
  MapPinned,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community Reports",
    description:
      "Receive updates shared by nearby users about unsafe locations, suspicious activity and road conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Safe Zones",
    description:
      "Locate police stations, hospitals, public facilities and trusted safe spaces during your journey.",
  },
  {
    icon: MapPinned,
    title: "Safer Routes",
    description:
      "Choose routes based on safety scores instead of only the shortest travel time.",
  },
];

export default function WhySafeRoute() {
  return (
    <section className="relative py-40">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
            WHY SAFEROUTE
          </p>

          <h2 className="mt-5 text-5xl font-bold text-white">
            Maps show directions.
            <br />
            We show confidence.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-400">
            SafeRoute focuses on helping women make informed travel decisions
            by combining community updates, verified locations and safety
            insights into every journey.
          </p>

        </div>

        {/* Features */}

        <div className="mt-28 grid gap-16 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group"
            >
              <div
                className="
                  mb-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  transition-all
                  duration-300
                  group-hover:border-emerald-400/30
                  group-hover:bg-white/8
                "
              >
                <feature.icon
                  className="text-emerald-300"
                  size={28}
                />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-400">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}