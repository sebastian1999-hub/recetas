import { supabase } from './supabase'

// Limpia y organiza la descripción con IA (Supabase Edge Function). Si falla, devuelve el texto original.
export async function tidyDescription(descripcion: string): Promise<string> {
  if (!descripcion.trim()) return descripcion

  try {
    const { data, error } = await supabase.functions.invoke<{ descripcion: string }>(
      'tidy-description',
      { body: { descripcion } }
    )
    if (error || !data?.descripcion) return descripcion
    return data.descripcion
  } catch {
    return descripcion
  }
}
