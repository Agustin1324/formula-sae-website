
'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function ElectronicsPage() {
  const parametros = [
    "Velocidad",
    "Aceleración",
    "Fuerza G",
    "Temperatura de neumático",
    "Presión de neumático",
    "Deformación del chasis",
    "Presión de frenos",
    "Posición del acelerador",
    "Posición del volante",
    "Temperatura del agua",
    "Fuerza en la suspensión",
    "Deformación de las parrillas",
    "Nivel de combustible"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src="/electronics/banner_electronica.jpg"
          alt="Electrónica"
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
            Electrónica
          </motion.h1>
        </div>
      </div>

      {/* Frase */}
      <section className="relative py-12 bg-black">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light">
            <span className="text-white">El cerebro que impulsa nuestro </span>
            <span className="text-[#00A3FF] font-normal">rendimiento en la pista</span>
          </h2>
        </motion.div>
      </section>

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
                  Sistema <span className="text-[#00A3FF]">Electrónico</span>
                </h2>
                <div className="w-20 h-1 bg-[#00A3FF]"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-gray-300 space-y-4">
                  <p>
                    La electrónica es un componente fundamental en el rendimiento del vehículo, 
                    ya que permite optimizar tanto el desempeño mecánico como la interacción 
                    del piloto con el auto.
                  </p>
                  <p>
                    A través de nuestros sistemas de control y monitoreo, podemos obtener datos 
                    precisos en tiempo real para maximizar el rendimiento en pista.
                  </p>
                </div>

                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  <Image
                    src="/electronics/img.electro.jpg"
                    alt="Sistema Electrónico"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ECU seccion */}
      <section className="py-20 bg-gradient-to-b from-[#1E2A4A] to-black">
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
                  ECU: <span className="text-[#00A3FF]">El Cerebro del Rendimiento</span>
                </h2>
                <div className="w-20 h-1 bg-[#00A3FF]"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-gray-300">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#00A3FF] to-transparent"></div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-6"
                    >
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#00A3FF]/50 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#00A3FF] mb-4 flex items-center">
                          <span className="inline-block w-8 h-8 mr-3 rounded-lg bg-[#00A3FF]/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00A3FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </span>
                          Descripción y Función
                        </h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-4 leading-relaxed"
                        >
                          La ECU (Unidad de Control del Motor) es el verdadero cerebro del auto de competición. 
                          A partir de datos en tiempo real provenientes de sensores clave, la ECU optimiza cada 
                          detalle del desempeño del motor.
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="leading-relaxed bg-gradient-to-r from-[#00A3FF]/10 to-transparent p-4 rounded-lg"
                        >
                          Ajusta el encendido, regula la inyección de combustible y adapta la respuesta del motor 
                          a cada situación, logrando la máxima eficiencia y potencia en pista. Tecnología de 
                          precisión para un rendimiento sin límites.
                        </motion.p>
                      </div>

                      <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-[#00A3FF]/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="text-xl font-semibold text-[#00A3FF] mb-4 flex items-center">
                          <span className="inline-block w-8 h-8 mr-3 rounded-lg bg-[#00A3FF]/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00A3FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </span>
                          Sensores Principales
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "Posición del cigüeñal (CKP)",
                            "Temperatura del refrigerante",
                            "Sonda lambda",
                            "Presión del colector (MAP)"
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + (index * 0.1) }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-[#00A3FF] rounded-full"></div>
                              <span className="text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  <Image
                    src="/electronics/arduino_mega2560.png"
                    alt="ECU - Unidad de Control del Motor"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adquisición de Datos Section */}
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
                  Adquisición de <span className="text-[#00A3FF]">Datos</span>
                </h2>
                <div className="w-20 h-1 bg-[#00A3FF]"></div>
              </div>

              <div className="flex flex-col items-center space-y-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-lg leading-relaxed text-gray-300 text-center max-w-2xl"
                >
                  Capturamos y analizamos datos en tiempo real para optimizar cada aspecto 
                  del rendimiento del vehículo, permitiendo ajustes precisos y mejoras 
                  estratégicas continuas.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Parámetros Monitoreados en Tiempo Real</h3>
                  <ul className="grid grid-cols-2 gap-3 text-gray-300">
                    {[
                      "Velocidad",
                      "Aceleración",
                      "Fuerza G",
                      "Temperatura de neumático",
                      "Presión de neumático",
                      "Deformación del chasis",
                      "Presión de frenos",
                      "Posición del acelerador",
                      "Posición del volante",
                      "Temperatura del agua",
                      "Fuerza en la suspensión",
                      "Deformación de las parrillas",
                      "Nivel de combustible"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
