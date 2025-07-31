import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Values from "@/components/values";
import { Timeline } from "@/components/ui/timeline";
import * as fs from 'fs';
import path from 'path';
import JourneyButton from "@/components/JourneyButton";
import { ChassisIcon, PowertrainIcon, SuspensionIcon, AeroIcon } from "@/components/icons";

async function getSponsors() {

  const jsonFile = fs.readFileSync(path.join(process.cwd(), 'data', 'sponsors.json'), 'utf-8');
  const jsonData = JSON.parse(jsonFile);
  
  return jsonData.sponsors;
}

export default async function Home() {
  const subsystems = [
    { name: "Chasis", link: "/subsystems/chassis", desc: "The backbone of our race car", icon: ChassisIcon },
    { name: "Powertrain", link: "/subsystems/powertrain", desc: "Delivering power efficiently", icon: PowertrainIcon },
    { name: "Suspension", link: "/subsystems/suspension", desc: "Optimizing handling and performance", icon: SuspensionIcon },
    { name: "Aerodinámica", link: "/subsystems/aero", desc: "Maximizing downforce, minimizing drag", icon: AeroIcon },
  ];

  const sponsors = await getSponsors();

  
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-[#1E2A4A] text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="absolute inset-0 bg-black opacity-50 z-10 w-full h-full"></div>
          <Image
            src="/foto_equipo.jpg"
            alt="FIUBA Racing Car"
            fill
            className="object-cover w-full h-full"
            priority
            quality={100}
          />
        </div>
        
        <div className="relative z-20 text-white text-center max-w-4xl mx-auto px-4 animate-fade-in w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 hover:scale-105 transition-transform duration-300 animate-slide-up text-shadow-2xl font-montserrat">
            FIUBA Racing<sup className="text-2xl align-super">™</sup>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 hover:text-[#00A3FF] transition-colors duration-300 animate-slide-up delay-100 text-shadow-xl font-montserrat">
          Innovación en Movimiento, Ingeniería en Acción
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <JourneyButton />
            <Link href="/competencia">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#00A3FF] font-bold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Conoce la Competencia
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <Values />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          </div>
        </div>
      </section>

      {/* Our Journey Timeline Section */}
      <section id="our-journey" className="py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-2 text-center mb-1">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#00A3FF] font-montserrat">
              Nuestro recorrido
            </h2>
            <p className="font-Monserrat text-neutral-300 text-sm md:text-base max-w-sm">
            Desde nuestros inicios, esta es la evolución de nuestro proyecto a lo largo del tiempo.            </p>
          </div>
          <Timeline />
        </div>
      </section>
      {/* News Section */}
      <section className="py-16 px-4 w-full bg-gradient-to-b from-[#1b2643] to-[#23376B]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-2 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#00A3FF] font-montserrat">
              Noticias y Eventos
            </h2>
            <p className="font-Monserrat text-neutral-300 text-sm md:text-base max-w-md">
              Mantenete al día con las últimas novedades y actividades de nuestro equipo.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 text-center">
            <p className="text-gray-300 mb-6 text-lg">
              Descubre todas nuestras noticias, eventos y logros más recientes
            </p>
            <Link href="/news">
              <Button 
                size="lg" 
                className="bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Ver Todas las Noticias
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
