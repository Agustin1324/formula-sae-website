import { createClient } from '@supabase/supabase-js';

// Estos valores deben venir de variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan las variables de entorno de Supabase. Por favor, configúralas.');
}

export const supabase = createClient(supabaseUrl, supabaseKey); 