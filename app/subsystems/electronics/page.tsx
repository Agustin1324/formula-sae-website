
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ElectronicPage() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl"
          >
            El cerebro que impulsa nuestro rendimiento en la pista
          </motion.p>
        </div>
      </div>

      {/* Sistema Electrónico  */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#1E2A4A] leading-tight">
                Sistema Electrónico 
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                La electrónica es un componente fundamental en el rendimiento del vehículo, 
                ya que permite optimizar tanto el desempeño mecánico como la interacción 
                del piloto con el auto.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                A través de sistemas avanzados de control, adquisición de datos y comunicación 
                entre componentes, se logra una gestión eficiente del motor, la transmisión y 
                otros subsistemas clave. Esto no solo maximiza la potencia y la fiabilidad, 
                sino que también proporciona al piloto información en tiempo real para mejorar 
                su rendimiento en pista.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/electronics/img.electro.jpg"
                alt="Electronics System"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ECU  */}
      <section className="py-24 px-4 bg-[#1E2A4A]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <Image
                src="/electronics/arduino_mega2560.png"
                alt="ECU System"
                fill
                className="object-contain p-8 bg-white"
                quality={100}
              />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl font-bold text-white leading-tight">
                ECU: El Cerebro del <span className="text-[#7EB2DD]">Rendimiento</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <div className="bg-black/20 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-2xl font-semibold text-[#7EB2DD] mb-4">
                    Descripción y Función
                  </h3>
                  <p className="mb-4">
                    La ECU (Unidad de Control del Motor) es el verdadero cerebro del auto de competición. 
                    A partir de datos en tiempo real provenientes de sensores clave, como el CKP (posición del cigüeñal), 
                    temperatura del refrigerante, sonda lambda y MAP (presión del colector), la ECU optimiza cada detalle 
                    del desempeño del motor.
                  </p>
                  <p>
                    Ajusta el encendido, regula la inyección de combustible y adapta la respuesta del motor a cada situación, 
                    logrando la máxima eficiencia y potencia en pista. Tecnología de precisión para un rendimiento sin límites.
                  </p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold text-[#7EB2DD] mb-4">
                    Sensores Principales
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#7EB2DD] rounded-full"></div>
                      <span>Posición del cigüeñal (CKP)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#7EB2DD] rounded-full"></div>
                      <span>Temperatura del refrigerante</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#7EB2DD] rounded-full"></div>
                      <span>Sonda lambda</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#7EB2DD] rounded-full"></div>
                      <span>Presión del colector (MAP)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adquisición de datos  */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E2A4A] mb-6">
              Adquisición de <span className="text-[#7EB2DD]">Datos</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Capturamos y analizamos datos en tiempo real para optimizar cada aspecto 
              del rendimiento del vehículo, permitiendo ajustes precisos y mejoras 
              estratégicas continuas.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-[#1E2A4A] text-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold">
                  Parámetros Monitoreados en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parametros.map((parametro, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-[#7EB2DD]/10 transition-colors duration-300"
                    >
                      <div className="w-3 h-3 bg-[#7EB2DD] rounded-full"></div>
                      <p className="text-lg text-[#1E2A4A] font-medium">{parametro}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
