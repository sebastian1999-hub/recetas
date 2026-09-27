export interface RecipeIngredient {
  id: string
  nombre: string
  icono: string
  cantidadGramos: number
  orden: number
}

export interface Recipe {
  id: string
  titulo: string
  descripcion: string
  fotoUrl: string | null
  ingredientes: RecipeIngredient[]
  createdAt: string
  updatedAt: string
}

export interface IngredientCatalogItem {
  nombre: string
  icono: string
  categoria: string
}
