'use client';  // Add this line at the top of the file

import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { ChassisLoader } from "@/components/chassis/ChassisLoader";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
        // Asegurar que el botón pierda el foco cuando se cierra el menú
        if (buttonRef.current) {
          buttonRef.current.blur();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Manejar la apertura/cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Si el menú se está cerrando, quitar el foco del botón
    if (isMenuOpen && buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Aerodinámica", href: "/subsystems/aero" },
    { name: "Chasis", href: "/subsystems/chassis", loader: ChassisLoader },
    { name: "Dinámica", href: "/subsystems/dynamics" },
    { name: "Motor & Transmisión", href: "/subsystems/powertrain" },
    { name: "Electrónica", href: "/subsystems/electronics" },
    { name: "Contacto", href: "/join" },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav className="fixed top-0 w-full bg-[#1E2A4A]/80 backdrop-blur-md shadow-lg z-50 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="FIUBA Racing Logo" 
                width={180} 
                height={90} 
                className="w-auto h-[3.8rem] sm:h-[5rem] max-w-[120px] sm:max-w-[180px] hover:opacity-80 transition-opacity duration-300 object-contain" 
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center">
              {navItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={`text-white hover:text-[#00A3FF] transition-colors duration-300 font-semibold text-sm xl:text-base px-2 xl:px-3 py-2 flex items-center justify-center whitespace-nowrap ${pathname === item.href ? 'text-[#00A3FF] border-b-2 border-[#00A3FF]' : ''}`}
                      onMouseEnter={() => {
                        if (item.loader) {
                          const Loader = item.loader;
                          return <Loader />;
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                    {item.loader && pathname === item.href && <item.loader />}
                  </div>
                  {index < navItems.length - 1 && (
                    <div className="h-5 border-r border-white/30 mx-1 xl:mx-3" />
                  )} 
                </React.Fragment>
              ))}
            </div>
            
            {/* Mobile Menu Button - Alineado a la derecha con más padding */}
            <div className="lg:hidden relative" ref={dropdownRef}>
              <button
                ref={buttonRef}
                className="text-white hover:text-[#00A3FF] transition-colors duration-300 p-2 rounded-md hover:bg-white/10 mr-1 focus:outline-none"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-8 h-8"
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
        </div>
      </nav>
      
      {/* Dropdown Menu - Fullwidth */}
      <div 
        id="mobile-menu"
        className={`fixed left-0 top-[4.2rem] sm:top-[5.4rem] w-full bg-[#1E2A4A] shadow-lg z-40 lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen 
            ? 'max-h-[calc(100vh-4.2rem)] sm:max-h-[calc(100vh-5.4rem)] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col">
          {navItems.map((item, index) => (
            <div key={item.name} className="py-1">
              <div className="relative">
                <Link
                  href={item.href}
                  className={`block py-3 px-4 text-white text-lg font-semibold hover:bg-[#00A3FF]/20 rounded-md transition-colors duration-300 ${
                    pathname === item.href ? 'bg-[#00A3FF]/20 text-[#00A3FF] border-l-4 border-[#00A3FF] pl-3' : ''
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (buttonRef.current) {
                      buttonRef.current.blur();
                    }
                    if (item.loader) {
                      const Loader = item.loader;
                      return <Loader />;
                    }
                  }}
                >
                  {item.name}
                </Link>
                {item.loader && pathname === item.href && <item.loader />}
              </div>
              {index < navItems.length - 1 && (
                <div className="border-b border-white/10 my-1 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay para el fondo cuando el menú está abierto */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsMenuOpen(false);
          // Asegurar que el botón pierda el foco cuando se hace clic en el overlay
          if (buttonRef.current) {
            buttonRef.current.blur();
          }
        }}
      />
      
      {/* Espaciador para compensar la altura del navbar fijo */}
      <div className="h-[4.2rem] sm:h-[5.4rem] w-full"></div>
    </>
  );
}
