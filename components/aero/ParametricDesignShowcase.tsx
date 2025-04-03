import { motion } from "framer-motion";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export const ParametricDesignShowcase = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-12"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Diseño <span className="text-[#00A3FF]">Paramétrico</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                En nuestro equipo, utilizamos software paramétrico avanzado como herramienta principal para la 
                optimización de componentes aerodinámicos. Esta tecnología de vanguardia nos permite explorar 
                miles de variaciones de diseño de manera eficiente y automatizada.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                A través de la definición de parámetros clave y objetivos específicos, nuestro software genera 
                y evalúa múltiples iteraciones de cada componente, permitiéndonos encontrar la geometría óptima 
                que maximiza el rendimiento aerodinámico según nuestros requerimientos.
              </p>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Ventajas Clave</h3>
                <ul className="space-y-3">
                  {[
                    "Optimización paramétrica avanzada",
                    "Exploración automatizada de diseños",
                    "Integración directa con CFD",
                    "Generación rápida de geometrías",
                    "Análisis de sensibilidad de parámetros"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-[#00A3FF] rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <ImagePlaceholder 
                text="GIF demostrativo de optimización paramétrica"
                height="h-[400px]"
              />
              <p className="text-sm text-gray-400 text-center italic">
                Demostración de optimización paramétrica de un perfil aerodinámico utilizando CAESES
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
