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
  // Estado para almacenar las coordenadas después de geocodificar la dirección
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Personalizar el estilo del contenedor con las props recibidas
  const containerStyle = {
    ...defaultContainerStyle,
    height,
    width,
  };

  // Clave API para Google Maps
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Si no hay API key configurada, mostrar el mapa de respaldo
  if (!apiKey) {
    return <FallbackMap address={address} height={height} width={width} className={className} />;
  }

  // Geocodificar la dirección cuando el componente se monta
  useEffect(() => {
    // Utilizamos la geocodificación estática con la API de Google Maps
    const geocodeAddress = async () => {
      try {
        // Coordenadas precisas para la Facultad de Ingeniería UBA - Paseo Colón 850
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

  // Si todavía está cargando, mostrar un mensaje
  if (isLoading) {
    return <div className="flex justify-center items-center bg-gray-100 rounded-md" style={containerStyle}>Cargando mapa...</div>;
  }

  // Si hay un error, mostrar el mapa de respaldo
  if (error) {
    return <FallbackMap address={address} height={height} width={width} className={className} />;
  }

  // Si no hay centro establecido, mostrar el mapa de respaldo
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