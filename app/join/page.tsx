"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/lib/hooks/useRecaptcha";
import LocationMapContainer from "@/components/maps/location-map-container";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  console.error('⚠️ La clave de reCAPTCHA no está configurada');
}

export default function Contacto() {
  const { captchaToken, recaptchaRef, handleRecaptchaChange, executeRecaptcha, resetRecaptcha } = useRecaptcha();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoConsulta: 'Consulta general',
    mensaje: ''
  });
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  
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
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Verificar si el captcha fue resuelto (ahora visible)
      const token = recaptchaRef.current?.getValue() || null;
      
      if (!token) {
        setError('Por favor, verifica que no eres un robot resolviendo el captcha.');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          tipo_consulta: formData.tipoConsulta,
          mensaje: formData.mensaje,
          recaptchaToken: token
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }
      
      setEnviado(true);
      // Actualizar para usar el nuevo campo de la respuesta de la API
      setEmailEnviado(data.notificacionEquipoEnviada || false); 
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          tipoConsulta: 'Consulta general',
          mensaje: ''
        });
        setEnviado(false);
        setEmailEnviado(false);
        // Resetear y forzar re-renderizado del captcha
        resetRecaptcha();
        setCaptchaKey(Date.now());
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el formulario');
      console.error('Error al enviar el formulario:', err);
      // Resetear y forzar re-renderizado del captcha
      resetRecaptcha();
      setCaptchaKey(Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E2A4A]"> {/* Changed bg-white to bg-[#1E2A4A] */}
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
          <div className="md:col-span-3 bg-[#1E2A4A] text-white rounded-lg shadow-lg p-8 transform hover:shadow-xl transition-all duration-300">
            {enviado ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-300 mb-4">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                {emailEnviado ? (
                  <div className="bg-blue-900/50 text-blue-200 px-4 py-2 rounded-md text-sm">
                    Se ha enviado una notificación automática por correo electrónico a nuestro equipo.
                  </div>
                ) : (
                  <div className="bg-yellow-900/50 text-yellow-200 px-4 py-2 rounded-md text-sm">
                    Tu mensaje ha sido guardado, pero hubo un problema al enviar la notificación por correo electrónico. 
                    Aún así, revisaremos tu consulta pronto.
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-200 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-[#2a3a5a] text-white rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-[#2a3a5a] text-white rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-200 mb-1">Tipo de consulta</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-3 border border-gray-600 rounded-md bg-[#2a3a5a] text-white text-left flex justify-between items-center focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {formData.tipoConsulta}
                      <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-[#1E2A4A] border border-gray-600 rounded-md shadow-lg">
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer text-white"
                          onClick={() => handleTipoConsultaClick('Consulta general')}
                        >
                          Consulta general
                        </div>
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer border-t border-gray-700 text-white"
                          onClick={() => handleTipoConsultaClick('Propuesta de sponsoreo')}
                        >
                          Propuesta de sponsoreo
                        </div>
                        <div 
                          className="p-3 hover:bg-[#00A3FF]/20 cursor-pointer border-t border-gray-700 text-white"
                          onClick={() => handleTipoConsultaClick('Quiero unirme al equipo')}
                        >
                          Quiero unirme al equipo
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-200 mb-1">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-[#2a3a5a] text-white rounded-md focus:ring-[#00A3FF] focus:border-[#00A3FF] transition-colors duration-300"
                  ></textarea>
                </div>
                
                {/* reCAPTCHA visible para cada envío */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-200 mb-2">Verifica que no eres un robot:</p>
                  <ReCAPTCHA
                    key={captchaKey}
                    ref={recaptchaRef}
                    size="normal"
                    sitekey={RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} // clave de prueba como fallback
                    onChange={handleRecaptchaChange}
                    hl="es"
                    theme="dark" // Added dark theme
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#00A3FF] hover:bg-[#0082cc] text-white font-semibold py-3 rounded-md transition-colors duration-300 transform hover:scale-[1.02]" /* Changed background to accent blue and adjusted hover */
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar mensaje'}
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
                    href="mailto:fiuba.racing@gmail.com" 
                    className="text-[#00A3FF] hover:text-white transition-colors duration-300"
                  >
                    fiuba.racing@gmail.com
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Redes sociales</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/fiubaracing/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                    >
                      <FaInstagram size={24} />
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
                      href="https://www.linkedin.com/company/fiuba-racing-team/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00A3FF] transition-colors duration-300"
                    >
                      <FaLinkedin size={24} />
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
            </div>
            
            <LocationMapContainer 
              address="Paseo Colón 850, CABA, Argentina" 
              title="Ubicación"
              organizationName="Facultad de Ingeniería - Universidad de Buenos Aires"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
