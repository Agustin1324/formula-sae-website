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

interface SponsorsByTier {
  platino?: Sponsor[];
  oro?: Sponsor[];
  bronce?: Sponsor[];
}

async function getSponsors(): Promise<SponsorsByTier> {
  const jsonFile = fs.readFileSync(path.join(process.cwd(), 'data', 'sponsors.json'), 'utf-8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.sponsors;
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  const tierConfig = {
    platino: { 
      name: 'Platino', 
      color: 'white',
      gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      cardSize: 'p-8',
      imageHeight: 'h-32',
      imageWidth: 200,
      imageHeightPx: 100
    },
    oro: { 
      name: 'Oro', 
      color: 'white',
      gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
      cardSize: 'p-6',
      imageHeight: 'h-24',
      imageWidth: 150,
      imageHeightPx: 80
    },
    bronce: { 
      name: 'Bronce', 
      color: 'white',
      gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
      cardSize: 'p-4',
      imageHeight: 'h-20',
      imageWidth: 120,
      imageHeightPx: 60
    }
  };

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

          {/* Render sponsors by tiers */}
          {Object.entries(tierConfig).map(([tierKey, tierInfo]) => {
            const tierSponsors = sponsors[tierKey as keyof SponsorsByTier];
            if (!tierSponsors || tierSponsors.length === 0) return null;

            return (
              <div key={tierKey} className="mb-16">
                <h2 className={`text-3xl font-bold text-center mb-8 ${tierInfo.color}`}>
                  {tierInfo.name}
                </h2>
                <div className={`grid ${tierInfo.gridCols} gap-6 justify-items-center`}>
                  {tierSponsors.map((sponsor: Sponsor, index: number) => (
                    <div key={index} className={`bg-white rounded-xl ${tierInfo.cardSize} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full max-w-xs flex flex-col items-center justify-center`}>
                      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center">
                        <div className={`flex items-center justify-center ${tierInfo.imageHeight} mb-4`}>
                          <Image 
                            src={sponsor.logo} 
                            alt={`${sponsor.name} logo`} 
                            width={tierInfo.imageWidth}
                            height={tierInfo.imageHeightPx} 
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
              </div>
            );
          })}

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
