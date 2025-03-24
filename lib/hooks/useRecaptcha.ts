import { useRef, useState, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Hook personalizado para manejar la integración de reCAPTCHA en formularios
 */
export const useRecaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /**
   * Maneja el cambio en el componente reCAPTCHA
   * @param token - El token generado por reCAPTCHA o null si ha expirado
   */
  const handleRecaptchaChange = useCallback((token: string | null) => {
    setCaptchaToken(token);
  }, []);

  /**
   * Ejecuta la verificación de reCAPTCHA programáticamente
   * Útil para formularios con reCAPTCHA invisible
   */
  const executeRecaptcha = useCallback(async () => {
    if (recaptchaRef.current) {
      try {
        const token = await recaptchaRef.current.executeAsync();
        setCaptchaToken(token);
        return token;
      } catch (error) {
        console.error('Error al ejecutar reCAPTCHA:', error);
        return null;
      }
    }
    return null;
  }, []);

  /**
   * Reinicia el componente reCAPTCHA
   */
  const resetRecaptcha = useCallback(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
  }, []);

  return {
    captchaToken,
    recaptchaRef,
    handleRecaptchaChange,
    executeRecaptcha,
    resetRecaptcha
  };
};

export default useRecaptcha; 