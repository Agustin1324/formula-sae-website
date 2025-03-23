import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChassisIcon, PowertrainIcon, SuspensionIcon, AeroIcon } from "@/components/icons";
import * as fs from 'fs';
import path from 'path';
import { Timeline } from "@/components/ui/timeline";
import JourneyButton from "@/components/JourneyButton";
import Values from "@/components/values";


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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <Image
            src="https://www.epsa-team.com/images/FS/expofs-min-resize.jpg"
            alt="FIUBA Racing Car"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        
        <div className="relative z-20 text-white text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 hover:scale-105 transition-transform duration-300 animate-slide-up text-shadow-2xl font-montserrat">
            FIUBA Racing<sup className="text-2xl align-super">™</sup>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 hover:text-[#00A3FF] transition-colors duration-300 animate-slide-up delay-100 text-shadow-xl font-montserrat">
            Engineering Excellence in Motion
          </p>
          
          <div className="flex gap-4 justify-center animate-slide-up delay-200">
            <JourneyButton />
            <Link href="/join">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#00A3FF] font-bold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Join the Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsor Carousel */}
      <section className="py-12 bg-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#1E2A4A] font-montserrat">Nuestros Sponsors</h2>
          <div className="sponsor-carousel">
            <div className="sponsor-track">
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div key={index} className="sponsor-item">
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                      <Image 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      width={150}
                      height={80} 
                      className="object-contain h-20"
                    />
                    </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Nuestra Visión</h2>
          <p className="text-xl mb-12 text-center text-gray-600">
          Buscamos como equipo fomentar la <strong>creatividad</strong> y la <strong>innovación</strong> en la ingeniería para tener una <strong>visión integral</strong> del proyecto. 
          Esto incluye el control de costos, la calidad ingenieril y la búsqueda de términos de efectividad económica <strong>sin excluir el rendimiento.</strong>
          </p>
          <Values />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          </div>
        </div>
      </section>

      {/* Our Journey Timeline Section */}
      <section id="our-journey" className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Journey</h2>
          <Timeline />
        </div>
      </section>
    </div>
  );
}
