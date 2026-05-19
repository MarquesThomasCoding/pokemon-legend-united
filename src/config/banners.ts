import { GachaStrategyId } from '@/types/gacha';
import {
  GachaStrategy,
  WeightGachaStrategy,
  GuaranteedGachaStrategy,
  PityGachaStrategy,
} from '@/strategy/GachaStrategies';

export interface Banner {
  id: GachaStrategyId;
  label: string;
  description: string;
  bannerBg: string;
  accent: string;
  accentHover: string;
  featuredPokemonId: number;
  featuredName: string;
  strategy: GachaStrategy;
}

export const banners: Banner[] = [
  {
    id: 'weighted',
    label: 'Standard Banner',
    description: 'Weighted draw — common Pokémon appear more often, rares are scarce.',
    bannerBg: 'bg-blue-600',
    accent: 'bg-blue-900',
    accentHover: 'hover:bg-blue-800',
    featuredPokemonId: 9,
    featuredName: 'Blastoise',
    strategy: new WeightGachaStrategy(),
  },
  {
    id: 'guaranteed',
    label: 'Premium Banner',
    description: 'A x10 pull is guaranteed to contain at least one 4★ Pokémon or higher.',
    bannerBg: 'bg-red-600',
    accent: 'bg-red-900',
    accentHover: 'hover:bg-red-800',
    featuredPokemonId: 6,
    featuredName: 'Charizard',
    strategy: new GuaranteedGachaStrategy(),
  },
  {
    id: 'pity',
    label: 'Featured Banner',
    description: 'Rate-up on Mewtwo — guaranteed within 50 pulls (pity counter persists).',
    bannerBg: 'bg-purple-600',
    accent: 'bg-purple-900',
    accentHover: 'hover:bg-purple-800',
    featuredPokemonId: 150,
    featuredName: 'Mewtwo',
    strategy: new PityGachaStrategy(),
  },
];

export const bannersById: Record<GachaStrategyId, Banner> = banners.reduce(
  (acc, banner) => {
    acc[banner.id] = banner;
    return acc;
  },
  {} as Record<GachaStrategyId, Banner>,
);

export const defaultBannerId: GachaStrategyId = 'weighted';

export const spriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
