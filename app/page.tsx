import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChassisIcon, PowertrainIcon, SuspensionIcon, AeroIcon } from "@/components/icons";
import fs from 'fs/promises';
import path from 'path';

async function getSponsors() {
  const sponsorDir = path.join(process.cwd(), 'public', 'sponsors');
  const sponsorFiles = await fs.readdir(sponsorDir);
  return sponsorFiles.map(file => ({
    name: path.parse(file).name,
    logo: `/sponsors/${file}`
  }));
}

export default async function Home() {
  const subsystems = [
    { name: "Chassis", link: "/subsystems/chassis", desc: "The backbone of our race car", icon: ChassisIcon },
    { name: "Powertrain", link: "/subsystems/powertrain", desc: "Delivering power efficiently", icon: PowertrainIcon },
    { name: "Suspension", link: "/subsystems/suspension", desc: "Optimizing handling and performance", icon: SuspensionIcon },
    { name: "Aerodynamics", link: "/subsystems/aero", desc: "Maximizing downforce, minimizing drag", icon: AeroIcon },
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
            <Link href="#about">
              <Button 
                size="lg" 
                className="bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </Button>
            </Link>
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Sponsors</h2>
          <div className="sponsor-carousel">
            <div className="sponsor-track">
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div key={index} className="sponsor-item">
                  <Image 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`} 
                    width={150}
                    height={80} 
                    className="object-contain h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">About FIUBA Racing</h2>
          <p className="text-xl mb-12 text-center text-gray-600">
            FIUBA Racing is a Formula Student team dedicated to designing, building, and racing 
            high-performance vehicles. Our team of passionate engineering students works tirelessly 
            to push the boundaries of automotive technology and innovation.
          </p>

          <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">Our Subsystems</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subsystems.map((subsystem, index) => (
              <Link href={subsystem.link} key={index}>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-5xl text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                      <subsystem.icon />
                    </div>
                    <h4 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{subsystem.name}</h4>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{subsystem.desc}</p>
                    <span className="mt-4 inline-block bg-blue-500 text-white text-sm py-1 px-3 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                      Learn More
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
