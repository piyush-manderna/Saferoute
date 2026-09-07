import "./aurora.css";
import useMouseParallax from "./useMouseParallax";

export default function Aurora() {
  const { x, y } = useMouseParallax(35);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        willChange: "transform",
      }}
    >
      <div className="aurora aurora-one" />

      <div className="aurora aurora-two" />

      <div className="aurora aurora-three" />

      <div className="aurora-center" />

      <div className="aurora-top" />

      <div className="aurora-middle" />

      <div className="aurora-bottom" />
    </div>
  );
}