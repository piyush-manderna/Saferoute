export default function FloatingParticles() {

 const particles = Array.from({ length: 18 });

  return (

    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >

      {particles.map((_, index) => {

        const size = Math.random() * 2 + 1.5;

        const left = Math.random() * 100;

        const top = Math.random() * 100;

        const duration = 10 + Math.random() * 12;

        const delay = Math.random() * 12;

       const opacity = 0.25 + Math.random() * 0.20;
       
const colors = [
"#FFFFFF",
"#BFEFFF",
"#14F195",
"#D8FFFF",
];

        const color =
          colors[Math.floor(Math.random() * colors.length)];

        return (

          <span
            key={index}
            className="particle"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              background: color,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />

        );

      })}

    </div>

  );

}