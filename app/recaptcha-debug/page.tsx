"use client";

import RecaptchaDebugger from '@/components/captcha/RecaptchaDebugger';

export default function RecaptchaDebugPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Depurador de reCAPTCHA</h1>
      
      <p className="mb-8 text-gray-600">
        Esta página te permite diagnosticar problemas con la integración de reCAPTCHA. 
        Podrás probar la obtención de tokens, verificar su validez y comprobar el comportamiento 
        con verificaciones duplicadas.
      </p>
      
      <RecaptchaDebugger />
    </div>
  );
} 