import { getColorForCategory } from '../data/categoryColors'
import FoodIcon from './FoodIcon'

interface Props {
  icono: string
  categoria?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_CLASSES: Record<NonNullable<Props['size']>, { tile: string; icon: number }> = {
  sm: { tile: 'w-9 h-9 rounded-xl', icon: 30 },
  md: { tile: 'w-11 h-11 rounded-xl', icon: 38 },
  lg: { tile: 'w-full aspect-square rounded-2xl', icon: 72 },
}

export default function IconTile({ icono, categoria, size = 'md', className = '' }: Props) {
  const color = getColorForCategory(categoria)
  const { tile, icon } = SIZE_CLASSES[size]

  return (
    <div
      className={`flex items-center justify-center shrink-0 ${tile} ${className}`}
      style={{ backgroundColor: color }}
    >
      <FoodIcon icono={icono} size={icon} color="#fff" />
    </div>
  )
}
