import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const aeroComponents = [
  {
    title: "Alerón Delantero",
    description: `El alerón delantero es el primer elemento que interactúa con el flujo de aire. 
    Su diseño no solo genera carga aerodinámica directa, sino que también condiciona el flujo de aire 
    que llegará al resto del monoplaza. Optimizamos su geometría para maximizar el downforce mientras 
    minimizamos la resistencia al avance.`,
    image: "/aero/componentes/front_wing.webp"
  },
  {
    title: "Nariz",
    description: `La nariz cumple un rol dual: aerodinámica y seguridad. Su diseño canaliza el aire 
    hacia las diferentes zonas del vehículo, mientras su estructura cumple con los rigurosos requisitos 
    de seguridad de FSAE. Trabajamos en conjunto con el área de Chasis para lograr el balance perfecto 
    entre eficiencia y seguridad.`,
    image: "/aero/componentes/nose.webp"
  },
  {
    title: "Piso y Difusor",
    description: `El conjunto piso-difusor es fundamental para el rendimiento aerodinámico. El piso genera 
    carga aerodinámica mediante el efecto suelo, mientras el difusor gestiona la salida del aire, minimizando 
    la resistencia. Este sistema integrado es clave para lograr alta adherencia manteniendo la eficiencia 
    general del paquete aerodinámico.`,
    image: "/aero/componentes/diffuser.webp"
  },
  {
    title: "Alerón Trasero",
    description: `El alerón trasero es el mayor generador de carga aerodinámica directa. Su diseño está 
    optimizado para las velocidades típicas de competencia FSAE, buscando el balance ideal entre downforce 
    y resistencia al avance. Su configuración es crucial para el comportamiento general del monoplaza.`,
    image: "/aero/componentes/rear_wing.webp"
  }
];

export const AeroMainPartsInteractive = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>("Alerón Delantero");

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
              Componentes <span className="text-[#00A3FF]">Aerodinámicos</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {aeroComponents.map((component, index) => (
              <Button
                key={index}
                onClick={() => setSelectedComponent(selectedComponent === component.title ? null : component.title)}
                className={`
                  px-6 py-4 rounded-xl transition-all duration-300 
                  ${selectedComponent === component.title
                    ? 'bg-[#00A3FF] text-white shadow-lg shadow-[#00A3FF]/20 scale-105'
                    : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'}
                  backdrop-blur-sm border border-white/10
                `}
              >
                {component.title}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedComponent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {aeroComponents.map((component, index) => (
                  component.title === selectedComponent && (
                    <motion.div
                      key={index}
                      className="space-y-6 col-span-2"
                    >
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col justify-center h-full">
                          <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">
                            {component.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {component.description}
                          </p>
                        </div>
                        <div className="relative h-[250px] md:h-[400px] rounded-lg overflow-hidden border border-white/10">
                          <Image
                            src={component.image}
                            alt={component.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
