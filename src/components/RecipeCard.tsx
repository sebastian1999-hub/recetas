import { ChefHat, Trash2 } from 'lucide-react'
import type { Recipe } from '../types'
import { findCategoria } from '../data/ingredientCatalog'
import IconTile from './IconTile'

interface Props {
  recipe: Recipe
  onClick: () => void
  onDelete: () => void
}

export default function RecipeCard({ recipe, onClick, onDelete }: Props) {
  const previewIcons = recipe.ingredientes.slice(0, 4)

  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (confirm(`¿Eliminar la receta "${recipe.titulo}"?`)) onDelete()
  }

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col text-left bg-dark-surface rounded-card shadow-card overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all"
    >
      <button
        type="button"
        onClick={handleDeleteClick}
        aria-label={`Eliminar ${recipe.titulo}`}
        className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-gray-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 active:bg-red-500/80 hover:bg-red-500/80 hover:text-white transition-all"
      >
        <Trash2 size={16} />
      </button>
      <div className="h-36 bg-dark-alt flex items-center justify-center overflow-hidden">
        {recipe.fotoUrl ? (
          <img src={recipe.fotoUrl} alt={recipe.titulo} className="w-full h-full object-cover" />
        ) : (
          <ChefHat size={44} className="text-yaya-400" strokeWidth={1.5} />
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-white text-lg leading-tight">{recipe.titulo}</h3>
        {recipe.descripcion && (
          <p className="text-sm text-gray-400 line-clamp-2">{recipe.descripcion}</p>
        )}
        <div className="mt-auto flex items-center gap-1.5 pt-2">
          {previewIcons.map((ing) => (
            <IconTile
              key={ing.id}
              icono={ing.icono}
              categoria={findCategoria(ing.nombre)}
              size="sm"
              className="rounded-full"
            />
          ))}
          {recipe.ingredientes.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">
              +{recipe.ingredientes.length - 4}
            </span>
          )}
          {recipe.ingredientes.length === 0 && (
            <span className="text-xs text-gray-500">Sin ingredientes</span>
          )}
        </div>
      </div>
    </button>
  )
}

