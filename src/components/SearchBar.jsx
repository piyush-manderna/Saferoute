import { useState } from 'react';
import { ArrowDownUp, MapPin, Navigation } from 'lucide-react';

function SearchBar({ onSearch, onSubmit, ...props }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const swapLocations = () => {
    setIsSwapped((prev) => !prev);
    setSource(destination);
    setDestination(source);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!source && !destination) return;

    setIsLoading(true);

    // Call external handlers if provided by parent
    onSearch?.({ source, destination });
    onSubmit?.({ source, destination });

    // Graceful loading reset for pure UI feel
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const handleUseCurrentLocation = () => {
    setSource('Current Location');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3.5"
      aria-label="Find a safe route"
      {...props}
    >
      {/* Unified Floating Input Container with Route Connectors */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0B0F17]/80 p-2.5 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/15">
        {/* Visual Route Connector Line */}
        <div
          className="pointer-events-none absolute left-[26px] top-[34px] z-0 h-[52px] w-[1.5px] bg-gradient-to-b from-emerald-500/60 via-slate-600/40 to-rose-500/60"
          aria-hidden="true"
        />

        {/* Source Field */}
        <div className="group/field relative z-10 rounded-xl p-1.5 transition-all duration-200 focus-within:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {/* Origin Pin with Pulse */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-focus-within/field:border-emerald-400 group-focus-within/field:bg-emerald-500/20 group-focus-within/field:shadow-[0_0_12px_rgba(16,185,129,0.35)]">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <MapPin className="h-4 w-4 transition-transform duration-200 group-focus-within/field:scale-110" aria-hidden="true" />
            </div>

            {/* Input & Label */}
            <div className="min-w-0 flex-1">
              <label
                htmlFor="route-source"
                className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition-colors group-focus-within/field:text-emerald-400"
              >
                Starting Point
              </label>
              <input
                id="route-source"
                type="text"
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Where are you starting from?"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500/90 transition-colors"
                autoComplete="off"
              />
            </div>

            {/* Quick "Current" Pill (appears when empty) */}
            {!source && (
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="hidden shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-slate-300 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 sm:inline-block"
              >
                Current
              </button>
            )}
          </div>
        </div>

        {/* Divider with Floating Centered Swap Button */}
        <div className="relative my-1 flex items-center justify-center">
          <div className="h-px w-full bg-white/[0.05]" />
          <button
            type="button"
            onClick={swapLocations}
            className="group absolute z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#121927] text-slate-400 shadow-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Swap starting point and destination"
          >
            <ArrowDownUp
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isSwapped ? 'rotate-180 text-emerald-400' : 'rotate-0'
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Destination Field */}
        <div className="group/field relative z-10 rounded-xl p-1.5 transition-all duration-200 focus-within:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {/* Destination Pin */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 transition-all duration-300 group-focus-within/field:border-rose-400 group-focus-within/field:bg-rose-500/20 group-focus-within/field:shadow-[0_0_12px_rgba(244,63,94,0.35)]">
              <MapPin className="h-4 w-4 transition-transform duration-200 group-focus-within/field:scale-110" aria-hidden="true" />
            </div>

            {/* Input & Label */}
            <div className="min-w-0 flex-1">
              <label
                htmlFor="route-destination"
                className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition-colors group-focus-within/field:text-rose-400"
              >
                Safe Destination
              </label>
              <input
                id="route-destination"
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Where do you want to go safely?"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500/90 transition-colors"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Search / Action Button with Loading-Ready State */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-[0_4px_20px_-2px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-300 hover:shadow-[0_6px_25px_-2px_rgba(16,185,129,0.5)] active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]"
      >
        {/* Specular Light Reflection Stroke */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          aria-hidden="true"
        />

        {isLoading ? (
          /* Loading Animation State */
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-slate-950"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Analyzing Safest Paths...</span>
          </div>
        ) : (
          /* Normal State */
          <>
            <Navigation
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            <span>Find Safe Route</span>
          </>
        )}
      </button>
    </form>
  );
}

export default SearchBar;