'use client';  // Add this line at the top of the file

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed top-0 w-full bg-[#1E2A4A]/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="FIUBA Racing Logo" 
              width={180} 
              height={90} 
              className="w-auto h-[4.5rem] min-h-[4.5rem] min-w-[150px] sm:min-w-[180px] hover:opacity-80 transition-opacity duration-300 object-contain" 
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center ml-auto">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.href}
                  className={`text-white hover:text-[#00A3FF] transition-colors duration-300 font-semibold text-sm xl:text-base px-3 py-2 flex items-center justify-center whitespace-nowrap ${pathname === item.href ? 'text-[#00A3FF] border-b-2 border-[#00A3FF]' : ''}`}
                >
                  {item.name}
                </Link>
                {index < navItems.length - 1 && (
                  <div className="h-5 border-r border-white/30 mx-3" />
                )} 
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-[#1E2A4A]/95 backdrop-blur-md rounded-b-lg shadow-lg">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-4 px-6 text-white hover:bg-[#00A3FF] hover:text-[#1E2A4A] transition-colors duration-300 ${pathname === item.href ? 'bg-[#00A3FF] text-[#1E2A4A]' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {index < navItems.length - 1 && (
                    <div className="border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          )}



          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-[#00A3FF] transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
  );
}
