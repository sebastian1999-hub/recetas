export const CATEGORY_COLORS: Record<string, string> = {
  'Frutas y verduras': '#3FA796',
  'Carne y pescado': '#E5533D',
  Panadería: '#C98A3B',
  'Lácteos y huevos': '#4C8BF5',
  Despensa: '#8B6BC7',
  Especias: '#D9622B',
  Congelados: '#4FA3D1',
  Bebidas: '#B0479E',
}

export const DEFAULT_COLOR = '#6B7280'

export function getColorForCategory(categoria?: string): string {
  if (!categoria) return DEFAULT_COLOR
  return CATEGORY_COLORS[categoria] ?? DEFAULT_COLOR
}
