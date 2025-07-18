import Link from "next/link";
import {FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#23376B] text-white w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4">FIUBA Racing</h3>
            <p className="text-xs mt-2">Página web creada y diseñada por Agustina Germinario y Agustín Strohmayer.</p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4">Links de Interés</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#00A3FF] transition-colors duration-300">Inicio</Link></li>
              <li><Link href="/join" className="hover:text-[#00A3FF] transition-colors duration-300">Contacto</Link></li>
              <li><Link href="/competencia" className="hover:text-[#00A3FF] transition-colors duration-300">Conoce la competencia</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4">Conectemos</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a 
                href="https://www.instagram.com/fiubaracing/" 
                className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                aria-label="Instagram"
                target="_blank" //to open a in a new tab
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/fiuba-racing-team/" 
                className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@fiuba.racing?_t=zm-8uthkxlyc2f&_r=1"
                className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok size={24} />
              </a>
              <a 
                href="https://www.youtube.com/@FiubaRacing" 
                className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                aria-label="Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={24} />
              </a>
              <a 
                href="https://x.com/fiubaracing/status/1933607559929475234?s=48" 
                className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>

            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} FIUBA Racing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
