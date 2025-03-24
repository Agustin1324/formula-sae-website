import { NextRequest, NextResponse } from 'next/server';
import { crearMensajeContacto, obtenerMensajesContacto, marcarMensajeComoLeido } from '@/lib/services/contactService';

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
    
    const result = await crearMensajeContacto({
      nombre: body.nombre,
      email: body.email,
      tipo_consulta: body.tipo_consulta,
      mensaje: body.mensaje
    });
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Error al crear el mensaje de contacto' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Mensaje de contacto creado exitosamente', data: result.data },
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