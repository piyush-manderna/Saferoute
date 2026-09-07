export default function AmbientFog() {
  return (
    <>
      <div
        className="
        absolute
        -bottom-60
        left-[-15%]
        h-[600px]
        w-[700px]
        rounded-full
        bg-emerald-400/5
        blur-[180px]
        animate-float-slow
        "
      />

      <div
        className="
        absolute
        top-[18%]
        right-[-10%]
        h-[650px]
        w-[650px]
        rounded-full
        bg-blue-500/5
        blur-[200px]
        animate-float-medium
        "
      />

      <div
        className="
        absolute
        left-[25%]
        top-[45%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-violet-500/4
        blur-[170px]
        animate-float-fast
        "
      />
    </>
  );
}