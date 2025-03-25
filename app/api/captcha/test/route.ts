import { NextRequest, NextResponse } from 'next/server';
import { verificarToken } from '@/lib/services/recaptchaService';

/**
 * Endpoint para probar la funcionalidad de reCAPTCHA
 * POST: Recibe un token de reCAPTCHA y lo verifica
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verificar que se haya proporcionado un token
    if (!body.token) {
      return NextResponse.json(
        { error: 'Se requiere un token de reCAPTCHA' },
        { status: 400 }
      );
    }
    
    // Verificar el token con Google
    const recaptchaResult = await verificarToken(body.token);
    
    // Si la verificación falló, devolver un código de error 403 (Forbidden)
    if (!recaptchaResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Verificación reCAPTCHA fallida',
        errorCodes: recaptchaResult.errorCodes
      }, { status: 403 });
    }
    
    // Solo si la verificación fue exitosa, devolver código 200 con todos los datos
    return NextResponse.json({
      success: recaptchaResult.success,
      score: recaptchaResult.score,
      action: recaptchaResult.action,
      challengeTimestamp: recaptchaResult.challengeTimestamp,
      hostname: recaptchaResult.hostname,
      isBot: recaptchaResult.score ? recaptchaResult.score < 0.5 : null
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error al verificar el token de reCAPTCHA:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de verificación' },
      { status: 500 }
    );
  }
} 