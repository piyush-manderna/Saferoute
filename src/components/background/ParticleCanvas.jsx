import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 90;

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let animation;

    const mouse = {
      x: 0,
      y: 0,
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();

    window.addEventListener("resize", resize);

    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,

        radius: Math.random() * 2 + 1,

        alpha: Math.random() * 0.45 + 0.2,

        color:
          Math.random() > 0.5
            ? "20,241,149"
            : "79,140,255",
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        let offsetX = 0;
        let offsetY = 0;

        if (dist < 180) {
          offsetX = -dx * 0.02;
          offsetY = -dy * 0.02;
        }

        ctx.beginPath();

        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;

        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${p.color},.8)`;

        ctx.arc(
          p.x + offsetX,
          p.y + offsetY,
          p.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      animation = requestAnimationFrame(animate);
    }

    animate();

    function move(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    window.addEventListener("mousemove", move);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
}