import { NextResponse } from 'next/server';

/**
 * Endpoint para verificar la configuración de reCAPTCHA
 * GET: Devuelve información sobre la configuración actual
 */
export async function GET() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  // Verificar requisitos mínimos de longitud para las claves
  const isValidSiteKeyFormat = siteKey && siteKey.length > 30;
  const isValidSecretKeyFormat = secretKey && secretKey.length > 30;
  
  return NextResponse.json({
    // Información sobre las claves (sin exponerlas completamente)
    siteKeyConfigured: !!siteKey,
    siteKeyFormat: isValidSiteKeyFormat ? 'Válido' : 'Inválido (demasiado corto)',
    siteKeyFirstChars: siteKey ? `${siteKey.substring(0, 5)}...${siteKey.substring(siteKey.length - 3)}` : 'No configurado',
    
    secretKeyConfigured: !!secretKey,
    secretKeyFormat: isValidSecretKeyFormat ? 'Válido' : 'Inválido (demasiado corto)',
    secretKeyFirstChars: secretKey ? `${secretKey.substring(0, 3)}...${secretKey.substring(secretKey.length - 3)}` : 'No configurado',
    
    // Información del entorno
    environment: process.env.NODE_ENV || 'development',
    
    // Instrucciones útiles
    suggestion: !isValidSiteKeyFormat || !isValidSecretKeyFormat ? 
      'Las claves de reCAPTCHA parecen tener un formato incorrecto. Verifica que estén completas y correctas.' : 
      'El formato de las claves parece correcto. Si sigues teniendo problemas, verifica los dominios autorizados en la consola de reCAPTCHA.'
  });
} 