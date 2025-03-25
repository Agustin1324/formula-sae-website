"use client";

import GoogleMapComponent from "@/components/ui/google-map";
import Link from "next/link";

interface LocationMapContainerProps {
  address: string;
  title?: string;
  organizationName?: string;
}

/**
 * Componente contenedor para mostrar la sección de ubicación 
 * con título, dirección y mapa interactivo
 */
const LocationMapContainer = ({
  address,
  title = "Ubicación",
  organizationName = "Facultad de Ingeniería - Universidad de Buenos Aires",
}: LocationMapContainerProps) => {
  // Crear URL para Google Maps
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 transform hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-[#1E2A4A] mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{organizationName}</p>
      <p className="text-gray-600 mb-4">
        <Link 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00A3FF] hover:text-[#1E2A4A] transition-colors duration-300 inline-flex items-center"
        >
          {address}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </Link>
      </p>
      <GoogleMapComponent 
        address={address}
        height="300px"
        markerLabel="FIUBA"
        className="hover:opacity-90 transition-opacity"
      />
    </div>
  );
};

export default LocationMapContainer; 