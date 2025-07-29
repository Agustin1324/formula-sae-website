"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import FallbackMap from './fallback-map';

// Definimos la interfaz para las propiedades del componente
interface GoogleMapComponentProps {
  address: string;
  zoom?: number;
  height?: string;
  width?: string;
  markerLabel?: string;
  className?: string;
}

// Estilos por defecto para el contenedor del mapa
const defaultContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.375rem', // Equivalente a rounded-md
};

/**
 * Componente para mostrar un mapa de Google Maps con un marcador en una dirección específica
 */
const GoogleMapComponent = ({
  address,
  zoom = 15,
  height = '400px',
  width = '100%',
  markerLabel = '',
  className = '',
}: GoogleMapComponentProps) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerStyle = {
    ...defaultContainerStyle,
    height,
    width,
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const facultadUbaCoords = {
          lat: -34.6176981,
          lng: -58.3682741
        };
        
        setCenter(facultadUbaCoords);
        setIsLoading(false);
      } catch (error) {
        console.error('Error geocodificando la dirección:', error);
        setError('No se pudo cargar el mapa. Por favor, intente nuevamente más tarde.');
        setIsLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  if (!apiKey) {
    return <FallbackMap address={address} height={height} width={width} className={className} />;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center bg-gray-100 rounded-md" style={containerStyle}>Cargando mapa...</div>;
  }

  if (error) {
    return <FallbackMap address={address} height={height} width={width} className={className} />;
  }

  if (!center) {
    return <FallbackMap address={address} height={height} width={width} className={className} />;
  }

  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          <Marker position={center} label={markerLabel} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent; 
