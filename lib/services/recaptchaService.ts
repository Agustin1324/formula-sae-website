/**
 * Servicio para verificar el token de reCAPTCHA
 */

/**
 * Verifica un token de reCAPTCHA con la API de Google
 * @param token - El token generado por reCAPTCHA en el cliente
 * @returns Un objeto con el resultado de la verificación
 */
export async function verificarToken(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('La clave secreta de reCAPTCHA no está configurada');
      return { success: false, error: 'Configuración de reCAPTCHA incorrecta' };
    }
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const data = await response.json();
    
    return {
      success: data.success,
      score: data.score,
      action: data.action,
      challengeTimestamp: data['challenge_ts'],
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error) {
    console.error('Error al verificar el token de reCAPTCHA:', error);
    return { success: false, error: 'Error al verificar el token de reCAPTCHA' };
  }
} 