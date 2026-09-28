import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { INGREDIENT_CATALOG, DEFAULT_ICON } from '../data/ingredientCatalog'
import FoodIcon from './FoodIcon'

const UNSELECTED_COLOR = '#E5484D'
const SELECTED_COLOR = '#2FAE60'

interface Props {
  onAdd: (nombre: string, icono: string) => void
  selectedNames?: string[]
}

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function IngredientPicker({ onAdd, selectedNames = [] }: Props) {
  const [query, setQuery] = useState('')
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  function toggleCategory(categoria: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoria)) next.delete(categoria)
      else next.add(categoria)
      return next
    })
  }

  const selected = useMemo(() => new Set(selectedNames.map(normalize)), [selectedNames])

  const results = useMemo(() => {
    const q = normalize(query)
    if (!q) return INGREDIENT_CATALOG
    return INGREDIENT_CATALOG.filter((item) => normalize(item.nombre).includes(q))
  }, [query])

  const groups = useMemo(() => {
    const map = new Map<string, typeof INGREDIENT_CATALOG>()
    for (const item of results) {
      const list = map.get(item.categoria) ?? []
      list.push(item)
      map.set(item.categoria, list)
    }
    return map
  }, [results])

  const canAddCustom =
    query.trim().length > 0 &&
    !INGREDIENT_CATALOG.some((item) => normalize(item.nombre) === normalize(query))

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar ingrediente..."
        className="w-full rounded-full border border-white/10 bg-dark-alt text-white placeholder-gray-500 px-4 py-2.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-yaya-400"
      />

      <div className="flex flex-col gap-5">
        {canAddCustom && (
          <button
            type="button"
            onClick={() => {
              onAdd(query.trim(), DEFAULT_ICON)
            }}
            className="flex items-center gap-3 rounded-2xl border border-dashed border-yaya-400 bg-dark-alt px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
          >
            <span className="w-9 h-9 rounded-xl bg-yaya-500 flex items-center justify-center shrink-0">
              <FoodIcon icono={DEFAULT_ICON} size={18} color="#fff" />
            </span>
            <span className="text-sm text-yaya-400 font-medium">
              Añadir "{query.trim()}" como nuevo ingrediente
            </span>
          </button>
        )}

        {Array.from(groups.entries()).map(([categoria, items]) => {
          const isOpen = query.trim().length > 0 || openCategories.has(categoria)
          return (
            <div key={categoria}>
              <button
                type="button"
                onClick={() => toggleCategory(categoria)}
                className="w-full flex items-center justify-between gap-2 mb-2 text-left"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {categoria} <span className="text-gray-600">({items.length})</span>
                </p>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5">
                  {items.map((item) => {
                    const isSelected = selected.has(normalize(item.nombre))
                    const color = isSelected ? SELECTED_COLOR : UNSELECTED_COLOR
                    return (
                      <button
                        key={item.nombre}
                        type="button"
                        onClick={() => {
                          onAdd(item.nombre, item.icono)
                        }}
                        className="relative aspect-square rounded-2xl p-2 flex flex-col justify-between text-left overflow-hidden hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        <span className="flex justify-end">
                          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] leading-none">
                            ⋯
                          </span>
                        </span>
                        <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[56%] aspect-square">
                          <FoodIcon icono={item.icono} size="100%" color="#fff" className="opacity-90" />
                        </span>
                        <span className="text-xs font-semibold text-white leading-tight break-words">
                          {item.nombre}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {results.length === 0 && !canAddCustom && query.trim().length > 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No se encontraron ingredientes</p>
        )}
      </div>
    </div>
  )
}

