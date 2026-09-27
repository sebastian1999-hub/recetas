import type { IngredientCatalogItem } from '../types'

export const INGREDIENT_CATALOG: IngredientCatalogItem[] = [
  // Frutas y verduras
  { nombre: 'Tomate', icono: 'food:tomato', categoria: 'Frutas y verduras' },
  { nombre: 'Cebolla', icono: 'food:onion', categoria: 'Frutas y verduras' },
  { nombre: 'Ajo', icono: 'food:garlic', categoria: 'Frutas y verduras' },
  { nombre: 'Patata', icono: 'food:potato', categoria: 'Frutas y verduras' },
  { nombre: 'Zanahoria', icono: 'food:carrot', categoria: 'Frutas y verduras' },
  { nombre: 'Pimiento', icono: 'food:bell_pepper', categoria: 'Frutas y verduras' },
  { nombre: 'Calabacín', icono: 'food:zucchini', categoria: 'Frutas y verduras' },
  { nombre: 'Pepino', icono: 'food:cucumber', categoria: 'Frutas y verduras' },
  { nombre: 'Lechuga', icono: 'food:lettuce', categoria: 'Frutas y verduras' },
  { nombre: 'Brócoli', icono: 'food:broccoli', categoria: 'Frutas y verduras' },
  { nombre: 'Champiñón', icono: 'food:mushroom', categoria: 'Frutas y verduras' },
  { nombre: 'Maíz', icono: 'food:corn', categoria: 'Frutas y verduras' },
  { nombre: 'Limón', icono: 'food:lemon', categoria: 'Frutas y verduras' },
  { nombre: 'Manzana', icono: 'food:apple', categoria: 'Frutas y verduras' },
  { nombre: 'Plátano', icono: 'food:banana', categoria: 'Frutas y verduras' },
  { nombre: 'Naranja', icono: 'food:orange', categoria: 'Frutas y verduras' },
  { nombre: 'Fresa', icono: 'food:strawberry', categoria: 'Frutas y verduras' },
  { nombre: 'Aguacate', icono: 'food:avocado', categoria: 'Frutas y verduras' },
  { nombre: 'Berenjena', icono: 'food:eggplant', categoria: 'Frutas y verduras' },
  { nombre: 'Perejil', icono: 'food:parsley', categoria: 'Frutas y verduras' },

  // Carne y pescado
  { nombre: 'Pollo', icono: 'food:chicken', categoria: 'Carne y pescado' },
  { nombre: 'Carne picada', icono: 'food:ground_beef', categoria: 'Carne y pescado' },
  { nombre: 'Ternera', icono: 'food:veal', categoria: 'Carne y pescado' },
  { nombre: 'Cerdo', icono: 'food:pork', categoria: 'Carne y pescado' },
  { nombre: 'Bacon', icono: 'food:bacon', categoria: 'Carne y pescado' },
  { nombre: 'Jamón', icono: 'food:ham', categoria: 'Carne y pescado' },
  { nombre: 'Salmón', icono: 'food:salmon', categoria: 'Carne y pescado' },
  { nombre: 'Atún', icono: 'food:tuna', categoria: 'Carne y pescado' },
  { nombre: 'Gambas', icono: 'food:shrimp', categoria: 'Carne y pescado' },

  // Panadería
  { nombre: 'Pan', icono: 'bread', categoria: 'Panadería' },
  { nombre: 'Baguette', icono: 'baguette', categoria: 'Panadería' },
  { nombre: 'Croissant', icono: 'croissant', categoria: 'Panadería' },
  { nombre: 'Tortitas', icono: 'food:pancakes', categoria: 'Panadería' },

  // Lácteos y huevos
  { nombre: 'Leche', icono: 'food:milk', categoria: 'Lácteos y huevos' },
  { nombre: 'Huevos', icono: 'food:eggs', categoria: 'Lácteos y huevos' },
  { nombre: 'Queso', icono: 'food:swiss_cheese', categoria: 'Lácteos y huevos' },
  { nombre: 'Mantequilla', icono: 'food:butter', categoria: 'Lácteos y huevos' },
  { nombre: 'Yogur', icono: 'food:yogurt', categoria: 'Lácteos y huevos' },
  { nombre: 'Nata', icono: 'food:cream', categoria: 'Lácteos y huevos' },

  // Despensa
  { nombre: 'Arroz', icono: 'food:rice', categoria: 'Despensa' },
  { nombre: 'Pasta', icono: 'food:pasta', categoria: 'Despensa' },
  { nombre: 'Harina', icono: 'food:flour', categoria: 'Despensa' },
  { nombre: 'Azúcar', icono: 'food:sugar', categoria: 'Despensa' },
  { nombre: 'Sal', icono: 'food:salt', categoria: 'Despensa' },
  { nombre: 'Aceite de oliva', icono: 'food:olive_oil', categoria: 'Despensa' },
  { nombre: 'Vinagre', icono: 'food:red_wine_vinegar', categoria: 'Despensa' },
  { nombre: 'Legumbres', icono: 'food:green_beans', categoria: 'Despensa' },
  { nombre: 'Garbanzos', icono: 'food:chickpeas', categoria: 'Despensa' },
  { nombre: 'Lentejas', icono: 'food:lentils', categoria: 'Despensa' },
  { nombre: 'Miel', icono: 'food:honey', categoria: 'Despensa' },
  { nombre: 'Chocolate', icono: 'food:chocolate_chips', categoria: 'Despensa' },
  { nombre: 'Frutos secos', icono: 'food:walnuts', categoria: 'Despensa' },
  { nombre: 'Aceitunas', icono: 'circle', categoria: 'Despensa' },

  // Especias
  { nombre: 'Pimienta', icono: 'food:black_pepper', categoria: 'Especias' },
  { nombre: 'Pimentón', icono: 'food:paprika', categoria: 'Especias' },
  { nombre: 'Canela', icono: 'food:cinnamon', categoria: 'Especias' },
  { nombre: 'Orégano', icono: 'food:oregano', categoria: 'Especias' },
  { nombre: 'Laurel', icono: 'food:bay_leaf', categoria: 'Especias' },
  { nombre: 'Guindilla', icono: 'food:chili_pepper', categoria: 'Especias' },

  // Congelados
  { nombre: 'Guisantes congelados', icono: 'food:snap_peas', categoria: 'Congelados' },
  { nombre: 'Helado', icono: 'ice-cream', categoria: 'Congelados' },

  // Bebidas
  { nombre: 'Vino', icono: 'food:wine_red', categoria: 'Bebidas' },
  { nombre: 'Caldo', icono: 'food:beef_broth', categoria: 'Bebidas' },
  { nombre: 'Agua', icono: 'food:water', categoria: 'Bebidas' },
]

export const DEFAULT_ICON = 'chef-hat'

export function findIcon(nombre: string): string {
  const match = INGREDIENT_CATALOG.find(
    (item) => item.nombre.toLowerCase() === nombre.trim().toLowerCase()
  )
  return match?.icono ?? DEFAULT_ICON
}

export function findCategoria(nombre: string): string | undefined {
  const match = INGREDIENT_CATALOG.find(
    (item) => item.nombre.toLowerCase() === nombre.trim().toLowerCase()
  )
  return match?.categoria
}
