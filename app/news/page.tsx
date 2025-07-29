import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import newsData from "@/data/news.json";

interface NewsEntry {
  title: string;
  date: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
}

export default function NewsPage() {
  const news: NewsEntry[] = newsData.news;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b2643] to-[#23376B] text-white">
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#00A3FF] font-montserrat">
              Noticias y Eventos
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mantenete al día con las últimas novedades, eventos y logros de nuestro equipo de Formula SAE.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {news.map((article, index) => (
              <article key={index} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={article.image.src}
                        alt={article.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <div className="text-sm text-[#00A3FF] mb-3">
                      {new Date(article.date).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {article.title}
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.summary}
                    </p>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#00A3FF] hover:text-white font-semibold transition-colors duration-200"
                    >
                      Leer más
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
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