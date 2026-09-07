import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import HeroVisual from "../hero/HeroVisual";

export default function ExpandableMapPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Small Card */}

      <motion.div
        layoutId="route-card"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <HeroVisual />
      </motion.div>

      {/* Expanded */}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              layoutId="route-card"
              className="
                fixed
                left-1/2
                top-1/2
                z-[100]
                h-[82vh]
                w-[90vw]
                max-w-7xl
                -translate-x-1/2
                -translate-y-1/2
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-[#0A0E17]
              "
            >
              {/* Close */}

              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  right-6
                  top-6
                  z-50
                  rounded-full
                  bg-white/10
                  p-3
                  hover:bg-white/20
                "
              >
                <X />
              </button>

              {/* Temporary */}

              <div className="flex h-full items-center justify-center">

                <h1 className="text-4xl font-bold text-white">
                  Mapbox goes here
                </h1>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}