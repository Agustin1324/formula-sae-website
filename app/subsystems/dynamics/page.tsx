
'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamicsContent from './dynamics_content.json';
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DynamicsPage() {
  // Add state for selected area
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Banner */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src="/dynamics/banner_dinamica.webp" // Update with actual dynamics banner image
          alt="Dinámica del Vehículo"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Dinámica Vehícular
          </motion.h1>
        </div>
      </div>

      {/* Info Principal*/}
      <section className="py-20 bg-gradient-to-b from-black to-[#1E2A4A]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-32 bg-gradient-to-b from-white/0 to-[#00A3FF]"></div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="flex flex-col items-center text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Optimizando el <span className="text-[#00A3FF]">Rendimiento</span>
                </h2>
                <div className="w-20 h-1 bg-[#00A3FF]"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-gray-300">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-lg leading-relaxed"
                  >
                  El desempeño de un monoplaza en pista depende en gran medida de su comportamiento dinámico. <br>
                  </br>Para optimizar la interacción del vehículo con la superficie y garantizar un manejo eficiente y seguro, trabajamos en cuatro áreas fundamentales.
                  </motion.p>

                </div>

                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Áreas de Desarrollo</h3>
                    {/*Cada item me redirige a su subseccion */}
                    <ul className="space-y-3 text-gray-300">
                      {[
                        { title: "Diseño del Sistema de Suspension", id: "suspension" },
                        { title: "Diseño del Sistema de Frenos", id: "frenos" },
                        { title: "Diseño del Sistema de Dirección", id: "direccion" },
                        { title: "Análisis de Datos en Pista", id: "analisis" },
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                        >
                          <button
                            onClick={() => {
                              const section = document.getElementById(item.id);
                              if (section) {
                                const yOffset = -100; // Adjust this value to account for fixed header if needed
                                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                              }
                            }}
                            className="flex items-center space-x-3 hover:text-[#00A3FF] transition-colors duration-300 w-full text-left"
                          >
                            <div className="w-2 h-2 bg-[#00A3FF] rounded-full"></div>
                            <span>{item.title}</span>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="mt-8 p-6 bg-[#00A3FF]/10 rounded-xl border border-[#00A3FF]/20"
              >
                <p className="text-lg text-center text-white italic">
                  "La excelencia en dinámica vehicular es la clave para destacar en cada prueba de la competencia."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subsecciones */}
      {dynamicsContent.sections.map((section, sectionIndex) => (
        <section 
          key={sectionIndex}
          id={section.title === "Diseño del Sistema de Suspensión" ? "suspension" :
              section.title === "Diseño del Sistema de Frenos" ? "frenos" :
              section.title === "Diseño del Sistema de Dirección" ? "direccion" :
              section.title === "Análisis de Datos en Pista" ? "analisis" : ""}
          className="py-20 bg-gradient-to-b from-[#1E2A4A] to-black"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Header  */}
              <div className="text-center relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-1 h-16 bg-gradient-to-b from-transparent to-[#00A3FF]/50" />
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-white mb-6 inline-block border-b-2 border-[#00A3FF]/30 pb-2"
                >
                  {section.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                >
                  {section.intro}
                </motion.p>
              </div>
              
              {/*Seccion Imagen */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-4xl mx-auto"
              >
                <div className="relative w-full" style={{ paddingTop: 'min(600px, 75%)' }}>
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-contain absolute top-0 left-0 w-full h-full transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                    quality={100}
                  />
                </div>
              </motion.div>

              {/*Area tecnica botones */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-white text-center mb-6">Áreas Técnicas</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {section.mainAreas.map((area, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedArea(selectedArea === area.title ? null : area.title)}
                      className={`
                        px-6 py-4 rounded-xl transition-all duration-300 
                        ${selectedArea === area.title
                          ? 'bg-[#00A3FF] text-white shadow-lg shadow-[#00A3FF]/20 scale-105'
                          : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'}
                        backdrop-blur-sm border border-white/10
                      `}
                    >
                      {area.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Area seleccionada */}
              <AnimatePresence mode="wait">
                {selectedArea && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 shadow-xl"
                  >
                    {section.mainAreas.map((area, index) => (
                      area.title === selectedArea && (
                        <div key={index} className="space-y-6">
                          <h3 className="text-3xl font-semibold text-[#00A3FF] mb-4">
                            {area.title}
                          </h3>
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {area.description}
                          </p>
                          <div className="grid gap-4 mt-8">
                            {area.items.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="flex items-start space-x-4 group"
                              >
                                <div className="w-2 h-2 bg-[#00A3FF] rounded-full mt-2 group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}







