"use client";

import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/lib/hooks/useRecaptcha";
import { Button } from "@/components/ui/button";
import DdosSimulator from '@/components/captcha/DdosSimulator';
import CaptchaInfoCard from '@/components/captcha/CaptchaInfoCard';
import Link from 'next/link';

export default function CaptchaTest() {
  const { recaptchaRef, executeRecaptcha, resetRecaptcha } = useRecaptcha();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'normal' | 'advanced'>('normal');
  const [simulationResults, setSimulationResults] = useState<any>(null);

  const handleTestCaptcha = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Ejecutar reCAPTCHA
      const token = await executeRecaptcha();
      
      if (!token) {
        setError('Error al obtener el token de reCAPTCHA');
        return;
      }
      
      // Enviar el token al endpoint de prueba
      const response = await fetch('/api/captcha/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en la verificación');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al verificar el captcha');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSimulationComplete = (results: any) => {
    setSimulationResults(results);
  };
  
  const resetTest = () => {
    setResult(null);
    setError(null);
    resetRecaptcha();
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prueba de reCAPTCHA</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'normal' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('normal')}
          >
            Prueba Básica
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'advanced' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('advanced')}
          >
            Simulación Avanzada
          </button>
        </div>
        
        <Link href="/recaptcha-debug">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Pruebas Reales con Form
          </Button>
        </Link>
      </div>
      
      {activeTab === 'normal' ? (
        <>
          {!result ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Prueba como humano</h2>
              <p className="text-gray-600 mb-4">
                Esta prueba verifica que el captcha funcione correctamente cuando un humano 
                completa la verificación.
              </p>
              
              <div className="mb-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                />
              </div>
              
              <Button 
                onClick={handleTestCaptcha}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Verificando...' : 'Probar como humano'}
              </Button>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Resultado de la prueba</h2>
              
              <div>
                <div className="mb-4">
                  <span className="font-medium">Verificación exitosa:</span> {result.success ? 'Sí' : 'No'}
                </div>
                
                {result.score !== undefined && (
                  <div className="mb-4">
                    <span className="font-medium">Puntuación:</span> {result.score}
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            result.score > 0.7 ? 'bg-green-600' : 
                            result.score > 0.5 ? 'bg-yellow-400' : 'bg-red-600'
                          }`}
                          style={{ width: `${result.score * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Bot</span>
                        <span>Humano</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {result.isBot !== null && (
                  <div className="mb-4">
                    <span className="font-medium">Detectado como bot:</span> {result.isBot ? 'Sí' : 'No'}
                  </div>
                )}
                
                {result.action && (
                  <div className="mb-4">
                    <span className="font-medium">Acción:</span> {result.action}
                  </div>
                )}
                
                {result.challengeTimestamp && (
                  <div className="mb-4">
                    <span className="font-medium">Marca de tiempo:</span> {result.challengeTimestamp}
                  </div>
                )}
                
                {result.hostname && (
                  <div className="mb-4">
                    <span className="font-medium">Hostname:</span> {result.hostname}
                  </div>
                )}
                
                {result.errorCodes && result.errorCodes.length > 0 && (
                  <div className="mb-4">
                    <span className="font-medium">Códigos de error:</span> {result.errorCodes.join(', ')}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button onClick={resetTest} className="bg-gray-600 hover:bg-gray-700 text-white">
                  Realizar otra prueba
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Simulación de Ataque DDoS</h2>
            <p className="text-gray-600 mb-6">
              Esta herramienta permite simular un ataque DDoS contra tu sitio web para comprobar la 
              efectividad de tu protección reCAPTCHA. La simulación enviará múltiples solicitudes con 
              tokens de reCAPTCHA inválidos para verificar que el sistema los rechace correctamente.
            </p>
            
            {/* Componente de simulación de DDoS */}
            <DdosSimulator 
              endpoint="/api/captcha/test" 
              requestsCount={10}
              interval={200}
              onComplete={handleSimulationComplete}
            />
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <CaptchaInfoCard />
      </div>
      
      <div className="mt-6 p-4 border border-purple-200 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">¿Necesitas probar con formularios reales?</h3>
        <p className="text-purple-700 mb-3">
          Si quieres realizar pruebas más realistas, puedes usar el depurador avanzado que envía 
          formularios completos a la base de datos y verifica el flujo completo de reCAPTCHA.
        </p>
        <Link href="/recaptcha-debug">
          <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
            Ir al depurador avanzado
          </Button>
        </Link>
      </div>
    </div>
  );
} 