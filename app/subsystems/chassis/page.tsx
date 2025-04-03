'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion"; // Import motion

// Importar dinámicamente el visor 3D para asegurar que solo se cargue en el cliente
const ChassisModelViewer = dynamic(
  () => import("@/components/chassis/ChassisModelViewer").then(mod => mod.ChassisModelViewer),
  {
    ssr: false, // Keep SSR false for the 3D viewer
    loading: () => (
      // Update loading style for dark theme
      <div className="h-[400px] bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
        <div className="text-gray-400">Inicializando visualizador 3D...</div>
      </div>
    )
  }
);

export default function ChassisPage() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeButtonSize = windowWidth < 768 ? 'text-4xl' : 'text-2xl';

  return (
    // Apply dark theme background like Dynamics page
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1E2A4A] text-white">
      {/* Redesigned Header/Banner like Dynamics */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src="/chassis/head/chasis.png" // Use the chassis image
          alt="Diseño del Chasis"
          fill
          className="object-contain object-center opacity-40" // Use object-contain and opacity
          priority // Add priority for LCP
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4" // Match Dynamics title style
          >
            Chasis
          </motion.h1>
          {/* Optional: Add a subtitle if needed */}
        </div>
      </div>

      {/* Main Content Section - Apply dark theme styles */}
      {/* Main Content Section - Apply dark theme styles */}
      {/* Wrap content in a styled container like Dynamics */}
      <section className="py-20 px-4"> 
        <div className="max-w-6xl mx-auto">
          {/* Use the styled container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} // Add delay
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-12" // Add spacing
          >
            {/* Section Title Styling */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Diseño Integral del <span className="text-[#00A3FF]">Chasis</span> {/* Use accent color */}
              </h2>
              <div className="w-20 h-1 bg-[#00A3FF]"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-12 items-center"> {/* Add items-center */}
              <div className="space-y-6">
                {/* Update text color */}
                <p className="text-lg text-gray-300 leading-relaxed"> {/* Add leading-relaxed */}
                  El chasis es el esqueleto de nuestro auto, diseñado para cumplir con los más altos requisitos 
                  que exige una competencia tal como la Fórmula SAE. Utilizamos avanzadas técnicas y materiales, 
                con el fin de maximizar el rendimiento del chasis, así como también para fijar una sólida base 
                para el futuro de Fiuba Racing.
                </p>
                {/* Restyle "Puntos Destacados" box */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Puntos Destacados</h3> {/* Style title */}
                  {/* Style list items */}
                  <ul className="space-y-3 text-gray-300"> 
                    {[
                      "Chasis tubular de acero",
                      "Seguridad y performance a la cabeza",
                      "Exhaustivo proceso de iteración de diseño",
                      "Integración de los diferentes sistemas primarios del monoplaza"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }} // Stagger animation
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-[#00A3FF] rounded-full flex-shrink-0"></div> {/* Accent bullet */}
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Ensure 3D viewer container fits dark theme */}
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 bg-black/20"> {/* Remove bg-gray-200, add border/dark bg */}
                <ChassisModelViewer />
              </div>
            </div>
          </motion.div> {/* Close the styled container div */}
        </div>
      </section>

      {/* Assembly Process Section - Apply dark theme styles */}
      {/* Change background and wrap in styled container */}
      <section className="py-20 px-4"> 
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl space-y-12"
          >
            {/* Style section title */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Proceso de <span className="text-[#00A3FF]">Ensamblaje</span>
              </h2>
              <div className="w-20 h-1 bg-[#00A3FF]"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {/* Update text colors */}
                <p className="text-lg text-gray-300 leading-relaxed">
                  El proceso de diseño de una estructura de alta complejidad como lo es el chasis, 
                  comienza con un profundo conocimiento de la normativa impuesta por la asociación correspondiente, 
                  en el presente caso, FSAE International.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Siendo el chasis aquello que contiene al piloto, su seguridad es prioridad, por lo que toda 
                  normativa en cuanto al tópico en cuestión es tratada con la mayor seriedad.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Sumado a ello, la documentación y registro del proceso de diseño es también un pilar en el buen 
                  funcionamiento de todo proyecto ingenieril, sentando las bases para el proceso de desarrollo a porvenir.
                </p>
                {/* Style subheadings and lists */}
                <h3 className="text-xl font-semibold text-[#00A3FF] pt-4">Diseño y Fabricación del Soporte</h3> 
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Diseñado usando Solidworks para modelado 3D preciso",
                    "Fabricado usando una combinación de enrutadores manuales y CNC",
                    "Paneles de madera cortados con especificaciones exactas",
                    "Soporte ensamblado para asegurar alineación y estabilidad perfectas"
                  ].map((item, index) => (
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
                <h3 className="text-xl font-semibold text-[#00A3FF] pt-4">Soldadura del Chasis</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  El chasis se suelda utilizando el proceso MIG (Metal Inert Gas), que proporciona 
                  soldaduras fuertes y de alta calidad, esenciales para la integridad estructural del chasis. 
                  Nuestro equipo de soldadores expertos asegura que cada unión cumpla con los exigentes 
                  estándares requeridos para un chasis de carreras de alto rendimiento.
                </p>
              </div>
              {/* Restyle image container */}
              <div className="relative h-[500px] bg-white/5 rounded-lg overflow-hidden cursor-pointer border border-white/10 group" onClick={() => setIsImageModalOpen(true)}> {/* Add group */}
                <Image
                  src="/chassis/chassis.jpg"
                  alt="Proceso de Ensamblaje del Chasis"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105" // Add hover effect
                />
                {/* Improve hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">Clic para ampliar</span>
                </div>
              </div>
            </div>
          </motion.div> {/* Close styled container */}
        </div>
      </section>

      {/* Especificaciones Técnicas - Apply dark theme */}
      <section className="py-20 px-4"> {/* Adjust padding */}
        <div className="max-w-6xl mx-auto">
          {/* Style section title */}
          <div className="flex flex-col items-center text-center mb-12"> {/* Add margin bottom */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Especificaciones <span className="text-[#00A3FF]">Técnicas</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>
          {/* Restyle cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Propiedades de Material",
                specs: [
                  "Material: Acero 1020",
                  "Resistencia a la Tracción: 395 MPa",
                  "Límite elástico: 295 MPa",
                  "Dureza: 111HB",
                  "Elongación a Fractura: 36,5%"
                ]
              },
              {
                title: "Geometría Elegida",
                specs: [
                  "Tubos sin costura",
                  "Diámetro Exterior 1\"",
                  "Espesores desde 1,5mm a 2,5mm",
                  "Soldadura con MIG"
                ]
              },
              {
                title: "Objetivos de Diseño",
                specs: [
                  "Rigidez Torsional: 3000Nm/°",
                  "Peso Final: 40 a 45 Kg",
                  "Distribución de peso equilibrada",
                  "Comportamiento predecible"
                ]
              }
            ].map((card, index) => (
              // Apply dark theme card style
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl h-full flex flex-col" // Added h-full, flex, flex-col
              >
                <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">{card.title}</h3>
                <ul className="space-y-3 text-gray-300 flex-grow"> {/* Added flex-grow */}
                  {card.specs.map((spec, i) => (
                    <li key={i} className="flex items-start space-x-3"> {/* Use flex for alignment */}
                      <div className="w-2 h-2 bg-[#00A3FF] rounded-full mt-1.5 flex-shrink-0"></div> {/* Adjust alignment */}
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Análisis y Validación - Apply dark theme */}
      <section className="py-20 px-4"> {/* Adjust padding */}
        <div className="max-w-6xl mx-auto">
           {/* Style section title */}
           <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Análisis y Validación de <span className="text-[#00A3FF]">Rendimiento</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF]"></div>
          </div>
          {/* Restyle cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Análisis FEA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl h-full flex flex-col"
            >
              <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Análisis por Elementos Finitos</h3>
              <div className="space-y-4 text-gray-300 flex-grow">
                <p className="leading-relaxed">
                  Un buen entendimiento del comportamiento del chasis puede ser logrado a través de la interpretación 
                  de variados ensayos por elementos finitos, como por ejemplo:
                </p>
                <ul className="space-y-3 pl-1"> {/* Adjust padding */}
                  {[
                    "Impacto frontal, trasero y lateral",
                    "Vuelco",
                    "Torsión",
                    "Comportamiento bajo aceleración, frenada y curva",
                    "Arrastre"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#00A3FF] rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed pt-2"> {/* Add padding top */}
                  En los mismos no sólo se deben aplicar buenas prácticas de ingeniería, sino también un buen 
                  conocimiento en materia de diseño 3D y simulaciones. Las mismas se realizan utilizando Solidworks.
                </p>
              </div>
            </motion.div>
            
            {/* Card 2: Pruebas Físicas */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl h-full flex flex-col"
            >
              <h3 className="text-xl font-semibold text-[#00A3FF] mb-4">Pruebas Físicas</h3>
              <div className="space-y-4 text-gray-300 flex-grow">
                <p className="leading-relaxed">
                  Una vez finalizada la construcción del chasis, se realizan ensayos físicos para validar aquellos 
                  resultados obtenidos a través de FEA, para así lograr un completo conocimiento de la principal 
                  estructura del auto.
                </p>
                <p className="leading-relaxed">
                  Sumado a ello, se verifica el cumplimiento del reglamento extensamente, con el fin de asegurar un 
                  chasis completamente legal para correr en competencias de Fórmula SAE Oficiales.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal - Ensure styles are compatible */}
      {isImageModalOpen && (
        // Keep existing modal style, should work fine on dark background
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsImageModalOpen(false)}>
          <div className="relative w-full h-full max-w-4xl max-h-4xl p-4">
            <div className="relative w-full h-full">
              <Image
                src="/chassis/chassis.jpg"
                alt="Proceso de Ensamblaje del Chasis"
                fill
                className="object-contain"
              />
              <button 
                className={`absolute top-0 right-0 text-white ${closeButtonSize} bg-black bg-opacity-50 w-10 h-10 flex items-center justify-center`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageModalOpen(false);
                }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
