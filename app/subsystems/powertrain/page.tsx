'use client';

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";

export default function PowertrainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src="https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg"
          alt="Powertrain Design"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Motor & Transmisión</h1>
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
                  Nuestro Compromiso con la <span className="text-[#00A3FF]">Excelencia</span>
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
                    Este sector es una de las áreas claves en cualquier equipo de fórmula SAE. Nuestro trabajo está enfocado en el diseño y la optimización del corazón del vehículo.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-lg leading-relaxed"
                  >
                    Nos centramos en garantizar que el motor funcione de manera eficiente, fiable y dentro de los parámetros establecidos por el reglamento de la fórmula SAE.
                  </motion.p>
                </div>

                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Áreas de Enfoque</h3>
                    <ul className="space-y-3 text-gray-300">
                      {[
                        "Selección de unidad de potencia",
                        "Optimización de sistemas de admisión, refrigeración y escape",
                        "Calibración de ECU",
                        "Diseño y fabricación del sistema de transmisión"
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-[#00A3FF] rounded-full"></div>
                          <span>{item}</span>
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

              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Caracteriticas Motor */}
      <section className="py-16 bg-gradient-to-b from-[#1E2A4A] to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl font-bold mb-12 text-center text-white"
            >
              Especificaciones <span className="text-[#00A3FF]">CFMOTO 650MT</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Caracteriticas Principales */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              >
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-xl font-semibold text-[#00A3FF] mb-6"
                >
                  Especificaciones Principales
                </motion.h3>
                <div className="space-y-4">
                  {[
                    { 
                      label: "Tipo de Motor", 
                      value: "Bicilindro en línea, 4T, Refrigeración líquida" 
                    },
                    { label: "Cilindrada", value: "649.3 cc" },
                    { 
                      label: "Potencia Máxima", 
                      value: "45 kW @ 8750 rpm" 
                    },
                    { 
                      label: "Torque Máximo", 
                      value: "56 N.m @ 7000 rpm" 
                    },
                    { label: "Embrague", value: "Multidisco húmedo" }
                  ].map((spec, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                      className="flex justify-between items-center border-b border-white/10 pb-2"
                    >
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="text-white font-medium text-right">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Modo de Potencia */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-6"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                >
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-xl font-semibold text-[#00A3FF] mb-6"
                  >
                    Modos de Potencia
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        mode: "Sport",
                        description: "Máximo rendimiento y respuesta",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      },
                      {
                        mode: "ECO",
                        description: "Eficiencia optimizada",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      }
                    ].map((mode, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                      >
                        <div className="flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-[#00A3FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mode.icon}
                          </svg>
                        </div>
                        <h4 className="text-white text-center font-semibold">{mode.mode}</h4>
                        <p className="text-gray-400 text-sm text-center mt-2">
                          {mode.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="bg-[#00A3FF]/10 rounded-2xl p-6 border border-[#00A3FF]/20"
                >
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
