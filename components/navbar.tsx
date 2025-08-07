'use client';  // Add this line at the top of the file

import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { ChassisLoader } from "@/components/chassis/ChassisLoader";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150); 
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen && buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  const navItems = [
    { name: "Inicio", href: "/" },
    { 
      name: "Equipos", 
      href: "#",
      subItems: [
        { name: "Aerodinámica", href: "/subsystems/aero" },
        { name: "Chasis", href: "/subsystems/chassis", loader: ChassisLoader },
        { name: "Dinámica", href: "/subsystems/dynamics" },
        { name: "Motor & Transmisión", href: "/subsystems/powertrain" },
        { name: "Electrónica", href: "/subsystems/electronics" },
      ]
    },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contacto", href: "/join" },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav className="fixed top-0 w-full bg-[#1E2A4A]/80 backdrop-blur-md shadow-lg z-50">
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

            <div 
              className="hidden lg:flex items-center relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-white hover:text-blue-400 transition-colors duration-200 px-4 py-2 flex items-center gap-1 text-base font-normal"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <span>Menú</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu  */}
              <div 
                className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg z-[60] transition-all duration-200 ease-out ${
                  isMenuOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-1'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.subItems ? (
                      <>
                        <div 
                          className="px-4 py-3 text-gray-600 font-semibold text-sm border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                          onMouseEnter={() => setHoveredItem(item.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className="flex items-center justify-between">
                            {item.name}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Submenu lateral */}
                        <div 
                          className={`absolute right-full top-0 w-48 bg-white shadow-lg border-l border-gray-200 transition-all duration-200 ${
                            hoveredItem === item.name 
                              ? 'opacity-100 visible translate-x-0' 
                              : 'opacity-0 invisible -translate-x-2'
                          }`}
                          onMouseEnter={() => setHoveredItem(item.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 text-sm border-b border-gray-100 last:border-b-0"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu  */}
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
      
      <div 
        id="desktop-menu"
        className={`lg:hidden fixed left-0 top-[4.2rem] sm:top-[5.4rem] w-full bg-[#1E2A4A] shadow-lg z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen 
            ? 'max-h-[calc(100vh-4.2rem)] sm:max-h-[calc(100vh-5.4rem)] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col">
          {navItems.map((item, index) => (
            <div key={item.name} className="py-1">
              <div className="relative">
                {item.subItems ? (
                  <>
                    <div className="py-3 px-4 text-white text-lg font-semibold bg-[#00A3FF]/20 rounded-md mb-2">
                      {item.name}
                    </div>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block py-2 px-6 text-white text-base hover:bg-[#00A3FF]/20 rounded-md transition-colors duration-300 ${
                          pathname === subItem.href ? 'bg-[#00A3FF]/20 text-[#00A3FF] border-l-4 border-[#00A3FF] pl-5' : ''
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (buttonRef.current) {
                            buttonRef.current.blur();
                          }
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
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
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
              {index < navItems.length - 1 && (
                <div className="border-b border-white/10 my-1 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsMenuOpen(false);
          if (buttonRef.current) {
            buttonRef.current.blur();
          }
        }}
      />
      
      <div className="h-[4.2rem] sm:h-[5.4rem] w-full"></div>
    </>
  );
}
