import { supabase } from '../../../lib/supabase';
import { enviarNotificacionPingMantenimiento } from '../../../lib/services/emailService';

export async function GET() {
  try {
    // 1. Realizar una consulta simple para mantener la base de datos activa
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);

    if (contactError) {
      console.error('Error al hacer ping a Supabase (consulta de contacto):', contactError);
      return new Response(JSON.stringify({ message: 'Error al hacer ping a Supabase', error: contactError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Insertar un registro en la tabla ping_logs
    const { data: logData, error: logError } = await supabase
      .from('ping_logs')
      .insert({}) // No necesitamos insertar datos específicos, el timestamp se genera automáticamente
      .select();

    if (logError) {
      console.error('Error al registrar el ping en ping_logs:', logError);
      // Aunque haya un error al registrar, el ping a la DB principal fue exitoso, así que no retornamos error 500
    } else {
      console.log('Ping registrado en ping_logs:', logData);
    }

    // 3. Enviar notificación por correo electrónico
    const emailResult = await enviarNotificacionPingMantenimiento();
    if (!emailResult.success) {
      console.error('Error al enviar el correo de notificación de ping:', emailResult.error);
    } else {
      console.log('Correo de notificación de ping enviado exitosamente.');
    }

    return new Response(JSON.stringify({ message: 'Ping a Supabase exitoso y registrado', contactData, logData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('Excepción al hacer ping a Supabase:', e);
    return new Response(JSON.stringify({ message: 'Excepción al hacer ping a Supabase', error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
