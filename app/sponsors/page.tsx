import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as fs from 'fs';
import path from 'path';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

async function getSponsors(): Promise<Sponsor[]> {
  const jsonFile = fs.readFileSync(path.join(process.cwd(), 'data', 'sponsors.json'), 'utf-8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.sponsors;
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A4A] via-[#2A3B5C] to-[#1E2A4A] text-white">
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#00A3FF] font-montserrat">
              Nuestros Sponsors
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Agradecemos a todas las empresas que hacen posible nuestro proyecto y nos acompañan en esta emocionante aventura de ingeniería.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex items-center justify-center h-24 mb-4">
                    <Image 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      width={150}
                      height={80} 
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                  <h3 className="text-center text-gray-800 font-semibold text-lg">
                    {sponsor.name}
                  </h3>
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#00A3FF] font-bold text-lg px-8 py-6"
              >
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
