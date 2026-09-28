import { useEffect, useState } from 'react'
import { ArrowLeft, Camera } from 'lucide-react'
import type { Recipe, RecipeIngredient } from '../types'
import { tidyDescription } from '../lib/ai'
import IngredientPicker from './IngredientPicker'
import SpecificationsList from './SpecificationsList'

interface Props {
  recipe: Recipe | null
  onClose: () => void
  onSave: (input: {
    id?: string
    titulo: string
    descripcion: string
    fotoUrl: string | null
    ingredientes: RecipeIngredient[]
  }) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function RecipeEditor({ recipe, onClose, onSave, onDelete }: Props) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fotoUrl, setFotoUrl] = useState<string | null>(null)
  const [ingredientes, setIngredientes] = useState<RecipeIngredient[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTitulo(recipe?.titulo ?? '')
    setDescripcion(recipe?.descripcion ?? '')
    setFotoUrl(recipe?.fotoUrl ?? null)
    setIngredientes(recipe?.ingredientes ?? [])
  }, [recipe])

  function handleAddIngredient(nombre: string, icono: string) {
    setIngredientes((prev) => {
      const existing = prev.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase())
      if (existing) return prev.filter((p) => p.id !== existing.id)
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          nombre,
          icono,
          cantidadGramos: 0,
          orden: prev.length,
        },
      ]
    })
  }

  function handleChangeCantidad(id: string, gramos: number) {
    setIngredientes((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, cantidadGramos: Math.max(0, gramos) } : ing))
    )
  }

  function handleRemoveIngredient(id: string) {
    setIngredientes((prev) => prev.filter((ing) => ing.id !== id))
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFotoUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!titulo.trim()) {
      setError('El título es obligatorio')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const descripcionLimpia = await tidyDescription(descripcion.trim())
      await onSave({
        id: recipe?.id,
        titulo: titulo.trim(),
        descripcion: descripcionLimpia,
        fotoUrl,
        ingredientes,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la receta')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!recipe) return
    if (!confirm(`¿Eliminar la receta "${recipe.titulo}"?`)) return
    setSaving(true)
    try {
      await onDelete(recipe.id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar la receta')
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-dark-surface border-b border-white/10 flex items-center gap-3 px-4 sm:px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Volver"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-300 hover:bg-white/10 shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {recipe ? 'Editar receta' : 'Nueva receta'}
          </h2>
        </div>

        <div className="flex-1 px-4 sm:px-6 py-5 flex flex-col gap-5 max-w-2xl w-full mx-auto">
          <div className="flex gap-4 items-start">
            <label className="w-24 h-24 rounded-2xl bg-dark-alt border border-dashed border-yaya-400 flex items-center justify-center overflow-hidden cursor-pointer shrink-0 relative">
              {fotoUrl ? (
                <img src={fotoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <Camera size={28} className="text-yaya-400" strokeWidth={1.5} />
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
            <div className="flex-1 flex flex-col gap-3">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Nombre de la receta"
                className="w-full rounded-2xl border border-white/10 bg-dark-alt text-white placeholder-gray-500 px-4 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-yaya-400"
              />
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la receta (opcional)"
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-dark-alt text-white placeholder-gray-500 px-4 py-2.5 text-base sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yaya-400"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-2">Ingredientes</h3>
            <IngredientPicker
              onAdd={handleAddIngredient}
              selectedNames={ingredientes.map((ing) => ing.nombre)}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-2">Especificaciones</h3>
            <SpecificationsList
              ingredientes={ingredientes}
              onChangeCantidad={handleChangeCantidad}
              onRemove={handleRemoveIngredient}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <div className="sticky bottom-0 bg-dark-surface border-t border-white/10 flex items-center justify-between px-4 sm:px-6 py-4 gap-3">
          {recipe ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="text-sm text-red-400 hover:underline disabled:opacity-50 shrink-0"
            >
              Eliminar receta
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={saving}
            className="bg-yaya-500 hover:bg-yaya-600 text-white font-medium px-6 py-2.5 rounded-full disabled:opacity-50 transition-colors shrink-0"
          >
            {saving ? 'Guardando...' : 'Guardar receta'}
          </button>
        </div>
      </form>
    </div>
  )
}
