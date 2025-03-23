'use client';  // Add this line at the top of the file

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Chassis", href: "/subsystems/chassis" },
    { name: "Powertrain", href: "/subsystems/powertrain" },
    { name: "Suspension", href: "/subsystems/suspension" },
    { name: "Aerodynamics", href: "/subsystems/aero" },
    { name: "Join", href: "/join" },
  ];


  return (
    <nav className="fixed top-0 w-full bg-[#1E2A4A] shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="FIUBA Racing Logo" width={120} height={60} className="hover:opacity-80 transition-opacity duration-300" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-[#00A3FF] transition-colors duration-300 font-semibold text-sm xl:text-lg px-2 py-1 ${pathname === item.href ? 'text-[#00A3FF] border-b-2 border-[#00A3FF]' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>



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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#2A3B66] rounded-b-lg shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 px-4 text-white hover:bg-[#00A3FF] hover:text-[#1E2A4A] transition-colors duration-300 ${pathname === item.href ? 'bg-[#00A3FF] text-[#1E2A4A]' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

          </div>
        )}
      </div>
    </nav>
  );
}
