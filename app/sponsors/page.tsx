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
  oro?: Sponsor[];
  plata?: Sponsor[];
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
    oro: { 
      name: 'Oro', 
      chipColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      borderColor: 'border-yellow-400/30',
      glowColor: 'shadow-yellow-400/20',
      gridCols: 'grid-cols-1',
      cardSize: 'p-8 w-80 h-80',
      imageHeight: 'h-40',
      imageWidth: 280,
      imageHeightPx: 140
    },
    plata: { 
      name: 'Plata', 
      chipColor: 'bg-gradient-to-r from-gray-300 to-gray-500',
      borderColor: 'border-gray-400/30',
      glowColor: 'shadow-gray-400/20',
      gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4',
      cardSize: 'p-6 w-56 h-56',
      imageHeight: 'h-28',
      imageWidth: 180,
      imageHeightPx: 100
    },
    bronce: { 
      name: 'Bronce', 
      chipColor: 'bg-gradient-to-r from-amber-500 to-amber-700',
      borderColor: 'border-amber-500/30',
      glowColor: 'shadow-amber-500/20',
      gridCols: 'grid-cols-1 justify-items-center',
      cardSize: 'p-6 w-56 h-56',
      imageHeight: 'h-28',
      imageWidth: 180,
      imageHeightPx: 100
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A4A] via-[#2A3B5C] to-[#1E2A4A] text-white">
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#00A3FF]/20 rounded-full text-[#00A3FF] text-sm font-semibold mb-4">
              Nuestros Aliados
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white font-montserrat">
              Sponsors
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Empresas que impulsan la innovación y hacen posible nuestros sueños de ingeniería
            </p>
            {/*Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-[#00A3FF] mb-2">{Object.values(sponsors).flat().length}</div>
                <div className="text-sm text-gray-300 font-medium">Total Sponsors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-yellow-400/30 hover:bg-yellow-400/10 transition-all duration-300">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{sponsors.oro?.length || 0}</div>
                <div className="text-sm text-gray-300 font-medium">Oro</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-400/30 hover:bg-gray-400/10 transition-all duration-300">
                <div className="text-3xl font-bold text-gray-300 mb-2">{sponsors.plata?.length || 0}</div>
                <div className="text-sm text-gray-300 font-medium">Plata</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-500/30 hover:bg-amber-500/10 transition-all duration-300">
                <div className="text-3xl font-bold text-amber-500 mb-2">{sponsors.bronce?.length || 0}</div>
                <div className="text-sm text-gray-300 font-medium">Bronce</div>
              </div>
            </div>
          </div>

          
          {Object.entries(tierConfig).map(([tierKey, tierInfo]) => {
            const tierSponsors = sponsors[tierKey as keyof SponsorsByTier];
            if (!tierSponsors || tierSponsors.length === 0) return null;

            return (
              <div key={tierKey} className="mb-16">
                <h2 className={`text-3xl font-bold text-center mb-8 font-white`}>
                  {tierInfo.name}
                </h2>
                <div className={`grid ${tierInfo.gridCols} gap-6 justify-items-center`}>
                  {tierSponsors.map((sponsor: Sponsor, index: number) => (
                    <div key={index} className={`bg-white/95 backdrop-blur-sm rounded-2xl ${tierInfo.cardSize} shadow-xl hover:shadow-2xl ${tierInfo.glowColor} transition-all duration-500 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-between relative group border border-gray-200/50 overflow-hidden`}>
                      
                      <div className={`absolute top-0 right-0 ${tierInfo.chipColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}>
                        {tierInfo.name}
                      </div>
                      
                      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center p-4">
                        <div className={`flex items-center justify-center ${tierInfo.imageHeight} mb-4`}>
                          <Image 
                            src={sponsor.logo} 
                            alt={`${sponsor.name} logo`} 
                            width={tierInfo.imageWidth}
                            height={tierInfo.imageHeightPx} 
                            className="object-contain max-h-full max-w-full filter group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                        <h3 className="text-center text-gray-800 font-bold text-base group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
                          {sponsor.name}
                        </h3>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="bg-gradient-to-r from-[#00A3FF]/20 to-[#1E2A4A]/20 rounded-2xl p-8 md:p-12 text-center mt-20 border border-[#00A3FF]/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Queres ser parte del futuro?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Unite a nuestros sponsors y ayúdanos a competir en Interlagos 2026. 
              Juntos podemos llevar la ingeniería argentina al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button 
                  size="lg"
                  className="bg-[#00A3FF] hover:bg-[#00A3FF]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  Convertirse en Sponsor
                </Button>
              </Link>
              <Link href="/competencia">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#00A3FF] font-bold px-8 py-4 text-lg"
                >
                  Más Información
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
