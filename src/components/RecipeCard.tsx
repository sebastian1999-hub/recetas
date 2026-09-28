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
      className="group relative flex flex-col text-left bg-dark-surface rounded-2xl sm:rounded-card shadow-card overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all"
    >
      <button
        type="button"
        onClick={handleDeleteClick}
        aria-label={`Eliminar ${recipe.titulo}`}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-gray-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 active:bg-red-500/80 hover:bg-red-500/80 hover:text-white transition-all"
      >
        <Trash2 size={12} className="sm:hidden" />
        <Trash2 size={16} className="hidden sm:block" />
      </button>
      <div className="h-20 sm:h-36 bg-dark-alt flex items-center justify-center overflow-hidden">
        {recipe.fotoUrl ? (
          <img src={recipe.fotoUrl} alt={recipe.titulo} className="w-full h-full object-cover" />
        ) : (
          <ChefHat size={28} className="text-yaya-400 sm:hidden" strokeWidth={1.5} />
        )}
        {!recipe.fotoUrl && (
          <ChefHat size={44} className="text-yaya-400 hidden sm:block" strokeWidth={1.5} />
        )}
      </div>
      <div className="p-2 sm:p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-white text-xs sm:text-lg leading-tight line-clamp-2 sm:line-clamp-1">
          {recipe.titulo}
        </h3>
        {recipe.descripcion && (
          <p className="hidden sm:block text-sm text-gray-400 line-clamp-2">{recipe.descripcion}</p>
        )}
        <div className="hidden sm:flex mt-auto items-center gap-1.5 pt-2">
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

