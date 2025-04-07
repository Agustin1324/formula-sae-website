import { motion } from "framer-motion";

export const AeroKeyPoints = () => {
  const keyPoints = [
    "Diseño avanzado de alerones y difusores",
    "Simulaciones CFD (Dinámica de Fluidos Computacional)",
    "Optimización de downforce y drag",
    "Validación experimental y pruebas en pista"
  ];

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Puntos Destacados</h3>
      <ul className="space-y-3 text-gray-300">
        {keyPoints.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-2 h-2 bg-[#00A3FF] rounded-full flex-shrink-0"></div>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
