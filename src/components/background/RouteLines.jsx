import "./routeLines.css";

export default function RouteLines() {
  return (
    <div
      className="route-lines pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="route-svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <defs>

          {/* Main Gradient */}

          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">

            <stop offset="0%" stopColor="#4F8CFF" />

            <stop offset="50%" stopColor="#14F195" />

            <stop offset="100%" stopColor="#4F8CFF" />

          </linearGradient>

          {/* Glow */}

          <filter id="routeGlow">

            <feGaussianBlur stdDeviation="3" result="blur" />

            <feMerge>

              <feMergeNode in="blur" />

              <feMergeNode in="SourceGraphic" />

            </feMerge>

          </filter>

        </defs>

        {/* Route 1 */}

        <path
          className="route route-fast"
          d="M-150 720
             C 250 430,
               600 850,
               1750 240"
        />

        {/* Route 2 */}

        <path
          className="route route-medium"
          d="M-120 500
             C 320 120,
               900 620,
               1750 420"
        />

        {/* Route 3 */}

        <path
          className="route route-slow"
          d="M-100 300
             C 450 760,
               1050 80,
               1800 700"
        />

      </svg>
    </div>
  );
}