
'use client';

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import powertrainImages from './images.json';

export default function PowertrainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = powertrainImages.carousel;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia imagen cada 5 segundos

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Banner */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src="/powertrain/foto_banner" // Poner foto banner
          alt="Motor"
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
            Motor & Transmisión
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
                <p className="text-lg text-center text-white italic">
                  "Somos el equipo que vuelve tangible el esfuerzo colectivo de todo el grupo y asumimos esa responsabilidad."
                </p>
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
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      },
                      {
                        mode: "ECO",
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

                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-12 text-center text-white"
          >
            Nuestro <span className="text-[#00A3FF]">Equipo en Acción</span>
          </motion.h2>

          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

              {/* Botones de navegación */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Indicadores de imagen */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-[#00A3FF] w-4' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestro <span className="text-[#00A3FF]">Camino</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primera Etapa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/powertrain/Trabajando en el prototipo.jpeg" 
                  alt="Equipo trabajando en el prototipo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Desarrollo Inicial</h3>
                    <p className="text-gray-300">
                      Nuestro equipo trabajando en las etapas iniciales del diseño y prototipado del sistema de powertrain.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Segunda Etapa */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/powertrain/motor-nuevo.jpg" // Foto piola trabajando en el motor nuevo
                  alt="Nuevo motor CFMOTO"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Adquisición del Motor</h3>
                    <p className="text-gray-300">
                      Un hito importante: la incorporación de nuestro motor CFMOTO 650MT, marcando el comienzo de una nueva era para el equipo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progreso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold text-[#00A3FF]">2023</h4>
                <p className="text-white">Inicio del proyecto</p>
              </div>
              <div className="h-1 w-20 md:w-32 bg-gradient-to-r from-[#00A3FF] to-white/30"></div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-[#00A3FF]">2025</h4>
                <p className="text-white">Adquisición del motor</p>
              </div>
              <div className="h-1 w-20 md:w-32 bg-gradient-to-r from-white/30 to-[#00A3FF]"></div>
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold text-[#00A3FF]">En progreso</h4>
                <p className="text-white">Desarrollo y optimización</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
