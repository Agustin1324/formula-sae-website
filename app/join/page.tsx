"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from "next/link";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoConsulta: 'Consulta general',
    mensaje: ''
  });
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [enviado, setEnviado] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTipoConsultaClick = (tipo: string) => {
    setFormData({
      ...formData,
      tipoConsulta: tipo
    });
    setShowDropdown(false);
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setEnviado(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        tipoConsulta: 'Consulta general',
        mensaje: ''
      });
      setEnviado(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-[40vh] bg-[#1E2A4A]">
        <Image
          src="https://images.pexels.com/photos/6894427/pexels-photo-6894427.jpeg"
          alt="Racing Team"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">Contacto</h1>
          <p className="text-xl text-white max-w-2xl animate-fade-in">
            ¿Tenés alguna pregunta o propuesta? ¡Nos encantaría escucharte!
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Formulario de Contacto - 3 columnas en desktop */}
          <div className="md:col-span-3 bg-white rounded-lg shadow-lg p-8 transform hover:shadow-xl transition-all duration-300">
            {enviado ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1E2A4A] mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-600">Gracias por contactarnos. Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-700 mb-1">Tipo de consulta</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-3 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {formData.tipoConsulta}
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer"
                          onClick={() => handleTipoConsultaClick('Consulta general')}
                        >
                          Consulta general
                        </div>
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer border-t border-gray-100"
                          onClick={() => handleTipoConsultaClick('Propuesta de sponsoreo')}
                        >
                          Propuesta de sponsoreo
                        </div>
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer border-t border-gray-100"
                          onClick={() => handleTipoConsultaClick('Quiero unirme al equipo')}
                        >
                          Quiero unirme al equipo
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  ></textarea>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1E2A4A] hover:bg-[#00A3FF] text-white font-semibold py-3 rounded-md transition-colors duration-300 transform hover:scale-[1.02]"
                  >
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* Información de Contacto - 2 columnas en desktop */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#1E2A4A] text-white rounded-lg shadow-lg p-8 transform hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Otras formas de contacto</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Email directo</h4>
                  <a 
                    href="mailto:fiubaracing@fi.uba.ar" 
                    className="text-[#00A3FF] hover:text-white transition-colors duration-300"
                  >
                    fiubaracing@fi.uba.ar
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Redes sociales</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/fiuba_racing/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/fiuba-racing-team/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 transform hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-[#1E2A4A] mb-4">Ubicación</h3>
              <p className="text-gray-600 mb-4">Facultad de Ingeniería - Universidad de Buenos Aires</p>
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src="https://i.imgur.com/vCVhWAV.jpg" 
                  alt="Mapa FIUBA"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
