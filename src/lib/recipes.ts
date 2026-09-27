import { supabase } from '../lib/supabase'
import type { Recipe, RecipeIngredient } from '../types'

interface RecetaRow {
  id: string
  titulo: string
  descripcion: string | null
  foto_url: string | null
  created_at: string
  updated_at: string
  receta_ingredientes: {
    id: string
    nombre: string
    icono: string
    cantidad_gramos: number
    orden: number
  }[]
}

function mapRow(row: RecetaRow): Recipe {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion ?? '',
    fotoUrl: row.foto_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ingredientes: [...row.receta_ingredientes]
      .sort((a, b) => a.orden - b.orden)
      .map<RecipeIngredient>((ing) => ({
        id: ing.id,
        nombre: ing.nombre,
        icono: ing.icono,
        cantidadGramos: ing.cantidad_gramos,
        orden: ing.orden,
      })),
  }
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recetas')
    .select('*, receta_ingredientes(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as RecetaRow[]).map(mapRow)
}

export interface SaveRecipeInput {
  id?: string
  titulo: string
  descripcion: string
  fotoUrl: string | null
  ingredientes: Omit<RecipeIngredient, 'id'>[]
}

export async function saveRecipe(input: SaveRecipeInput): Promise<string> {
  let recetaId = input.id

  if (recetaId) {
    const { error } = await supabase
      .from('recetas')
      .update({
        titulo: input.titulo,
        descripcion: input.descripcion,
        foto_url: input.fotoUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', recetaId)
    if (error) throw error

    const { error: deleteError } = await supabase
      .from('receta_ingredientes')
      .delete()
      .eq('receta_id', recetaId)
    if (deleteError) throw deleteError
  } else {
    const { data, error } = await supabase
      .from('recetas')
      .insert({
        titulo: input.titulo,
        descripcion: input.descripcion,
        foto_url: input.fotoUrl,
      })
      .select('id')
      .single()
    if (error) throw error
    recetaId = data.id as string
  }

  if (input.ingredientes.length > 0) {
    const { error: insertError } = await supabase.from('receta_ingredientes').insert(
      input.ingredientes.map((ing) => ({
        receta_id: recetaId,
        nombre: ing.nombre,
        icono: ing.icono,
        cantidad_gramos: ing.cantidadGramos,
        orden: ing.orden,
      }))
    )
    if (insertError) throw insertError
  }

  return recetaId!
}

export async function deleteRecipe(id: string): Promise<void> {
  const { error } = await supabase.from('recetas').delete().eq('id', id)
  if (error) throw error
}
