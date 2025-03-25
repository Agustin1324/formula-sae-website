"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface DdosSimulatorProps {
  endpoint: string;
  requestsCount?: number;
  interval?: number;
  onComplete?: (results: any) => void;
}

export default function DdosSimulator({
  endpoint,
  requestsCount = 10,
  interval = 100,
  onComplete
}: DdosSimulatorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentResults, setCurrentResults] = useState<any[]>([]);
  const [stats, setStats] = useState<{
    requestsSent: number;
    successCount: number;
    failureCount: number;
    averageTime: number;
    startTime: number;
    endTime: number;
  } | null>(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentResults([]);
    
    const results = [];
    const startTime = Date.now();
    
    for (let i = 0; i < requestsCount; i++) {
      // Actualizar progreso
      setProgress(Math.floor((i / requestsCount) * 100));
      
      // Generar un token inválido para simular solicitudes automatizadas
      const fakeToken = `fake_token_${Math.random().toString(36).substring(7)}`;
      
      try {
        const requestStart = Date.now();
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: fakeToken }),
        });
        
        const requestTime = Date.now() - requestStart;
        const data = await response.json();
        
        results.push({
          requestNumber: i + 1,
          success: response.status === 200,
          statusCode: response.status,
          time: requestTime,
          data
        });
        
        setCurrentResults([...results]);
      } catch (error) {
        results.push({
          requestNumber: i + 1,
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
        
        setCurrentResults([...results]);
      }
      
      // Esperar el intervalo entre solicitudes para no sobrecargr
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    const endTime = Date.now();
    
    // Calcular estadísticas
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;
    const totalTime = endTime - startTime;
    const validTimeResults = results.filter(r => r.time !== undefined);
    const averageTime = validTimeResults.length > 0 
      ? validTimeResults.reduce((sum, r) => sum + r.time, 0) / validTimeResults.length 
      : 0;
    
    const finalStats = {
      requestsSent: results.length,
      successCount: successCount,
      failureCount: failureCount,
      averageTime: averageTime,
      startTime: startTime,
      endTime: endTime
    };
    
    setStats(finalStats);
    setProgress(100);
    setIsRunning(false);
    
    if (onComplete) {
      onComplete({
        results,
        stats: finalStats,
        timeTaken: totalTime
      });
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-xl font-medium mb-4">Simulador de ataques DDoS</h3>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Esta herramienta simula un ataque DDoS enviando múltiples solicitudes automatizadas
          con tokens de reCAPTCHA inválidos. Te ayuda a verificar que tu protección contra ataques
          funciona correctamente.
        </p>
        
        {!isRunning && !stats ? (
          <Button 
            onClick={runSimulation}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Iniciar simulación ({requestsCount} solicitudes)
          </Button>
        ) : isRunning ? (
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>Progreso: {progress}% - {currentResults.length} de {requestsCount} solicitudes</p>
          </div>
        ) : null}
        
        {/* Resultados en tiempo real */}
        {currentResults.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Solicitudes realizadas: {currentResults.length}</h4>
            <div className="max-h-60 overflow-y-auto border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Respuesta</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentResults.map((result, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{result.requestNumber}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.statusCode || (result.success ? '200' : 'Error')}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {result.error || (result.data?.error || (
                          result.data?.success === false ? 'Verificación fallida' : 'OK'
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Estadísticas finales */}
        {stats && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Resultados de la simulación</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p><span className="font-medium">Solicitudes totales:</span> {stats.requestsSent}</p>
                <p><span className="font-medium">Exitosas:</span> {stats.successCount} ({Math.round(stats.successCount / stats.requestsSent * 100)}%)</p>
                <p><span className="font-medium">Fallidas:</span> {stats.failureCount} ({Math.round(stats.failureCount / stats.requestsSent * 100)}%)</p>
              </div>
              <div>
                <p><span className="font-medium">Tiempo total:</span> {stats.endTime - stats.startTime}ms</p>
                <p><span className="font-medium">Tiempo promedio por solicitud:</span> {Math.round(stats.averageTime)}ms</p>
              </div>
            </div>
            
            <div className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded-md">
              <p className="font-medium">Conclusión:</p>
              {stats.failureCount === stats.requestsSent ? (
                <p>
                  ¡Excelente! Tu sistema de reCAPTCHA está funcionando correctamente. 
                  Todas las solicitudes automatizadas fueron rechazadas, lo que indica que 
                  tu protección contra ataques DDoS está activa.
                </p>
              ) : stats.failureCount > stats.requestsSent * 0.8 ? (
                <p>
                  Tu sistema de reCAPTCHA está funcionando bien, rechazando la mayoría de 
                  solicitudes automatizadas. Sin embargo, algunas solicitudes fueron aceptadas, 
                  lo que podría indicar un área de mejora en la configuración.
                </p>
              ) : (
                <p>
                  Tu sistema de reCAPTCHA no está rechazando suficientes solicitudes automatizadas. 
                  Esto podría indicar un problema con tu configuración o implementación. Revisa 
                  que las claves de reCAPTCHA estén correctamente configuradas y que estés validando 
                  los tokens adecuadamente.
                </p>
              )}
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => {
                  setStats(null);
                  setCurrentResults([]);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Reiniciar simulador
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 