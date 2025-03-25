"use client";

import Image from 'next/image';
import Link from 'next/link';

interface FallbackMapProps {
  address: string;
  height?: string;
  width?: string;
  className?: string;
}

/**
 * Componente de respaldo para mostrar un mapa estático con enlace a Google Maps
 * cuando no está disponible la API de Google Maps
 */
const FallbackMap = ({
  address,
  height = '300px',
  width = '100%',
  className = '',
}: FallbackMapProps) => {
  // Creamos la URL para Google Maps con la dirección
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  
  // Creamos una imagen estática del mapa (podría reemplazarse por una imagen local)
  const staticMapImageUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + 
    encodeURIComponent(address) + 
    '&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C' + 
    encodeURIComponent(address);

  return (
    <Link
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-md overflow-hidden hover:opacity-90 transition-opacity ${className}`}
      style={{ height, width }}
    >
      <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-[#1E2A4A] text-white p-2 rounded-md mb-2">
          Ver en Google Maps
        </div>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
    </Link>
  );
};

export default FallbackMap; 