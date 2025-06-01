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
      to: ['astrohmayer@fi.uba.ar', 'fiuba.racing@gmail.com'], // Enviar a ambos correos
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
 * Envía un correo electrónico de confirmación al remitente de un mensaje de contacto.
 */
export async function enviarCorreoConfirmacionContacto(mensaje: ContactMessage) {
  try {
    let subject: string;
    let emailHtml: string;
    let emailText: string;

    const commonStyles = `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        background-color: #f4f4f4;
      }
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #1E2A4A;
        color: white;
        padding: 25px 20px;
        text-align: center;
        border-bottom: 4px solid #00A3FF;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 25px 30px;
        color: #333333;
      }
      .content p {
        margin-bottom: 15px;
      }
      .message-box {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
        border: 1px solid #eeeeee;
      }
      .footer {
        margin-top: 25px;
        padding: 20px;
        font-size: 12px;
        color: #777;
        text-align: center;
        background-color: #f0f0f0;
        border-top: 1px solid #dddddd;
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
      a {
        color: #00A3FF;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `;

    if (mensaje.tipo_consulta === 'Propuesta de sponsoreo') {
      subject = '¡Gracias por tu interés en sponsorear a FIUBA Racing!';
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Gracias por tu interés! 🙌</h1>
              </div>
              <div class="content">
                <p>¡Hola ${mensaje.nombre}!</p>
                <p>¡Gracias por escribirnos! Nos alegra muchísimo que te interese nuestro proyecto y quieras sumarte como sponsor.</p>
                <p>Tu consulta fue recibida correctamente, y en breve estaremos poniéndonos en contacto para conversar sobre las posibles formas de colaboración.</p>
                <p>Mientras tanto, podés conocer más sobre nuestro trabajo en nuestro 
                  <a href="https://fiubaracing.com.ar/">sitio web</a>, 
                  <a href="https://www.instagram.com/fiubaracing/">Instagram</a> o 
                  <a href="https://www.linkedin.com/company/fiuba-racing-team/">LinkedIn</a>.
                </p>
                <p>¡Gracias por apoyar el desarrollo de la ingeniería y la educación pública!</p>
              </div>
              <div class="footer">
                <p>Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.</p>
              </div>
            </div>
          </body>
        </html>
      `;
      emailText = `
        ¡Hola ${mensaje.nombre}!

        ¡Gracias por escribirnos! Nos alegra muchísimo que te interese nuestro proyecto y quieras sumarte como sponsor. 🙌

        Tu consulta fue recibida correctamente, y en breve estaremos poniéndonos en contacto para conversar sobre las posibles formas de colaboración.

        Mientras tanto, podés conocer más sobre nuestro trabajo en nuestro sitio web (https://fiubaracing.com.ar/), Instagram (https://www.instagram.com/fiubaracing/) o LinkedIn (https://www.linkedin.com/company/fiuba-racing-team/).

        ¡Gracias por apoyar el desarrollo de la ingeniería y la educación pública!

        Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.
      `;
    } else {
      subject = 'Confirmación: Recibimos tu mensaje en FIUBA Racing';
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Mensaje Recibido</h1>
              </div>
              <div class="content">
                <p>Hola ${mensaje.nombre},</p>
                <p>Hemos recibido tu mensaje de contacto y lo revisaremos pronto. ¡Gracias por comunicarte con FIUBA Racing!</p>
                
                <p><span class="label">Tu Email:</span> <a href="mailto:${mensaje.email}">${mensaje.email}</a></p>
                <p><span class="label">Tu Tipo de consulta:</span> <span class="tipo-consulta">${mensaje.tipo_consulta}</span></p>
                
                <div class="message-box">
                  <p><span class="label">Tu Mensaje:</span></p>
                  <p>${mensaje.mensaje.replace(/\n/g, '<br>')}</p>
                </div>
                
                <p>Te vamos a estar contactando a la brevedad.</p>
              </div>
              <div class="footer">
                <p>Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.</p>
              </div>
            </div>
          </body>
        </html>
      `;
      emailText = `
        Hola ${mensaje.nombre},

        Hemos recibido tu mensaje de contacto y lo revisaremos pronto. ¡Gracias por comunicarte con FIUBA Racing!

        Tu Email: ${mensaje.email}
        Tu Tipo de consulta: ${mensaje.tipo_consulta}

        Tu Mensaje:
        ${mensaje.mensaje}

        Te vamos a estar contactando a la brevedad.

        Este es un mensaje automático enviado desde el sitio web de FIUBA Racing.
      `;
    }

    const { data, error } = await resend.emails.send({
      to: mensaje.email, // Enviar al remitente original
      from: 'no-reply@fiubaracing.com.ar', // Usar una dirección de tu dominio verificado en Resend
      subject: subject,
      text: emailText,
      html: emailHtml,
    });

    if (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      return { success: false, error };
    }
    return { success: true, response: data };
  } catch (error) {
    console.error('Excepción al enviar el correo de confirmación:', error);
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
      to: 'astrohmayer@fi.uba.ar', // Enviar solo a esta dirección
      from: 'no-reply@fiubaracing.com.ar', // Usar una dirección de tu dominio verificado en Resend
      subject: 'Notificación de Ping de Mantenimiento de Supabase',
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
