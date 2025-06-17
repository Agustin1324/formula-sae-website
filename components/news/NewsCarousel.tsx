"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import newsData from '@/data/news.json';


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

export default function NewsCarousel() {
  const [news, setNews] = useState<NewsEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setNews(newsData.news);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === news.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  if (news.length === 0) {
    return null;
  }

  return (
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

        <div className="relative bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="flex items-center p-6">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full max-w-md rounded-lg overflow-hidden">
              <Image
                src={news[currentIndex].image.src}
                alt={news[currentIndex].image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>


            {/* Content */}
            <div className="ml-8 flex flex-col h-[250px] justify-between flex-grow">
              <div>
                <div className="text-sm text-[#00A3FF] mb-2">
                  {new Date(news[currentIndex].date).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{news[currentIndex].title}</h3>
                <p className="text-gray-300 mb-6">{news[currentIndex].summary}</p>
              <div className="flex justify-center">
                <a 
                  href={news[currentIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                <Button className="bg-[#00A3FF] hover:bg-[#0082CC] text-white w-fit">
                    Leer más
                </Button>
                </a>

              </div>
            </div>
          </div>
        </div>

          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Anterior noticia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Siguiente noticia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-[#00A3FF] w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir a noticia ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
