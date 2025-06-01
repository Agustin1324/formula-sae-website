import { NextRequest, NextResponse } from 'next/server';
import { crearMensajeContacto, obtenerMensajesContacto, marcarMensajeComoLeido } from '@/lib/services/contactService';
import { enviarNotificacionMensajeContacto, enviarCorreoConfirmacionContacto } from '@/lib/services/emailService';
import { verificarToken } from '@/lib/services/recaptchaService';

// POST: Crear un nuevo mensaje de contacto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar los campos requeridos
    if (!body.nombre || !body.email || !body.tipo_consulta || !body.mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Verificar el token de reCAPTCHA
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { error: 'La verificación reCAPTCHA es requerida' },
        { status: 400 }
      );
    }
    
    // Verificar el token con Google
    const recaptchaResult = await verificarToken(body.recaptchaToken);
    
    if (!recaptchaResult.success) {
      console.error('Error de verificación reCAPTCHA:', recaptchaResult.errorCodes);
      return NextResponse.json(
        { error: 'Verificación reCAPTCHA fallida. Por favor, inténtalo de nuevo.' },
        { status: 403 }
      );
    }
    
    const mensajeContacto = {
      nombre: body.nombre,
      email: body.email,
      tipo_consulta: body.tipo_consulta,
      mensaje: body.mensaje
    };
    
    // Crear el mensaje en la base de datos
    const resultDB = await crearMensajeContacto(mensajeContacto);
    
    if (!resultDB.success) {
      console.error('Error al crear el mensaje en la base de datos:', resultDB.error);
      return NextResponse.json(
        { error: 'Error al crear el mensaje de contacto' },
        { status: 500 }
      );
    }
    
    // Enviar notificación por correo electrónico al equipo
    const resultNotificacionEquipo = await enviarNotificacionMensajeContacto(mensajeContacto);
    
    if (!resultNotificacionEquipo.success) {
      console.warn('Se creó el mensaje de contacto pero hubo un error al enviar la notificación al equipo por correo electrónico:', resultNotificacionEquipo.error);
    }

    // Enviar correo de confirmación al remitente
    const resultConfirmacionRemitente = await enviarCorreoConfirmacionContacto(mensajeContacto);

    if (!resultConfirmacionRemitente.success) {
      console.warn('Se creó el mensaje de contacto pero hubo un error al enviar el correo de confirmación al remitente:', resultConfirmacionRemitente.error);
    }
    
    return NextResponse.json(
      { 
        message: 'Mensaje de contacto creado exitosamente', 
        data: resultDB.data,
        notificacionEquipoEnviada: resultNotificacionEquipo.success,
        confirmacionRemitenteEnviada: resultConfirmacionRemitente.success
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// GET: Obtener todos los mensajes de contacto
export async function GET() {
  try {
    const result = await obtenerMensajesContacto();
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Error al obtener los mensajes de contacto' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { data: result.data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
