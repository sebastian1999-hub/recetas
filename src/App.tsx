import { useEffect, useState } from 'react'
import { deleteRecipe, fetchRecipes, saveRecipe } from './lib/recipes'
import type { Recipe, RecipeIngredient } from './types'
import RecipeCard from './components/RecipeCard'
import RecipeEditor from './components/RecipeEditor'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Recipe | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setRecipes(await fetchRecipes())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar las recetas')
    } finally {
      setLoading(false)
    }
  }

  function openNewRecipe() {
    setEditing(null)
    setShowEditor(true)
  }

  function openRecipe(recipe: Recipe) {
    setEditing(recipe)
    setShowEditor(true)
  }

  async function handleSave(input: {
    id?: string
    titulo: string
    descripcion: string
    fotoUrl: string | null
    ingredientes: RecipeIngredient[]
  }) {
    await saveRecipe({
      id: input.id,
      titulo: input.titulo,
      descripcion: input.descripcion,
      fotoUrl: input.fotoUrl,
      ingredientes: input.ingredientes.map((ing, index) => ({
        nombre: ing.nombre,
        icono: ing.icono,
        cantidadGramos: ing.cantidadGramos,
        orden: index,
      })),
    })
    await load()
  }

  async function handleDelete(id: string) {
    await deleteRecipe(id)
    await load()
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yaya-400">Recetas de la yaya</h1>
          <p className="text-gray-400 text-sm mt-1">Todas nuestras recetas, en un solo sitio</p>
        </div>
        <button
          onClick={openNewRecipe}
          className="bg-yaya-500 hover:bg-yaya-600 text-white font-medium px-5 py-2.5 rounded-full shadow-card transition-colors"
        >
          + Nueva receta
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {loading && <p className="text-gray-500">Cargando recetas...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <p className="text-gray-500 text-center py-16">
            Aún no hay recetas. Crea la primera con el botón "+ Nueva receta".
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => openRecipe(recipe)}
              onDelete={() => handleDelete(recipe.id)}
            />
          ))}
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 text-center">
        <p className="text-xs text-gray-500">
          Icons by{' '}
          <a
            href="https://foodiconpack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            Food Icon Pack
          </a>
          , licensed under{' '}
          <a
            href="https://foodiconpack.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            CC BY 4.0
          </a>
        </p>
      </footer>

      {showEditor && (
        <RecipeEditor
          recipe={editing}
          onClose={() => setShowEditor(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App

