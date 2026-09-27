import { useMemo } from 'react'
import type { RecipeIngredient } from '../types'
import { findCategoria } from '../data/ingredientCatalog'
import IconTile from './IconTile'

const SIN_CATEGORIA = 'Otros'

interface Props {
  ingredientes: RecipeIngredient[]
  onChangeCantidad: (id: string, gramos: number) => void
  onRemove: (id: string) => void
}

export default function SpecificationsList({ ingredientes, onChangeCantidad, onRemove }: Props) {
  const groups = useMemo(() => {
    const map = new Map<string, RecipeIngredient[]>()
    for (const ing of ingredientes) {
      const categoria = findCategoria(ing.nombre) ?? SIN_CATEGORIA
      const list = map.get(categoria) ?? []
      list.push(ing)
      map.set(categoria, list)
    }
    return map
  }, [ingredientes])

  if (ingredientes.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        Busca ingredientes arriba para añadirlos a las especificaciones.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {Array.from(groups.entries()).map(([categoria, items]) => (
        <div key={categoria}>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            {categoria}
          </p>
          <ul className="flex flex-col gap-2">
            {items.map((ing) => (
              <li
                key={ing.id}
                className="flex items-center gap-3 bg-dark-alt rounded-2xl border border-white/10 shadow-sm px-3 py-2"
              >
                <IconTile icono={ing.icono} categoria={findCategoria(ing.nombre)} size="sm" />
                <span className="flex-1 text-sm font-medium text-gray-200 truncate">{ing.nombre}</span>

                <input
                  type="number"
                  min={0}
                  value={ing.cantidadGramos}
                  onChange={(e) => onChangeCantidad(ing.id, Number(e.target.value))}
                  className="w-20 rounded-full border border-white/10 bg-dark-surface text-white px-2 py-1 text-sm text-right focus:outline-none focus:ring-2 focus:ring-yaya-400"
                />
                <span className="text-xs text-gray-500 w-6">g</span>
                <button
                  type="button"
                  onClick={() => onRemove(ing.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  aria-label={`Quitar ${ing.nombre}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
