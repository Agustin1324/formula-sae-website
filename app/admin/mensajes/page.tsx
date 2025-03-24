"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MensajeContacto {
  id: string;
  nombre: string;
  email: string;
  tipo_consulta: string;
  mensaje: string;
  leido: boolean;
  fecha_creacion: string;
}

export default function AdminMensajes() {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<MensajeContacto | null>(null);

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    setCargando(true);
    try {
      const response = await fetch('/api/contact');
      
      if (!response.ok) {
        throw new Error('Error al cargar los mensajes');
      }
      
      const data = await response.json();
      setMensajes(data.data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Hubo un error al cargar los mensajes. Por favor, intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const marcarComoLeido = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH'
      });
      
      if (!response.ok) {
        throw new Error('Error al marcar el mensaje como leído');
      }
      
      // Actualizar el estado local
      setMensajes(mensajes.map(mensaje => 
        mensaje.id === id ? { ...mensaje, leido: true } : mensaje
      ));
      
      if (mensajeSeleccionado?.id === id) {
        setMensajeSeleccionado({ ...mensajeSeleccionado, leido: true });
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al marcar el mensaje como leído');
    }
  };

  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A3FF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
        <Button 
          onClick={cargarMensajes}
          className="bg-[#1E2A4A] hover:bg-[#00A3FF] text-white"
        >
          Intentar nuevamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1E2A4A] mb-6">Administración de Mensajes</h1>
        
        {mensajes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No hay mensajes de contacto disponibles.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-[#1E2A4A] text-white">
                  <h2 className="font-semibold text-lg">Mensajes recibidos</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                        mensajeSeleccionado?.id === mensaje.id ? 'bg-blue-50' : ''
                      } ${!mensaje.leido ? 'font-semibold' : ''}`}
                      onClick={() => setMensajeSeleccionado(mensaje)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">{formatearFecha(mensaje.fecha_creacion)}</p>
                          <p className="mt-1">{mensaje.nombre}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">{mensaje.tipo_consulta}</p>
                        </div>
                        {!mensaje.leido && (
                          <span className="bg-blue-500 rounded-full h-3 w-3"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              {mensajeSeleccionado ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#1E2A4A]">{mensajeSeleccionado.nombre}</h2>
                      <p className="text-gray-600">{mensajeSeleccionado.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatearFecha(mensajeSeleccionado.fecha_creacion)}
                      </p>
                    </div>
                    <div>
                      {!mensajeSeleccionado.leido && (
                        <Button
                          onClick={() => marcarComoLeido(mensajeSeleccionado.id)}
                          className="bg-[#00A3FF] hover:bg-blue-700 text-white text-sm"
                        >
                          Marcar como leído
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      {mensajeSeleccionado.tipo_consulta}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="whitespace-pre-wrap">{mensajeSeleccionado.mensaje}</p>
                  </div>
                  
                  <div className="mt-6 flex space-x-2">
                    <Button
                      onClick={() => window.location.href = `mailto:${mensajeSeleccionado.email}`}
                      className="bg-[#1E2A4A] hover:bg-[#00A3FF] text-white"
                    >
                      Responder por Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center h-full flex items-center justify-center">
                  <p className="text-gray-500">Selecciona un mensaje para ver su contenido</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 