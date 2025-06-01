import { Resend } from 'resend';
import { ContactMessage } from './contactService';

// Configurar la API key de Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Envía una notificación por correo electrónico cuando se recibe un nuevo mensaje de contacto
 */
export async function enviarNotificacionMensajeContacto(mensaje: ContactMessage) {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #1E2A4A;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 5px 5px;
            }
            .message-box {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #777;
              text-align: center;
            }
            .label {
              font-weight: bold;
              color: #1E2A4A;
            }
            .tipo-consulta {
              display: inline-block;
              background-color: #00A3FF;
              color: white;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <p>Se ha recibido un nuevo mensaje de contacto a través del sitio web.</p>
            
            <p><span class="label">Nombre:</span> ${mensaje.nombre}</p>
            <p><span class="label">Email:</span> <a href="mailto:${mensaje.email}">${mensaje.email}</a></p>
            <p><span class="label">Tipo de consulta:</span> <span class="tipo-consulta">${mensaje.tipo_consulta}</span></p>
            
            <div class="message-box">
              <p><span class="label">Mensaje:</span></p>
              <p>${mensaje.mensaje.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="footer">
              <p>Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
      Nuevo mensaje de contacto
      
      Nombre: ${mensaje.nombre}
      Email: ${mensaje.email}
      Tipo de consulta: ${mensaje.tipo_consulta}
      
      Mensaje:
      ${mensaje.mensaje}
      
      Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.
    `;

    const { data, error } = await resend.emails.send({
      to: ['astrohmayer@fi.uba.ar', 'fiuba.racing@gmail.com'],
      from: 'no-reply@fiubaracing.com.ar', // Usar una dirección de tu dominio verificado en Resend
      subject: `Nuevo mensaje de contacto: ${mensaje.tipo_consulta}`,
      text: emailText,
      html: emailHtml,
    });

    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return { success: false, error };
    }
    return { success: true, response: data };
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return { success: false, error };
  }
}

/**
 * Envía una notificación por correo electrónico cuando se realiza un ping de mantenimiento a la base de datos.
 */
export async function enviarNotificacionPingMantenimiento() {
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #1E2A4A;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 5px 5px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Ping de Mantenimiento de Supabase</h1>
          </div>
          <div class="content">
            <p>Se ha realizado un ping de mantenimiento exitoso a la base de datos de Supabase.</p>
            <p>Esto asegura que la base de datos permanezca activa y no se apague por inactividad.</p>
            <p>Fecha y Hora: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })}</p>
            <div class="footer">
              <p>Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
      Ping de Mantenimiento de Supabase

      Se ha realizado un ping de mantenimiento exitoso a la base de datos de Supabase.
      Esto asegura que la base de datos permanezca activa y no se apague por inactividad.
      Fecha y Hora: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' })}

      Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.
    `;

    const { data, error } = await resend.emails.send({
      to: ['astrohmayer@fi.uba.ar', 'fiuba.racing@gmail.com'],
      from: 'no-reply@fiubaracing.com.ar', // Usar una dirección de tu dominio verificado en Resend
      subject: 'Notificación de Ping de Mantenibase',
      text: emailText,
      html: emailHtml,
    });

    if (error) {
      console.error('Error al enviar el correo electrónico de ping de mantenimiento:', error);
      return { success: false, error };
    }
    return { success: true, response: data };
  } catch (error) {
    console.error('Error al enviar el correo electrónico de ping de mantenimiento:', error);
    return { success: false, error };
  }
}
