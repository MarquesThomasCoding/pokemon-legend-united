import { PokemonItem } from "./pokemon";

export type GachaStrategyId = 'weighted' | 'guaranteed' | 'pity';

export interface GachaContext {
  fetchPool: (count: number) => Promise<PokemonItem[]>;
  fetchById: (id: number | string) => Promise<PokemonItem>;
  pityCounter: number;
}

export interface GachaResult {
  pokemons: PokemonItem[];
  newPityCounter: number;
}
