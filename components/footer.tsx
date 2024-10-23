import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1E2A4A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FIUBA Racing</h3>
            <p className="text-sm">Engineering excellence in motion. Join us in our pursuit of innovation and performance.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#00A3FF] transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#00A3FF] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/join" className="hover:text-[#00A3FF] transition-colors duration-300">Join the Team</Link></li>
              <li><Link href="/contact" className="hover:text-[#00A3FF] transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#00A3FF] transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-[#00A3FF] transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-[#00A3FF] transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-[#00A3FF] transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FIUBA Racing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
