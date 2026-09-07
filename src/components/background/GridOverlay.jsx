import "./gridOverlay.css";

export default function GridOverlay() {
  return (
    <div
      className="grid-overlay pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Perspective Grid */}
      <div className="grid-perspective" />

      {/* Soft Center Highlight */}
      <div className="grid-highlight" />

      {/* Vignette */}
      <div className="grid-vignette" />
    </div>
  );
}