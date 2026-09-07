import { Clock3, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

const riskConfig = {
  Low: {
    badge: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400',
    dot: 'bg-emerald-400',
    bar: 'bg-emerald-400',
  },
  Medium: {
    badge: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
    dot: 'bg-amber-400',
    bar: 'bg-amber-400',
  },
  High: {
    badge: 'border-rose-500/25 bg-rose-500/10 text-rose-400',
    dot: 'bg-rose-400',
    bar: 'bg-rose-500',
  },
};

function RouteCard({ route, selected, onSelect }) {
  const isRecommended =
    route.name.toLowerCase().includes('safe') || route.safetyScore >= 90;
  const risk = riskConfig[route.risk] ?? riskConfig.Low;

  return (
    <button
      type="button"
      onClick={() => onSelect(route.id)}
      aria-pressed={selected}
      aria-label={`${route.name}: ${route.duration}, ${route.distance}, safety score ${route.safetyScore} of 100, ${route.risk} risk`}
      className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17] active:scale-[0.99] ${
        selected
          ? 'border-emerald-500/60 bg-gradient-to-br from-emerald-950/30 via-[#0e1726]/90 to-[#0B0F17]/95 shadow-[0_0_25px_-2px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/30 -translate-y-0.5'
          : 'border-white/[0.08] bg-[#0c1220]/70 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#111a2e]/80 hover:shadow-lg hover:shadow-black/30'
      }`}
    >
      {/* Specular Edge Highlight Stroke */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      {/* Selected Left Accent Indicator Bar */}
      {selected && (
        <div
          className="pointer-events-none absolute inset-y-2.5 left-0 w-1 rounded-r-full bg-emerald-400 shadow-[0_0_10px_#10b981]"
          aria-hidden="true"
        />
      )}

      {/* Header Row: Title, Recommended Pill, and Risk Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300">
            {route.name}
          </p>
          {isRecommended && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="h-2.5 w-2.5 text-emerald-400" aria-hidden="true" />
              Safest
            </span>
          )}
        </div>

        {/* Risk Badge with Glowing Status Indicator */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${risk.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${risk.dot}`} />
          {route.risk} Risk
        </span>
      </div>

      {/* Metrics Row: ETA & Distance (Apple Maps / Uber Style) */}
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-base font-bold tracking-tight text-white">
          {route.duration}
        </span>
        <span className="text-xs font-medium text-slate-400">
          • {route.distance}
        </span>
      </div>

      {/* Safety Score Meter (Progress Bar & Readout) */}
      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck
              className={`h-3.5 w-3.5 ${
                route.safetyScore >= 85 ? 'text-emerald-400' : 'text-slate-400'
              }`}
              aria-hidden="true"
            />
            <span>Safety Rating</span>
          </span>
          <span className="font-mono font-bold text-white">
            <span className={route.safetyScore >= 85 ? 'text-emerald-400' : 'text-slate-200'}>
              {route.safetyScore}
            </span>
            <span className="text-[10px] text-slate-500">/100</span>
          </span>
        </div>

        {/* Micro Score Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${risk.bar}`}
            style={{ width: `${route.safetyScore}%` }}
          />
        </div>
      </div>
    </button>
  );
}

export default RouteCard;