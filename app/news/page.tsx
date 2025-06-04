import { Metadata } from "next";
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the client component
const NewsSection = dynamic(() => import('@/components/news/NewsSection'), { ssr: false });

export const metadata: Metadata = {
  title: "Noticias | FIUBA Racing",
  description: "Últimas noticias y eventos del equipo FIUBA Racing",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Noticias y <span className="text-[#00A3FF]">Eventos</span>
          </h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Mantente informado sobre las últimas actividades, logros y eventos del equipo FIUBA Racing.
          </p>
        </div>
      </div>
      
      <NewsSection />
    </div>
  );
}
