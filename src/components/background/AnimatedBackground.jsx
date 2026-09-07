import Aurora from "./Aurora";
import CursorGlow from "./CursorGlow";
import FloatingParticles from "./FloatingParticles";
import LightBeams from "./LightBeams";
// import GridOverlay from "./GridOverlay";
// import RouteLines from "./RouteLines";
// import RadarPulse from "./RadarPulse";
// import AmbientFog from "./AmbientFog";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
     <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(180deg,#040507 0%,#06080D 45%,#040507 100%)",
  }}
/>

<div
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(circle at 20% 25%, rgba(20,241,149,.04), transparent 32%),
      radial-gradient(circle at 80% 18%, rgba(79,140,255,.03), transparent 35%),
      radial-gradient(circle at 50% 75%, rgba(255,255,255,.02), transparent 45%)
    `,
  }}
/>

      <Aurora />

      <LightBeams />

      <FloatingParticles />

      <CursorGlow />

      {/* Phase 2 */}
      {/* <GridOverlay /> */}

      {/* Phase 3 */}
      {/* <RouteLines /> */}

      {/* Phase 4 */}
      {/* <RadarPulse /> */}

      {/* Phase 5 */}
      {/* <AmbientFog /> */}
    </div>
  );
}