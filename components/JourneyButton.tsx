'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

const JourneyButton: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const journeySection = document.getElementById('our-journey');
    if (journeySection) {
      const yOffset = -100;
      const y = journeySection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <a href="#our-journey" onClick={handleClick} className="w-full sm:w-auto">
      <Button 
        size="lg" 
        className="bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
      >
        Nuestro recorrido
      </Button>
    </a>
  );
};

export default JourneyButton;
