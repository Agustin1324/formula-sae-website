import { NextRequest, NextResponse } from 'next/server';
import { marcarMensajeComoLeido } from '@/lib/services/contactService';

// PATCH: Marcar un mensaje como leído
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID del mensaje es requerido' },
        { status: 400 }
      );
    }
    
    const result = await marcarMensajeComoLeido(id);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Error al marcar el mensaje como leído' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Mensaje marcado como leído exitosamente', data: result.data },
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