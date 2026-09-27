import { getIconComponent } from '../data/iconMap'

interface Props {
  icono: string
  size: number | string
  color: string
  className?: string
}

/** Renders either a Food Icon Pack SVG (masked to a solid color) or a fallback lucide/tabler icon. */
export default function FoodIcon({ icono, size, color, className = '' }: Props) {
  if (icono.startsWith('food:')) {
    const slug = icono.slice('food:'.length)
    const maskImage = `url(/food-icons/${slug}.svg)`
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          backgroundColor: color,
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    )
  }

  const Icon = getIconComponent(icono)
  return <Icon size={size} color={color} className={className} />
}
