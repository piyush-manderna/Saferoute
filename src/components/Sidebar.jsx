import { useState } from 'react';
import RouteCard from './RouteCard';
import SafeZoneCard from './SafeZoneCard';
import SearchBar from './SearchBar';

const mockRoutes = [
  {
    id: 1,
    name: 'Safest Route',
    duration: '18 mins',
    distance: '4.5 km',
    safetyScore: 91,
    risk: 'Low',
  },
  {
    id: 2,
    name: 'Fastest Route',
    duration: '14 mins',
    distance: '4.1 km',
    safetyScore: 68,
    risk: 'Medium',
  },
  {
    id: 3,
    name: 'Balanced Route',
    duration: '16 mins',
    distance: '4.3 km',
    safetyScore: 79,
    risk: 'Low',
  },
];

const mockSafeZones = [
  { id: 1, name: 'Police Station', distance: '0.4 km' },
  { id: 2, name: 'Hospital', distance: '0.7 km' },
  { id: 3, name: 'Metro Station', distance: '1.1 km' },
];

function SidebarSection({ title, action, children }) {
  const headingId = `${title.toLowerCase().replaceAll(' ', '-')}-heading`;

  return (
    <section aria-labelledby={headingId} className="transition-all duration-200">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2 id={headingId} className="text-xs font-semibold uppercase tracking-wider text-slate-300/90">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Sidebar() {
  const [selectedRouteId, setSelectedRouteId] = useState(mockRoutes[0].id);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedRoute = mockRoutes.find((r) => r.id === selectedRouteId) || mockRoutes[0];

  const getScoreTheme = (score) => {
    if (score >= 85) {
      return {
        color: '#10b981',
        textClass: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        ratingLabel: 'Excellent',
        label: 'High Safety',
        desc: 'Well-lit streets, verified surveillance & safe havens on path.',
      };
    }
    if (score >= 70) {
      return {
        color: '#f59e0b',
        textClass: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        ratingLabel: 'Moderate',
        label: 'Moderate Safety',
        desc: 'Adequate lighting with moderate crowd density.',
      };
    }
    return {
      color: '#f43f5e',
      textClass: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      ratingLabel: 'Caution',
      label: 'Caution Advised',
      desc: 'Lower lighting or isolated sections reported along this route.',
    };
  };

  const scoreTheme = getScoreTheme(selectedRoute.safetyScore);

  return (
    /* 1. Floating Sticky Sidebar (h-fit, top-24) */
    <aside
      className="sticky top-24 h-fit w-full font-['Plus_Jakarta_Sans',system-ui,sans-serif] lg:w-[370px]"
      aria-label="Route planning sidebar"
    >
      {/* 2. Upgraded Glass Container (rounded-[32px], glass) */}
      <div className="glass relative overflow-hidden rounded-[32px] p-6 shadow-2xl">
        {/* 3. Aurora Background Layer Behind Sidebar */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-float absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-400/8 blur-[120px]" />
          <div className="animate-glow absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/8 blur-[140px]" />
        </div>

        {/* 4 & 5. Header with 2xl Title & Premium Copy */}
        <header className="relative mb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live Protection
            </span>

            {hasSearched && (
              <button
                type="button"
                onClick={() => setHasSearched(false)}
                className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
              >
                Reset
              </button>
            )}
          </div>

          <h1 className="mt-2.5 text-2xl font-bold tracking-tight text-white/95">
            Navigate with Confidence
          </h1>
          <p className="mt-1 text-xs font-normal leading-relaxed text-slate-400">
            AI-powered navigation prioritizing safer streets, verified community reports, and nearby safe havens.
          </p>
        </header>

        {/* 6. Main Content Area with Smooth FadeUp Animation */}
        <div className="space-y-6 animate-fadeUp">
          {/* Search Bar Section */}
          <SidebarSection title="Find Safe Route">
            <div
              onClick={() => !hasSearched && setHasSearched(true)}
              className="transition-transform duration-150"
            >
              <SearchBar
                onSearch={() => setHasSearched(true)}
                onSubmit={() => setHasSearched(true)}
              />
            </div>
          </SidebarSection>

          {/* 7. Emotional & Reassuring Empty State */}
          {!hasSearched ? (
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 text-center transition-all duration-300">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <h3 className="mt-3.5 text-sm font-semibold text-white/95">
                Every journey deserves peace of mind.
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Enter your destination and SafeRoute will analyze lighting, community reports, safe zones, and route safety in real time.
              </p>

              {/* Feature Highlights */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-slate-300">
                  ⚡ 90%+ Well-lit paths
                </span>
                <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-slate-300">
                  🏥 24/7 Verified havens
                </span>
                <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-slate-300">
                  👥 Live community reports
                </span>
              </div>

              {/* Interactive Demo Action */}
              <button
                type="button"
                onClick={() => setHasSearched(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 active:scale-[0.98]"
              >
                <span>Preview sample route analysis</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 8. Upgraded Safety Score Card (Score, Excellent, Community Trusted) */}
              <SidebarSection
                title="Safety Score"
                action={
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${scoreTheme.badgeBg}`}>
                    {scoreTheme.label}
                  </span>
                }
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0e1626]/90 to-[#0B0F17]/90 p-4 transition-all duration-300 hover:border-white/15">
                  <div className="flex items-center gap-4">
                    {/* Gauge with Tiered Readout */}
                    <div
                      className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-full p-[3px] shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500"
                      style={{
                        background: `conic-gradient(${scoreTheme.color} 0deg ${(selectedRoute.safetyScore / 100) * 360}deg, rgba(255,255,255,0.07) ${(selectedRoute.safetyScore / 100) * 360}deg 360deg)`,
                      }}
                      aria-label={`Safety score ${selectedRoute.safetyScore} out of 100`}
                    >
                      <div className="grid h-full w-full place-items-center rounded-full bg-[#0B0F17]/95 p-1 text-center">
                        <span className="font-mono text-xl font-bold tracking-tight text-white">
                          {selectedRoute.safetyScore}
                        </span>
                        <span className={`text-[10px] font-semibold leading-none ${scoreTheme.textClass}`}>
                          {scoreTheme.ratingLabel}
                        </span>
                        <span className="block text-[8px] font-medium uppercase tracking-wider text-slate-400">
                          Safety Score
                        </span>
                      </div>
                    </div>

                    {/* Route Details & Community Star Rating */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white/90">
                          {selectedRoute.name}
                        </span>
                        <span className="text-[11px] text-slate-500">•</span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {selectedRoute.risk} Risk
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-normal leading-relaxed text-slate-400">
                        {scoreTheme.desc}
                      </p>

                      {/* Community Trusted Badge */}
                      <div className="mt-2.5 flex items-center gap-1.5 border-t border-white/5 pt-2 text-[11px]">
                        <span className="tracking-widest text-amber-400">★★★★★</span>
                        <span className="text-[11px] font-medium text-slate-300">Community Trusted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarSection>

              {/* 9. Animated Route Recommendations (Staggered fadeUp) */}
              <SidebarSection
                title="Route Recommendations"
                action={
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    {mockRoutes.length} options
                  </span>
                }
              >
                <div className="space-y-3" aria-label="Recommended routes">
                  {mockRoutes.map((route, index) => (
                    <div
                      key={route.id}
                      style={{ animationDelay: `${index * 90}ms` }}
                      className="animate-fadeUp"
                    >
                      <RouteCard
                        route={route}
                        selected={route.id === selectedRouteId}
                        onSelect={setSelectedRouteId}
                      />
                    </div>
                  ))}
                </div>
              </SidebarSection>

              {/* 10. Upgraded Safe Zone Section with Helper Description */}
              <SidebarSection
                title="Nearby Safe Zones"
                action={
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-400">
                    {mockSafeZones.length} havens
                  </span>
                }
              >
                <p className="mb-3 text-xs text-slate-400">
                  Verified shelters and emergency locations nearby.
                </p>
                <div className="space-y-2">
                  {mockSafeZones.map((zone) => (
                    <SafeZoneCard key={zone.id} zone={zone} />
                  ))}
                </div>
              </SidebarSection>
            </div>
          )}
        </div>

        {/* 11. Premium Shimmering Emergency Button */}
        <button
          type="button"
          className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff4d6d] via-[#ff3f61] to-[#ff2e5b] px-4 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_25px_-4px_rgba(255,63,97,0.5)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_12px_30px_-4px_rgba(255,63,97,0.65)] active:translate-y-0 active:scale-[0.99] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:transition hover:before:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]"
        >
          {/* Specular Top Edge Light */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />

          <svg
            className="h-4 w-4 text-rose-100 transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Report Unsafe Activity</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;