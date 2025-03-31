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
        data: [150, 100, 75],
        backgroundColor: [
          '#00A3FF',
          '#1E2A4A',
          '#7EB2DD',
        ],
        borderColor: [
          '#ffffff',
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
          font: {
            size: 14,
            family: 'var(--font-geist-sans)',
          },
          padding: 20,
        },
      },
      tooltip: {
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
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 14,
        },
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero  */}
      <div className="relative h-[70vh] bg-black overflow-hidden">
        <div className="absolute inset-0 transform scale-105" style={{ transform: 'translate3d(0, 0, 0)' }}>
          <Image
            src="/banner_principal.jpg"
            alt="Competencia Formula SAE"
            fill
            className="object-cover opacity-50 transform scale-105 hover:scale-100 transition-transform duration-1000"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
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

      {/* Logo Section */}
      <section className="py-12 bg-white">
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
            <p className="text-lg text-gray-600 italic">
              "Formula SAE® is a student design competition organized by SAE International"
            </p>
            <a 
              href="https://www.sae.org/attend/student-events" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00A3FF] hover:text-[#1E2A4A] transition-colors duration-300 mt-2 inline-block"
            >
              © SAE International
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Descripción  */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#1E2A4A] font-montserrat">¿Qué es Formula SAE?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Formula SAE es una competencia de diseño estudiantil organizada por SAE International 
                que pone a prueba las habilidades de futuros ingenieros en un desafío completo de 
                diseño automotriz.
              </p>
              <div className="bg-gradient-to-r from-[#1E2A4A] to-[#2A3B66] p-8 rounded-xl text-white">
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
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/competition/event-overview.jpg"
                alt="Evento Formula SAE"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card de Alcance Global */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-[#1E2A4A] mb-6 flex items-center gap-3">
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Impacto Global
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-lg">
                  <span className="text-4xl text-[#00A3FF]">600+</span>
                  <p className="text-gray-700">Universidades participantes</p>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <span className="text-4xl text-[#00A3FF]">20+</span>
                  <p className="text-gray-700">Países representados</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-600">
                  <IoRocketSharp className="text-[#00A3FF] text-xl" />
                  <p className="text-lg font-medium">
                    Un semillero de talento para la industria automotriz
                  </p>
                </div>
              </div>
            </div>

            {/* Card de Categorías */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-[#1E2A4A] mb-6 flex items-center gap-3">
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Categorías
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#00A3FF]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E2A4A]">Combustión (IC)</span>
                    <span className="bg-[#00A3FF] text-white px-3 py-1 rounded-full text-sm">
                      ¡Acá competimos!
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-bold text-[#1E2A4A]">Eléctrico (EV)</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-bold text-[#1E2A4A]">Autónomo (DV)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos de la Competencia  */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#1E2A4A] font-montserrat mb-16">
            Eventos de la Competencia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eventos Estáticos */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#1E2A4A] mb-6 flex items-center gap-3">
                <span className="h-8 w-1 bg-[#00A3FF] rounded-full"></span>
                Eventos Estáticos
              </h3>
              <div className="space-y-6 mb-8">
                {[
                  { title: "Diseño", points: 150, desc: "Justificación técnica de las decisiones tomadas en el diseño del monoplaza" },
                  { title: "Análisis de Costos", points: 100, desc: "Evaluación de presupuesto y costos de manufactura" },
                  { title: "Presentación", points: 75, desc: "Evaluación de estrategia de marketing para convencer a inversionistas de la viabilidad de la producción en masa del vehículo" }
                ].map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-semibold text-[#1E2A4A]">{event.title}</h4>
                      <span className="text-[#00A3FF] font-bold">{event.points} pts</span>
                    </div>
                    <p className="text-gray-600">{event.desc}</p>
                  </div>
                ))}
              </div>
              <div className="h-[300px] relative">
                <Pie data={staticEventsData} options={chartOptions} />
              </div>
            </div>

            {/* Eventos Dinámicos */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#1E2A4A] mb-6 flex items-center gap-3">
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
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-semibold text-[#1E2A4A]">{event.title}</h4>
                      <span className="text-[#00A3FF] font-bold">{event.points} pts</span>
                    </div>
                    <p className="text-gray-600">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Puntuación total */}
          <div className="mt-12 bg-gradient-to-r from-[#1E2A4A] to-[#2A3B66] rounded-2xl p-8 text-white flex items-center justify-center gap-6 shadow-xl transform hover:scale-105 transition-all duration-300">
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

      {/* Requisitos Técnicos con diseño moderno */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#1E2A4A] font-montserrat mb-16">
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
              <div key={index} 
                className="bg-gradient-to-br from-[#1E2A4A] to-[#2A3B66] rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300"
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#1E2A4A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-montserrat">¿Listo para el Desafío?</h2>
          <p className="text-xl mb-8 text-white/90">
            Únete a nuestro equipo y sé parte de esta emocionante competencia de ingeniería
          </p>
          <Link href="/join">
            <Button 
              size="lg"
              className="bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-lg px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              Únete al Equipo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

