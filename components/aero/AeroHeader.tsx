import Image from "next/image";
import { motion } from "framer-motion";

export const AeroHeader = () => {
  return (
    <div className="relative h-[55vh] md:h-[60vh] bg-black">
      <Image
        src="/aero/head/aero_portrait.png"
        alt="Diseño Aerodinámico"
        fill
        className="object-contain object-center opacity-80 scale-[2] md:scale-100"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Aerodinámica
        </motion.h1>
      </div>
    </div>
  );
};
