import { Search, ArrowRight } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">

      <div className="
        flex
        items-center
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        px-5
        py-4
        shadow-2xl
      ">

        <Search
          className="mr-3 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Where do you want to go?"
          className="
            flex-1
            bg-transparent
            outline-none
            text-white
            placeholder:text-slate-500
          "
        />

        <button
          className="
            ml-3
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-400
            px-5
            py-3
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Find Route

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}