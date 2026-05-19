import type { PokemonItem } from "@/store/PokemonStore";

export interface DecoratedPokemon extends PokemonItem {
  powerLevel?: number;
  isLegendary?: boolean;
  isShiny?: boolean;
  stars?: number;
}

const LEGENDARY_IDS = [144, 145, 146, 150, 151];

export function withPowerLevel(pokemon: PokemonItem): DecoratedPokemon {
  let totalPower = 0;
  if (pokemon.stats) {
     const { hp, attack, defense, speed } = pokemon.stats as any; 
     totalPower = (hp || 0) + (attack || 0) + (defense || 0) + (speed || 0);
  }
  
  return { ...pokemon, powerLevel: totalPower };
}

export function withLegendary(pokemon: PokemonItem): DecoratedPokemon {
  return { ...pokemon, isLegendary: LEGENDARY_IDS.includes(pokemon.id) };
}

export function withShiny(pokemon: PokemonItem, shinyChance: number = 0.05): DecoratedPokemon {
  return { ...pokemon, isShiny: Math.random() < shinyChance };
}

export function withStars(pokemon: PokemonItem, stars: number): DecoratedPokemon {
  return { ...pokemon, stars };
}

