'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Importar dinámicamente el visor 3D para asegurar que solo se cargue en el cliente
const ChassisModelViewer = dynamic(
  () => import("@/components/chassis/ChassisModelViewer").then(mod => mod.ChassisModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-600">Inicializando visualizador 3D...</div>
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[50vh] bg-gray-200">
        <Image
          src="/chassis/head/chasis.png"
          alt="Diseño del Chasis"
          fill
          className="object-contain object-center"
        />
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Chasis</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Diseño Integral del Chasis</h2>
              <p className="text-lg text-gray-700">
                El chasis es el esqueleto de nuestro auto, diseñado para cumplir con los más altos requisitos 
                que exige una competencia tal como la Fórmula SAE. Utilizamos avanzadas técnicas y materiales, 
                con el fin de maximizar el rendimiento del chasis, así como también para fijar una sólida base 
                para el futuro de Fiuba Racing.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Puntos Destacados</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Chasis tubular de acero</li>
                  <li>• Seguridad y performance a la cabeza</li>
                  <li>• Exhaustivo proceso de iteración de diseño</li>
                  <li>• Integración de los diferentes sistemas primarios del monoplaza</li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <ChassisModelViewer />
            </div>
          </div>
        </div>
      </section>

      {/* Assembly Process Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Proceso de Ensamblaje</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                El proceso de diseño de una estructura de alta complejidad como lo es el chasis, 
                comienza con un profundo conocimiento de la normativa impuesta por la asociación correspondiente, 
                en el presente caso, FSAE International.
              </p>
              <p className="text-lg text-gray-700">
                Siendo el chasis aquello que contiene al piloto, su seguridad es prioridad, por lo que toda 
                normativa en cuanto al tópico en cuestión es tratada con la mayor seriedad.
              </p>
              <p className="text-lg text-gray-700">
                Sumado a ello, la documentación y registro del proceso de diseño es también un pilar en el buen 
                funcionamiento de todo proyecto ingenieril, sentando las bases para el proceso de desarrollo a porvenir.
              </p>
              <h3 className="text-xl font-bold text-gray-800">Diseño y Fabricación del Soporte</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Diseñado usando Solidworks para modelado 3D preciso</li>
                <li>Fabricado usando una combinación de enrutadores manuales y CNC</li>
                <li>Paneles de madera cortados con especificaciones exactas</li>
                <li>Soporte ensamblado para asegurar alineación y estabilidad perfectas</li>
              </ul>
              <h3 className="text-xl font-bold text-gray-800">Soldadura del Chasis</h3>
              <p className="text-lg text-gray-700">
                El chasis se suelda utilizando el proceso MIG (Metal Inert Gas), que proporciona 
                soldaduras fuertes y de alta calidad, esenciales para la integridad estructural del chasis. 
                Nuestro equipo de soldadores expertos asegura que cada unión cumpla con los exigentes 
                estándares requeridos para un chasis de carreras de alto rendimiento.
              </p>
            </div>
            <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
              <Image
                src="/chassis/chassis.jpg"
                alt="Proceso de Ensamblaje del Chasis"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">Clic para ampliar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Especificaciones Técnicas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Especificaciones Técnicas</h2>
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
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  {section.specs.map((spec, i) => (
                    <li key={i}>• {spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Análisis y Validación */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Análisis y Validación de Rendimiento</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Análisis por Elementos Finitos</h3>
                <p className="text-gray-700">
                  Un buen entendimiento del comportamiento del chasis puede ser logrado a través de la interpretación 
                  de variados ensayos por elementos finitos, como por ejemplo:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                  <li>Impacto frontal, trasero y lateral</li>
                  <li>Vuelco</li>
                  <li>Torsión</li>
                  <li>Comportamiento bajo aceleración, frenada y curva</li>
                  <li>Arrastre</li>
                </ul>
                <p className="mt-4 text-gray-700">
                  En los mismos no sólo se deben aplicar buenas prácticas de ingeniería, sino también un buen 
                  conocimiento en materia de diseño 3D y simulaciones. Las mismas se realizan utilizando Solidworks.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pruebas Físicas</h3>
                <p className="text-gray-700">
                  Una vez finalizada la construcción del chasis, se realizan ensayos físicos para validar aquellos 
                  resultados obtenidos a través de FEA, para así lograr un completo conocimiento de la principal 
                  estructura del auto.
                </p>
                <p className="mt-4 text-gray-700">
                  Sumado a ello, se verifica el cumplimiento del reglamento extensamente, con el fin de asegurar un 
                  chasis completamente legal para correr en competencias de Fórmula SAE Oficiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isImageModalOpen && (
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
