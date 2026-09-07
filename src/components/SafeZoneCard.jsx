import { Building2, ChevronRight, Hospital, Pill, ShieldCheck, TrainFront } from 'lucide-react';

const zoneConfig = {
  'Police Station': {
    icon: Building2,
    category: 'Emergency Shelter',
    badge: '24/7 Staffed',
    accentColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/25',
    glow: 'group-hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]',
  },
  Hospital: {
    icon: Hospital,
    category: 'Medical Haven',
    badge: 'Open 24/7',
    accentColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/25',
    glow: 'group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]',
  },
  'Metro Station': {
    icon: TrainFront,
    category: 'Transit Hub',
    badge: 'CCTV Monitored',
    accentColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/25',
    glow: 'group-hover:shadow-[0_0_16px_rgba(99,102,241,0.3)]',
  },
  '24x7 Pharmacy': {
    icon: Pill,
    category: 'Open Store',
    badge: 'Well-Lit Haven',
    accentColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/25',
    glow: 'group-hover:shadow-[0_0_16px_rgba(20,184,166,0.3)]',
  },
};

const defaultConfig = {
  icon: Building2,
  category: 'Verified Safe Place',
  badge: 'Safe Haven',
  accentColor: 'text-emerald-400',
  iconBg: 'bg-emerald-500/10 border-emerald-500/25',
  glow: 'group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]',
};

function SafeZoneCard({ zone }) {
  const config = zoneConfig[zone.name] ?? defaultConfig;
  const Icon = config.icon;

  return (
    <article
      aria-label={`${zone.name}, ${config.category}, ${zone.distance} away`}
      className="group relative flex cursor-pointer items-center gap-3.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1220]/75 p-3.5 shadow-md shadow-black/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#11192a]/90 hover:shadow-lg hover:shadow-black/40 active:translate-y-0 active:scale-[0.99]"
    >
      {/* Top Specular Edge Highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      {/* Category Icon with Ambient Glow */}
      <div
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${config.iconBg} ${config.accentColor} ${config.glow} transition-all duration-300 group-hover:scale-105`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Place Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-bold tracking-tight text-white transition-colors group-hover:text-slate-100">
            {zone.name}
          </h3>
          <ShieldCheck
            className="h-3.5 w-3.5 shrink-0 text-emerald-400"
            aria-label="Verified safe haven"
          />
        </div>

        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="font-medium text-slate-300">{config.category}</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-400">{config.badge}</span>
        </div>
      </div>

      {/* Distance Metric & Directional Cue (Google Maps Style) */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <div className="text-right">
          <span className="font-mono text-xs font-bold tabular-nums text-white">
            {zone.distance}
          </span>
          <span className="block text-[10px] font-medium text-emerald-400">
            away
          </span>
        </div>
        <ChevronRight
          className="h-4 w-4 text-slate-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-300"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

export default SafeZoneCard;