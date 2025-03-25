"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import useRecaptcha from "@/lib/hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";

// Datos de prueba para envíos reales
const testData = [
  { nombre: "Prueba Captcha 1", email: "test1@example.com", tipo_consulta: "Consulta general", mensaje: "Mensaje de prueba automática #1 para verificar reCAPTCHA" },
  { nombre: "Prueba Captcha 2", email: "test2@example.com", tipo_consulta: "Propuesta de sponsoreo", mensaje: "Mensaje de prueba automática #2 para verificar reCAPTCHA" },
  { nombre: "Prueba Captcha 3", email: "test3@example.com", tipo_consulta: "Quiero unirme al equipo", mensaje: "Mensaje de prueba automática #3 para verificar reCAPTCHA" },
  { nombre: "Prueba Captcha 4", email: "test4@example.com", tipo_consulta: "Consulta general", mensaje: "Mensaje de prueba automática #4 para verificar reCAPTCHA" },
  { nombre: "Prueba Captcha 5", email: "test5@example.com", tipo_consulta: "Propuesta de sponsoreo", mensaje: "Mensaje de prueba automática #5 para verificar reCAPTCHA" }
];

export default function RecaptchaDebugger() {
  const { recaptchaRef, executeRecaptcha, resetRecaptcha } = useRecaptcha();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [configInfo, setConfigInfo] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'real'>('basic');
  const [testCount, setTestCount] = useState(3); // Número de pruebas reales a enviar
  const [realTestLoading, setRealTestLoading] = useState(false);
  const [realTestProgress, setRealTestProgress] = useState(0);

  // Cargar información de configuración al inicio
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch('/api/test-recaptcha-config');
        if (response.ok) {
          const data = await response.json();
          setConfigInfo(data);
        }
      } catch (error) {
        console.error('Error al verificar configuración:', error);
      }
    };
    
    checkConfig();
  }, []);

  // Obtener un nuevo token de reCAPTCHA
  const handleGetToken = async () => {
    setLoading(true);
    try {
      const newToken = await executeRecaptcha();
      setToken(newToken);
      
      setResults([
        ...results,
        {
          action: 'Generar token',
          timestamp: new Date().toISOString(),
          success: !!newToken,
          details: newToken ? `Token generado (primeros 10 caracteres: ${newToken.substring(0, 10)}...)` : 'Error al generar token'
        }
      ]);
    } catch (error) {
      console.error('Error al obtener token:', error);
      
      setResults([
        ...results,
        {
          action: 'Generar token',
          timestamp: new Date().toISOString(),
          success: false,
          details: `Error: ${error instanceof Error ? error.message : 'Desconocido'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Verificar el token actual
  const handleVerifyToken = async () => {
    if (!token) {
      setResults([
        ...results,
        {
          action: 'Verificar token',
          timestamp: new Date().toISOString(),
          success: false,
          details: 'No hay token disponible para verificar'
        }
      ]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/captcha/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      const data = await response.json();
      
      setResults([
        ...results,
        {
          action: 'Verificar token (1ª vez)',
          timestamp: new Date().toISOString(),
          success: response.ok,
          status: response.status,
          details: data.success ? 'Verificación exitosa' : 
            `Error: ${data.error || 'Desconocido'} - Códigos: ${data.errorCodes?.join(', ') || 'Ninguno'}`
        }
      ]);
      
    } catch (error) {
      console.error('Error al verificar token:', error);
      
      setResults([
        ...results,
        {
          action: 'Verificar token (1ª vez)',
          timestamp: new Date().toISOString(),
          success: false,
          details: `Error: ${error instanceof Error ? error.message : 'Desconocido'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Verificar el mismo token por segunda vez (debería fallar con timeout-or-duplicate)
  const handleVerifyTokenAgain = async () => {
    if (!token) {
      setResults([
        ...results,
        {
          action: 'Verificar token (2ª vez)',
          timestamp: new Date().toISOString(),
          success: false,
          details: 'No hay token disponible para verificar'
        }
      ]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/captcha/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      const data = await response.json();
      
      // Esto debería fallar con el error timeout-or-duplicate si el token ya se verificó
      setResults([
        ...results,
        {
          action: 'Verificar token (2ª vez)',
          timestamp: new Date().toISOString(),
          success: response.ok,
          status: response.status,
          details: data.success ? 'Verificación exitosa (¡inesperado!)' : 
            `Error: ${data.error || 'Desconocido'} - Códigos: ${data.errorCodes?.join(', ') || 'Ninguno'}`
        }
      ]);
      
    } catch (error) {
      console.error('Error al verificar token:', error);
      
      setResults([
        ...results,
        {
          action: 'Verificar token (2ª vez)',
          timestamp: new Date().toISOString(),
          success: false,
          details: `Error: ${error instanceof Error ? error.message : 'Desconocido'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Realizar prueba real con envío de formulario a la API de contacto
  const handleRealTest = async () => {
    setRealTestLoading(true);
    setRealTestProgress(0);
    
    const newResults = [...results];
    let successCount = 0;
    
    // Limitar a las primeras testCount entradas o el total disponible
    const testDataToUse = testData.slice(0, Math.min(testCount, testData.length));
    
    try {
      for (let i = 0; i < testDataToUse.length; i++) {
        try {
          // Actualizar progreso
          setRealTestProgress(Math.floor(((i + 1) / testDataToUse.length) * 100));
          
          // Añadir mensaje de inicio de prueba
          newResults.push({
            action: `Prueba real #${i + 1} - Iniciando`,
            timestamp: new Date().toISOString(),
            success: true,
            status: null,
            details: `Preparando para enviar mensaje para: ${testDataToUse[i].nombre} (${testDataToUse[i].email})`
          });
          setResults([...newResults]);
          
          // Mostrar mensaje al usuario para cada prueba
          newResults.push({
            action: `Prueba real #${i + 1} - Esperando captcha`,
            timestamp: new Date().toISOString(),
            success: true,
            details: `⚠️ Por favor, resuelve el captcha para enviar el mensaje #${i + 1}`
          });
          setResults([...newResults]);
          
          // Completar captcha manualmente (el usuario debe resolver el captcha visible para cada mensaje)
          // No usamos timeout aquí porque queremos esperar a que el usuario resuelva el captcha
          // El captcha debe estar visible (configurado arriba como size="normal")
          await new Promise(resolve => {
            const checkCaptcha = () => {
              if (recaptchaRef.current?.getValue()) {
                resolve(true);
                return;
              }
              setTimeout(checkCaptcha, 1000); // Verificar cada segundo si el captcha ha sido resuelto
            };
            checkCaptcha();
          });
          
          // Una vez que el usuario ha resuelto el captcha, obtener su valor
          const token = recaptchaRef.current?.getValue() || null;
          
          if (!token) {
            newResults.push({
              action: `Prueba real #${i + 1} - Sin token`,
              timestamp: new Date().toISOString(),
              success: false,
              details: 'No se pudo obtener un token válido de reCAPTCHA'
            });
            setResults([...newResults]);
            
            // Resetear el captcha para la próxima prueba
            resetRecaptcha();
            continue;
          }
          
          // Realizar solicitud real a la API de contacto
          const testFormData = testDataToUse[i];
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos de timeout
          
          try {
            newResults.push({
              action: `Prueba real #${i + 1} - Enviando`,
              timestamp: new Date().toISOString(),
              success: true,
              details: `Enviando mensaje a la API con token verificado`
            });
            setResults([...newResults]);
            
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...testFormData,
                recaptchaToken: token
              }),
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            let data;
            try {
              data = await response.json();
            } catch (jsonError) {
              data = { error: 'Error al procesar la respuesta del servidor' };
            }
            
            if (response.ok) {
              successCount++;
            }
            
            newResults.push({
              action: `Prueba real #${i + 1} - Completada`,
              timestamp: new Date().toISOString(),
              success: response.ok,
              status: response.status,
              details: response.ok 
                ? `✅ Mensaje enviado correctamente: ${testFormData.nombre}` 
                : `❌ Error: ${data.error || `Código HTTP: ${response.status}`}`
            });
          } catch (fetchError) {
            clearTimeout(timeoutId);
            
            newResults.push({
              action: `Prueba real #${i + 1} - Error de red`,
              timestamp: new Date().toISOString(),
              success: false,
              details: fetchError instanceof Error 
                ? (fetchError.name === 'AbortError' 
                  ? 'La solicitud fue cancelada por tiempo de espera (15s)' 
                  : `Error: ${fetchError.message}`)
                : 'Error desconocido en la solicitud'
            });
          }
          
          // Actualizar resultados después de cada prueba
          setResults([...newResults]);
          
          // Resetear captcha para la próxima prueba - ESTO ES ESENCIAL
          resetRecaptcha();
          
          // Esperar un momento entre solicitudes
          await new Promise(resolve => setTimeout(resolve, 1500));
          
        } catch (iterationError) {
          console.error(`Error general en prueba real #${i + 1}:`, iterationError);
          
          newResults.push({
            action: `Prueba real #${i + 1} - Error general`,
            timestamp: new Date().toISOString(),
            success: false,
            details: `Error inesperado: ${iterationError instanceof Error ? iterationError.message : 'Desconocido'}`
          });
          
          // Actualizar resultados incluso si hay error
          setResults([...newResults]);
          resetRecaptcha();
        }
      }
      
      // Añadir resumen final
      newResults.push({
        action: 'Resumen pruebas reales',
        timestamp: new Date().toISOString(),
        success: successCount > 0,
        details: `✅ Completadas ${successCount} de ${testDataToUse.length} pruebas`
      });
      
    } catch (globalError) {
      console.error('Error global en la ejecución de pruebas:', globalError);
      
      // Asegurar que el resumen se añada incluso si hay un error global
      newResults.push({
        action: 'Error en pruebas',
        timestamp: new Date().toISOString(),
        success: false,
        details: `Error general: ${globalError instanceof Error ? globalError.message : 'Desconocido'}`
      });
    } finally {
      // Asegurar que estos estados siempre se actualicen al final
      setResults([...newResults]);
      setRealTestLoading(false);
      resetRecaptcha();
    }
  };

  // Limpiar resultados y resetear el captcha
  const handleReset = () => {
    setResults([]);
    setToken(null);
    resetRecaptcha();
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Depurador de reCAPTCHA</h2>
      
      {/* Información de configuración */}
      {configInfo && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Configuración de reCAPTCHA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <div className="flex justify-between">
                <span>Site Key:</span>
                <span className={configInfo.siteKeyConfigured ? 'text-green-600' : 'text-red-600'}>
                  {configInfo.siteKeyConfigured ? '✓ Configurado' : '✗ No configurado'}
                </span>
              </div>
              <div className="text-gray-600">{configInfo.siteKeyFirstChars}</div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span>Secret Key:</span>
                <span className={configInfo.secretKeyConfigured ? 'text-green-600' : 'text-red-600'}>
                  {configInfo.secretKeyConfigured ? '✓ Configurado' : '✗ No configurado'}
                </span>
              </div>
              <div className="text-gray-600">{configInfo.secretKeyFirstChars}</div>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <p className={configInfo.suggestion.includes('correcto') ? 'text-green-600' : 'text-yellow-600'}>
              {configInfo.suggestion}
            </p>
          </div>
        </div>
      )}
      
      {/* Widget de reCAPTCHA invisible */}
      <div className="mb-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          size={activeTab === 'real' ? 'normal' : 'invisible'}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        />
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'basic' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('basic')}
          >
            Prueba Básica
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'real' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('real')}
          >
            Prueba Real (Formulario)
          </button>
        </div>
      </div>
      
      {/* Controles de prueba basados en la tab activa */}
      {activeTab === 'basic' ? (
        <div className="space-y-3 mb-6">
          <Button 
            onClick={handleGetToken}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            1. Obtener nuevo token de reCAPTCHA
          </Button>
          
          <Button 
            onClick={handleVerifyToken}
            disabled={loading || !token}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            2. Verificar token (primera vez)
          </Button>
          
          <Button 
            onClick={handleVerifyTokenAgain}
            disabled={loading || !token}
            className="bg-yellow-600 hover:bg-yellow-700 text-white w-full"
          >
            3. Verificar token nuevamente (debe fallar)
          </Button>
          
          {/* Estado del token */}
          {token && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <p><span className="font-medium">Token actual:</span> {token.substring(0, 12)}...{token.substring(token.length - 5)}</p>
              <p className="text-xs text-gray-600">Longitud: {token.length} caracteres</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Prueba de formulario real</h3>
            <p className="text-sm text-blue-700 mb-3">
              Esta prueba envía mensajes reales al endpoint /api/contact con datos de prueba y verifica
              el flujo completo incluyendo la verificación de reCAPTCHA y el registro en la base de datos.
              <span className="font-bold block mt-2">IMPORTANTE: Deberás resolver un captcha para CADA mensaje. ¡Así es como funciona la protección real contra DDoS!</span>
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de pruebas a realizar:
              </label>
              <select 
                value={testCount}
                onChange={(e) => setTestCount(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={realTestLoading}
              >
                <option value={1}>1 prueba</option>
                <option value={2}>2 pruebas</option>
                <option value={3}>3 pruebas</option>
                <option value={5}>5 pruebas</option>
                <option value={10}>10 pruebas</option>
              </select>
              <p className="text-xs text-gray-600 mt-1">Recuerda: tendrás que resolver {testCount} captchas diferentes, uno para cada mensaje.</p>
            </div>
            
            {realTestLoading ? (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${realTestProgress}%` }}
                  />
                </div>
                <p className="text-sm">Progreso: {realTestProgress}%</p>
              </div>
            ) : (
              <Button 
                onClick={handleRealTest}
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
              >
                Iniciar prueba real ({testCount} {testCount === 1 ? 'mensaje' : 'mensajes'})
              </Button>
            )}
          </div>
          
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            <p className="text-yellow-800">
              <strong>Nota:</strong> Estas pruebas enviarán mensajes reales a la base de datos. 
              Los mensajes pueden ser identificados por el prefijo "Prueba Captcha" en el nombre 
              y las direcciones de correo con dominio example.com.
            </p>
          </div>
        </div>
      )}
      
      {/* Resultados de las pruebas */}
      {results.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Resultados de pruebas</h3>
            <button 
              onClick={handleReset}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Limpiar
            </button>
          </div>
          
          <div className="max-h-80 overflow-y-auto border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{result.action}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.success ? 'Éxito' : 'Error'} {result.status ? `(${result.status})` : ''}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-600">{result.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Explicación del problema timeout-or-duplicate */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm">
        <h4 className="font-medium text-yellow-800 mb-1">¿Por qué no veo estadísticas en Google?</h4>
        <p className="text-yellow-700 mb-2">
          Según la documentación oficial de Google, cada token de reCAPTCHA puede verificarse una sola vez. 
          Cuando intentas verificar un token por segunda vez, recibirás el error "timeout-or-duplicate".
        </p>
        <ul className="list-disc pl-5 text-yellow-700 space-y-1">
          <li>
            Las estadísticas en el panel de Google pueden tardar hasta 24 horas en actualizarse.
          </li>
          <li>
            Solo las verificaciones válidas (primera verificación exitosa) se registran en las estadísticas.
          </li>
          <li>
            Las verificaciones fallidas (como intentos duplicados o tokens inválidos) generalmente no
            se muestran en el panel de estadísticas.
          </li>
        </ul>
      </div>
    </div>
  );
} 