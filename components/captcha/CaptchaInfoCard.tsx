import { FaShieldAlt, FaUserCheck, FaChartLine, FaClock, FaServer } from 'react-icons/fa';

export default function CaptchaInfoCard() {
  return (
    <div className="bg-blue-50 rounded-lg p-5">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaShieldAlt className="mr-2 text-blue-600" /> 
        ¿Cómo funciona reCAPTCHA contra ataques DDoS?
      </h3>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Google reCAPTCHA es una herramienta eficaz para prevenir ataques de denegación 
          de servicio (DDoS) actuando como un filtro que diferencia entre tráfico humano 
          legítimo y solicitudes automatizadas maliciosas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-blue-700 font-medium mb-2">
              <FaUserCheck className="mr-2" /> Validación de humanos
            </div>
            <p className="text-sm text-gray-600">
              Requiere que los usuarios demuestren ser humanos antes de procesar solicitudes,
              limitando así el tráfico automatizado malicioso.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-blue-700 font-medium mb-2">
              <FaChartLine className="mr-2" /> Sistema de puntuación
            </div>
            <p className="text-sm text-gray-600">
              Analiza el comportamiento del usuario para determinar la probabilidad 
              de que sea un humano (puntuación entre 0.0 y 1.0).
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-blue-700 font-medium mb-2">
              <FaServer className="mr-2" /> Detección adaptativa
            </div>
            <p className="text-sm text-gray-600">
              Aumenta los desafíos para usuarios sospechosos, aplicando medidas más 
              estrictas cuando detecta patrones de comportamiento anómalos.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-blue-700 font-medium mb-2">
              <FaClock className="mr-2" /> Tokens temporales
            </div>
            <p className="text-sm text-gray-600">
              Los tokens solo son válidos por un tiempo limitado, evitando 
              la reutilización en ataques automatizados.
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
          <h4 className="font-medium text-yellow-800 mb-2">Prevención de ataques DDoS</h4>
          <p className="text-sm text-yellow-700">
            Al limitar la capacidad de los bots para enviar grandes volúmenes de solicitudes
            automatizadas, reCAPTCHA reduce significativamente la eficacia de los ataques DDoS.
            Esto permite que tu servidor se concentre en procesar solicitudes legítimas en lugar
            de desperdiciar recursos en tráfico malicioso.
          </p>
        </div>
        
        <div className="text-sm text-gray-500 mt-2">
          <p>
            Para una protección más completa contra ataques DDoS, considera combinar reCAPTCHA con:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Limitación de tasa (rate limiting)</li>
            <li>Servicios de mitigación DDoS como Cloudflare</li>
            <li>Monitoreo de tráfico y alertas</li>
            <li>WAF (Web Application Firewall)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 