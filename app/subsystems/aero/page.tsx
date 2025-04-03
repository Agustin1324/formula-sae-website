'use client';

import { AeroHeader } from "@/components/aero/AeroHeader";
import { AeroContentSection } from "@/components/aero/AeroContentSection";
import { AeroMainPartsInteractive } from "@/components/aero/AeroMainPartsInteractive";
import { ParametricDesignShowcase } from "@/components/aero/ParametricDesignShowcase";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { motion } from "framer-motion";

export default function AerodynamicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1E2A4A] text-white">
      <AeroHeader />
      <AeroContentSection />
      <AeroMainPartsInteractive />
      <ParametricDesignShowcase />

      {/* Sección de Simulación y Resultados */}
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
                Simulación y <span className="text-[#00A3FF]">Resultados</span>
              </h2>
              <div className="w-20 h-1 bg-[#00A3FF]"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#00A3FF]">
                  Análisis CFD
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Nuestro proceso de diseño se apoya fuertemente en simulaciones CFD (Dinámica de Fluidos Computacional) 
                  para validar y optimizar cada componente aerodinámico. Mediante estas simulaciones, podemos visualizar 
                  y analizar el comportamiento del flujo de aire alrededor del vehículo, identificando áreas de mejora 
                  y verificando el rendimiento de nuestras soluciones.
                </p>
                <ImagePlaceholder 
                  text="Resultado de simulación CFD mostrando líneas de flujo"
                  height="h-[300px]"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#00A3FF]">
                  Validación en Pista
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Los resultados teóricos obtenidos mediante CFD y optimización paramétrica son validados en condiciones 
                  reales de pista. Mediante sensores y pruebas específicas, comparamos el rendimiento real con las 
                  predicciones de nuestras simulaciones, permitiéndonos ajustar y mejorar continuamente nuestros 
                  modelos y diseños.
                </p>
                <ImagePlaceholder 
                  text="Fotos de pruebas en pista y validación de componentes"
                  height="h-[300px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
