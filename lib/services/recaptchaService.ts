/**
 * Servicio para verificar el token de reCAPTCHA
 */

/**
 * Verifica un token de reCAPTCHA con la API de Google
 * @param token - El token generado por reCAPTCHA en el cliente
 * @returns Un objeto con el resultado de la verificación
 */
export async function verificarToken(token: string) {
  console.log('⚠️ Iniciando verificación reCAPTCHA');
  
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    // Log primeros caracteres para verificar que la clave existe (sin comprometer seguridad)
    console.log(`🔑 Clave secreta disponible: ${secretKey ? 'Sí (primeros caracteres: ' + secretKey.substring(0, 3) + '...)' : 'No'}`);
    
    if (!secretKey) {
      console.error('❌ ERROR: La clave secreta de reCAPTCHA no está configurada');
      return { success: false, error: 'Configuración de reCAPTCHA incorrecta' };
    }
    
    // Verificar que el token no sea vacío o inválido obviamente
    if (!token || token.length < 20 || token.startsWith('fake_token_')) {
      console.error('❌ Token inválido o de prueba detectado');
      return { 
        success: false, 
        error: 'Token de reCAPTCHA inválido',
        errorCodes: ['invalid-input-response']
      };
    }
    
    console.log(`📤 Enviando solicitud a Google reCAPTCHA API con token: ${token.substring(0, 10)}...`);
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    if (!response.ok) {
      console.error('❌ Error en la respuesta HTTP de Google:', response.status, response.statusText);
      return { 
        success: false, 
        error: `Error en la solicitud a Google: ${response.status} ${response.statusText}` 
      };
    }
    
    const data = await response.json();
    
    console.log('📥 Respuesta de Google reCAPTCHA:', data);
    
    // Si hay errores, registrar detalles específicos
    if (!data.success && data['error-codes']) {
      console.error('❌ Errores reportados por Google:', data['error-codes']);
      
      if (data['error-codes'].includes('timeout-or-duplicate')) {
        console.warn('⚠️ Token expirado o ya utilizado. Cada token solo puede verificarse UNA VEZ.');
      }
      
      if (data['error-codes'].includes('invalid-input-secret')) {
        console.error('❌ La clave secreta enviada a Google es inválida. Verifica la configuración.');
      }
    }
    
    return {
      success: data.success,
      score: data.score,
      action: data.action,
      challengeTimestamp: data['challenge_ts'],
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    };
  } catch (error) {
    console.error('❌ Error al verificar el token de reCAPTCHA:', error);
    return { success: false, error: 'Error al verificar el token de reCAPTCHA' };
  }
} 