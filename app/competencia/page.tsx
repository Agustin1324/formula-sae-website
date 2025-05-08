'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { GiTrophyCup } from 'react-icons/gi';
import { IoRocketSharp } from 'react-icons/io5';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
);

export default function CompetitionPage() {
  const staticEventsData = {
    labels: ['Diseño', 'Análisis de Costos', 'Presentación'],
    datasets: [
      {
        // Colores adaptados al tema oscuro: Azul principal, Gris medio, Gris claro
        data: [150, 100, 75], 
        backgroundColor: [
          '#00A3FF', // Azul principal (Accent)
          '#4A5568', // Gris medio
          '#A0AEC0', // Gris claro
        ],
        borderColor: [
          '#1E2A4A', // Borde oscuro para contraste en tema oscuro
          '#1E2A4A',
          '#1E2A4A',
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#E2E8F0', // Color de texto claro para leyenda
          font: {
            size: 14,
            family: 'var(--font-geist-sans)',
          },
          padding: 20,
        },
      },
      tooltip: {
        bodyColor: '#E2E8F0', // Color de texto claro para tooltip
        titleColor: '#FFFFFF', // Color de título claro para tooltip
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} puntos (${percentage}%)`;
          }
        }
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          const total = ctx.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#ffffff', // Color del texto del porcentaje dentro del gráfico
        font: {
          weight: 'bold',
          size: 14,
        },
      }
    },
    maintainAspectRatio: false,
  };

  return (
    // Aplicar fondo degradado oscuro y color de texto base blanco
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1E2A4A] text-white">
      {/* Hero  */}
      <div className="relative h-[70vh] bg-black overflow-hidden">
        {/* Imagen de fondo del Hero - Ya tiene opacidad */}
        <div className="absolute inset-0"> 
          <Image
            src="/foto_equipo.jpg"
            alt="Competencia Formula SAE"
            fill
            className="object-cover opacity-50 transform scale-105 hover:scale-100 transition-transform duration-1000"
            priority
            quality={100}
          />
        </div>
        {/* Gradiente sobre la imagen del Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" /> 
        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Competencia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl"
          >
            Una competencia internacional que desafía a estudiantes de ingeniería a diseñar, construir y competir con monoplazas de carreras
          </motion.p>
        </div>
      </div>

      {/* Logo Section - Fondo heredado (oscuro), ajustar texto */}
      <section className="py-16"> 
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <div className="relative w-64 h-32 mb-8">
            <Image
              src="/formulasaelogo.png"
              alt="Formula SAE Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center max-w-2xl">
            {/* Texto ajustado a gris claro */}
            <p className="text-lg text-gray-300 italic"> 
              "Formula SAE® is a student design competition organized by SAE International"
            </p>
            <a
              href="https://www.sae.org/attend/student-events"
              target="_blank"
              rel="noopener noreferrer"
              // Color de enlace ajustado para tema oscuro
              className="text-[#00A3FF] hover:text-blue-400 transition-colors duration-300 mt-2 inline-block" 
            >
              © SAE International
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Descripción - Fondo heredado, ajustar texto y tarjeta */}
      <section className="py-20"> 
        <div className="max-w-6xl mx-auto px-4"> 
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Título ajustado a blanco */}
              <h2 className="text-4xl font-bold text-white font-montserrat">¿Qué es Formula SAE?</h2> 
              {/* Párrafo ajustado a gris claro */}
              <p className="text-lg text-gray-300 leading-relaxed"> 
                Formula SAE es una competencia de diseño estudiantil organizada por SAE International
                que pone a prueba las habilidades de futuros ingenieros en un desafío completo de
                diseño automotriz.
              </p>
              {/* Tarjeta con estilo de tema oscuro */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl text-white"> 
                <h3 className="text-xl font-bold mb-4">Resumen de la Competencia</h3>
                <ul className="space-y-3">
                  {[
                    "Ciclo de diseño de 1 año",
                    "Competencia internacional",
                    "Desafío de ingeniería real",
                    "Evento reconocido por la industria"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-[#00A3FF] rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Imagen actualizada y estilo ajustado */}
            <div className="relative h-[500px] rounded-xl overflow-hidden border border-white/10 transform hover:scale-105 transition-transform duration-500"> 
              <Image
                src="/competencia/image.png" // Imagen actualizada
                alt="Evento Formula SAE"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Impacto/Categorías - Fondo heredado, ajustar tarjetas */}
      <section className="py-16"> 
        <div className="max-w-6xl mx-auto px-4"> 
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card de Alcance Global - Estilo tema oscuro */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"> 
              {/* Título ajustado a blanco */}
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"> 
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Impacto Global
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-lg">
                  <span className="text-4xl text-[#00A3FF]">600+</span>
                  {/* Texto ajustado a gris claro */}
                  <p className="text-gray-300">Universidades participantes</p> 
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <span className="text-4xl text-[#00A3FF]">20+</span>
                  {/* Texto ajustado a gris claro */}
                  <p className="text-gray-300">Países representados</p> 
                </div>
                 {/* Texto ajustado a gris claro */}
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                  <IoRocketSharp className="text-[#00A3FF] text-xl" />
                  <p className="text-lg font-medium"> 
                    Un semillero de talento para la industria automotriz
                  </p>
                </div>
              </div>
            </div>

            {/* Card de Categorías - Estilo tema oscuro */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"> 
              {/* Título ajustado a blanco */}
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"> 
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Categorías
              </h3>
              <div className="space-y-4">
                 {/* Sub-tarjeta con estilo tema oscuro */}
                <div className="p-4 bg-white/10 rounded-lg border-l-4 border-[#00A3FF]">
                  <div className="flex items-center justify-between">
                     {/* Texto ajustado a blanco */}
                    <span className="font-bold text-white">Combustión (IC)</span> 
                    <span className="bg-[#00A3FF] text-black px-3 py-1 rounded-full text-sm font-semibold"> {/* Texto negro para contraste */}
                      ¡Acá competimos!
                    </span>
                  </div>
                </div>
                 {/* Sub-tarjeta con estilo tema oscuro */}
                <div className="p-4 bg-white/10 rounded-lg"> 
                   {/* Texto ajustado a blanco */}
                  <span className="font-bold text-white">Eléctrico (EV)</span> 
                </div>
                 {/* Sub-tarjeta con estilo tema oscuro */}
                <div className="p-4 bg-white/10 rounded-lg"> 
                   {/* Texto ajustado a blanco */}
                  <span className="font-bold text-white">Autónomo (DV)</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos de la Competencia - Fondo heredado, ajustar tarjetas */}
      <section className="py-20"> 
        <div className="max-w-6xl mx-auto px-4"> 
          {/* Título ajustado a blanco */}
          <h2 className="text-4xl font-bold text-center text-white font-montserrat mb-16"> 
            Eventos de la Competencia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eventos Estáticos - Estilo tema oscuro */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300"> 
              {/* Título ajustado a blanco */}
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"> 
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Eventos Estáticos
              </h3>
              <div className="space-y-6 mb-8">
                {[
                  { title: "Diseño", points: 150, desc: "Justificación técnica de las decisiones tomadas en el diseño del monoplaza" },
                  { title: "Análisis de Costos", points: 100, desc: "Evaluación de presupuesto y costos de manufactura" },
                  { title: "Presentación", points: 75, desc: "Evaluación de estrategia de marketing para convencer a inversionistas de la viabilidad de la producción en masa del vehículo" }
                ].map((event, index) => (
                   // Sub-tarjeta con estilo tema oscuro
                  <div key={index} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                       {/* Texto ajustado a blanco */}
                      <h4 className="text-xl font-semibold text-white">{event.title}</h4> 
                      <span className="text-[#00A3FF] font-bold">{event.points} pts</span>
                    </div>
                     {/* Texto ajustado a gris claro */}
                    <p className="text-gray-300">{event.desc}</p> 
                  </div>
                ))}
              </div>
              {/* Contenedor del gráfico */}
              <div className="h-[300px] relative"> 
                <Pie data={staticEventsData} options={chartOptions} />
              </div>
            </div>

            {/* Eventos Dinámicos - Estilo tema oscuro */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300"> 
              {/* Título ajustado a blanco */}
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"> 
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Eventos Dinámicos
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Aceleración", points: 100, desc: " Evalúa la capacidad de   aceleración, midiendo el tiempo en que el auto recorre 75metros en línea recta. " },
                  { title: "Skid Pad", points: 75, desc: "Evalúa la capacidad de tomar curvasrápidamente en un circuito formado por dos     circulos de 3 metros de ancho" },
                  { title: "Autocross", points: 125, desc: "Prueba de maniobrabilidad ycualidades de manejo en un circuito de 800m concurvas cerradas y rectas medianas." },
                  { title: "Resistencia", points: 275, desc: "Carrera  de 22 km para evaluar durabilidad, consumo y fiabilidad del auto." },
                  { title: "Eficiencia", points: 100, desc: "Determina la eficiencia del  consumo de combustible en la prueba deresistencia (Endurance)." }
                ].map((event, index) => (
                   // Sub-tarjeta con estilo tema oscuro
                  <div key={index} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"> 
                    <div className="flex justify-between items-center mb-2">
                       {/* Texto ajustado a blanco */}
                      <h4 className="text-xl font-semibold text-white">{event.title}</h4> 
                      <span className="text-[#00A3FF] font-bold">{event.points} pts</span>
                    </div>
                     {/* Texto ajustado a gris claro */}
                    <p className="text-gray-300">{event.desc}</p> 
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Puntuación total - Estilo tema oscuro */}
          <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl text-white flex items-center justify-center gap-6 transform hover:scale-105 transition-all duration-300"> 
            <div className="text-[#00A3FF] text-4xl">
              <GiTrophyCup className="text-5xl text-[#00A3FF]" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Sistema de Puntuación</h3>
              <p className="text-lg">
                Gana el equipo que sume más puntos sobre los{" "}
                <span className="text-[#00A3FF] font-bold">1000 puntos posibles</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos Técnicos - Fondo heredado, ajustar tarjetas */}
      <section className="py-20"> 
        <div className="max-w-6xl mx-auto px-4"> 
          {/* Título ajustado a blanco */}
          <h2 className="text-4xl font-bold text-center text-white font-montserrat mb-16"> 
            Requisitos Técnicos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Motor y Potencia",
                items: [
                  "Motor de pistón de 4 tiempos",
                  "Cilindrada máxima de 710cc",
                  "Restrictor de admisión obligatorio",
                  "Sistema de escape con límites de ruido",
                  "Control electrónico permitido"
                ]
              },
              {
                title: "Seguridad",
                items: [
                  "Estructura tubular de acero",
                  "Protección contra vuelcos",
                  "Atenuador de impactos",
                  "Arnés de 5-7 puntos",
                  "Protección lateral"
                ]
              },
              {
                title: "Chasis y Suspensión",
                items: [
                  "Distancia entre ejes mínima 1525mm",
                  "4 ruedas fuera del eje longitudinal",
                  "Suspensión en las 4 ruedas",
                  "Sistema de frenos dual",
                  "Ground clearance mínimo 30mm"
                ]
              }
            ].map((category, index) => (
              // Tarjeta con estilo tema oscuro
              <div key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl text-white transform hover:scale-105 transition-all duration-300" 
              >
                <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-[#00A3FF] rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fondo ligeramente diferente para contraste */}
      <section className="py-20 px-4 bg-black/50 text-white"> 
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-montserrat">¿Listo para el Desafío?</h2>
          {/* Texto ajustado a gris claro */}
          <p className="text-xl mb-8 text-gray-300"> 
            Unite a nuestro equipo y sé parte de esta emocionante competencia de ingeniería
          </p>
          <Link href="/join">
            <Button 
              size="lg"
              className="bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-lg px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              Unirse al Equipo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
