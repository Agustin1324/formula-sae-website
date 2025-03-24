'use client';  // Add this line at the top of the file

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Aerodinámica", href: "/subsystems/aero" },
    { name: "Chasis", href: "/subsystems/chassis" },
    { name: "Dinámica", href: "/subsystems/suspension" },
    { name: "Motor & Transmisión", href: "/subsystems/powertrain" },
    { name: "Electrónica", href: "/subsystems/electronics" },
    { name: "Contacto", href: "/join" },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav className="fixed top-0 w-full bg-[#1E2A4A]/80 backdrop-blur-md shadow-lg z-50 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center py-2 sm:py-3">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="FIUBA Racing Logo" 
                width={180} 
                height={90} 
                className="w-auto h-[3.5rem] sm:h-[4.5rem] max-w-[120px] sm:max-w-[180px] hover:opacity-80 transition-opacity duration-300 object-contain" 
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center ml-auto">
              {navItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-white hover:text-[#00A3FF] transition-colors duration-300 font-semibold text-sm xl:text-base px-2 xl:px-3 py-2 flex items-center justify-center whitespace-nowrap ${pathname === item.href ? 'text-[#00A3FF] border-b-2 border-[#00A3FF]' : ''}`}
                  >
                    {item.name}
                  </Link>
                  {index < navItems.length - 1 && (
                    <div className="h-5 border-r border-white/30 mx-1 xl:mx-3" />
                  )} 
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white hover:text-[#00A3FF] transition-colors duration-300 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 w-[80%] max-w-[300px] h-full bg-[#1E2A4A] shadow-lg z-50 lg:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cabecera del menú móvil */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Image 
              src="/logo.png" 
              alt="FIUBA Racing Logo" 
              width={120} 
              height={60} 
              className="w-auto h-10 object-contain" 
              priority
            />
            <button
              className="text-white hover:text-[#00A3FF] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Enlaces del menú */}
          <div className="flex-1 overflow-y-auto py-4">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-3 px-6 text-white hover:bg-[#00A3FF]/20 transition-colors duration-300 ${
                    pathname === item.href ? 'bg-[#00A3FF]/20 text-[#00A3FF] border-l-4 border-[#00A3FF]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {index < navItems.length - 1 && (
                  <div className="border-b border-white/10 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Espaciador para compensar la altura del navbar fijo */}
      <div className="h-[3.5rem] sm:h-[4.5rem] w-full"></div>
    </>
  );
}
