import { useEffect, useState } from 'react'
import { Camera } from 'lucide-react'
import type { Recipe, RecipeIngredient } from '../types'
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
      if (existing) return prev
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
      await onSave({
        id: recipe?.id,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
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
    <div className="fixed inset-0 bg-black/40 flex items-start sm:items-center justify-center p-4 z-50 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-surface rounded-card shadow-card w-full max-w-2xl my-8 flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            {recipe ? 'Editar receta' : 'Nueva receta'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5">
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
                className="w-full rounded-2xl border border-white/10 bg-dark-alt text-white placeholder-gray-500 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yaya-400"
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

        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          {recipe ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="text-sm text-red-400 hover:underline disabled:opacity-50"
            >
              Eliminar receta
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={saving}
            className="bg-yaya-500 hover:bg-yaya-600 text-white font-medium px-6 py-2.5 rounded-full disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : 'Guardar receta'}
          </button>
        </div>
      </form>
    </div>
  )
}
