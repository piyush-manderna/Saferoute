import { ShieldCheck } from 'lucide-react';

const levelDetails = {
  Excellent: {
    color: 'text-emerald-400',
    bar: 'bg-emerald-500',
    description: 'This route has strong safety signals from the community.',
  },
  Good: {
    color: 'text-emerald-400',
    bar: 'bg-emerald-500',
    description: 'This route is considered a generally safe option.',
  },
  Moderate: {
    color: 'text-amber-300',
    bar: 'bg-amber-400',
    description: 'Stay alert for a few reported safety considerations.',
  },
  Caution: {
    color: 'text-rose-400',
    bar: 'bg-rose-600',
    description: 'Consider another route when a safer option is available.',
  },
};

function SafetyScoreCard({ score, level }) {
  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 100);
  const details = levelDetails[level] ?? levelDetails.Moderate;

  return (
    <section className="rounded-xl border border-white/10 bg-[#0B0F17]/70 p-4" aria-label="Safety score">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Safety score</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-white">{safeScore}</span>
            <span className="text-sm font-bold text-slate-500">/100</span>
          </div>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 ${details.color}`}>
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={safeScore}>
        <div className={`h-full rounded-full transition-all duration-500 ${details.bar}`} style={{ width: `${safeScore}%` }} />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <p className={`text-sm font-bold ${details.color}`}>{level}</p>
        <p className="max-w-[12rem] text-right text-xs font-medium leading-5 text-slate-400">{details.description}</p>
      </div>
    </section>
  );
}

export default SafetyScoreCard;
    