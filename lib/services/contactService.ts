import { supabase } from '../supabase';

export interface ContactMessage {
  nombre: string;
  email: string;
  tipo_consulta: string;
  mensaje: string;
}

export async function crearMensajeContacto(mensaje: ContactMessage) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          nombre: mensaje.nombre,
          email: mensaje.email,
          tipo_consulta: mensaje.tipo_consulta,
          mensaje: mensaje.mensaje
        }
      ])
      .select();

    if (error) {
      console.error('Error al crear mensaje de contacto:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error inesperado al crear mensaje de contacto:', error);
    return { success: false, error };
  }
}

export async function obtenerMensajesContacto() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('Error al obtener mensajes de contacto:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error inesperado al obtener mensajes de contacto:', error);
    return { success: false, error };
  }
}

export async function marcarMensajeComoLeido(id: string) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ leido: true })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error al marcar mensaje como leído:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error inesperado al marcar mensaje como leído:', error);
    return { success: false, error };
  }
} 