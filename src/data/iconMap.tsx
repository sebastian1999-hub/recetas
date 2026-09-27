import type { ComponentType } from 'react'
import {
  Bean,
  Box,
  Broccoli,
  Candy,
  ChefHat,
  Cherry,
  Circle,
  Citrus,
  Container,
  Croissant,
  Droplet,
  Droplets,
  Drumstick,
  Flame,
  FlaskConical,
  Flower2,
  GlassWater,
  Ham,
  Layers,
  Leaf,
  Nut,
  Package,
  PawPrint,
  Shrimp,
  Snowflake,
  Soup,
  Sprout,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from 'lucide-react'
import {
  IconApple,
  IconAvocado,
  IconBaguette,
  IconBanana,
  IconBottle,
  IconBowl,
  IconBowlChopsticks,
  IconBowlSpoon,
  IconBread,
  IconCactus,
  IconCakeRoll,
  IconCarrot,
  IconCheese,
  IconChocolate,
  IconEgg,
  IconFish,
  IconFishBone,
  IconGrain,
  IconGrillFork,
  IconIceCream,
  IconLemon2,
  IconMeat,
  IconMilk,
  IconMilkshake,
  IconMushroom,
  IconPepper,
  IconPlant,
  IconPlant2,
  IconSalad,
  IconSalt,
  IconWheat,
  type IconProps,
} from '@tabler/icons-react'

export type IconComponent = ComponentType<{ size?: number | string; color?: string; className?: string }>

function fromLucide(Icon: LucideIcon): IconComponent {
  return ({ size, color, className }) => (
    <Icon size={size} color={color} strokeWidth={1.75} className={className} />
  )
}

function fromTabler(Icon: ComponentType<IconProps>): IconComponent {
  return ({ size, color, className }) => (
    <Icon size={size} color={color} stroke={1.75} className={className} />
  )
}

export const ICONS: Record<string, IconComponent> = {
  // frutas y verduras
  cherry: fromLucide(Cherry),
  sprout: fromLucide(Sprout),
  flower2: fromLucide(Flower2),
  bean: fromLucide(Bean),
  carrot: fromTabler(IconCarrot),
  pepper: fromTabler(IconPepper),
  plant2: fromTabler(IconPlant2),
  cactus: fromTabler(IconCactus),
  salad: fromTabler(IconSalad),
  broccoli: fromLucide(Broccoli),
  mushroom: fromTabler(IconMushroom),
  grain: fromTabler(IconGrain),
  lemon: fromTabler(IconLemon2),
  apple: fromTabler(IconApple),
  banana: fromTabler(IconBanana),
  citrus: fromLucide(Citrus),
  plant: fromTabler(IconPlant),
  avocado: fromTabler(IconAvocado),
  droplet: fromLucide(Droplet),
  leaf: fromLucide(Leaf),

  // carne y pescado
  drumstick: fromLucide(Drumstick),
  meat: fromTabler(IconMeat),
  'paw-print': fromLucide(PawPrint),
  'grill-fork': fromTabler(IconGrillFork),
  ham: fromLucide(Ham),
  fish: fromTabler(IconFish),
  'fish-bone': fromTabler(IconFishBone),
  shrimp: fromLucide(Shrimp),

  // panadería
  bread: fromTabler(IconBread),
  baguette: fromTabler(IconBaguette),
  croissant: fromLucide(Croissant),
  'cake-roll': fromTabler(IconCakeRoll),

  // lácteos y huevos
  milk: fromTabler(IconMilk),
  egg: fromTabler(IconEgg),
  cheese: fromTabler(IconCheese),
  box: fromLucide(Box),
  container: fromLucide(Container),
  milkshake: fromTabler(IconMilkshake),

  // despensa
  'bowl-chopsticks': fromTabler(IconBowlChopsticks),
  'bowl-spoon': fromTabler(IconBowlSpoon),
  bowl: fromTabler(IconBowl),
  'tabler-wheat': fromTabler(IconWheat),
  candy: fromLucide(Candy),
  salt: fromTabler(IconSalt),
  bottle: fromTabler(IconBottle),
  'flask-conical': fromLucide(FlaskConical),
  droplets: fromLucide(Droplets),
  chocolate: fromTabler(IconChocolate),
  nut: fromLucide(Nut),
  circle: fromLucide(Circle),

  // especias
  package: fromLucide(Package),
  flame: fromLucide(Flame),
  layers: fromLucide(Layers),

  // congelados
  snowflake: fromLucide(Snowflake),
  'ice-cream': fromTabler(IconIceCream),

  // bebidas
  wine: fromLucide(Wine),
  soup: fromLucide(Soup),
  'glass-water': fromLucide(GlassWater),

  // genérico
  'chef-hat': fromLucide(ChefHat),
  'utensils-crossed': fromLucide(UtensilsCrossed),
}

export function getIconComponent(key: string): IconComponent {
  return ICONS[key] ?? fromLucide(UtensilsCrossed)
}


