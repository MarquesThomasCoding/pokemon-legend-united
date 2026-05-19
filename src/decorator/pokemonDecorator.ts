import type { PokemonItem as Pokemon } from "@/store/PokemonStore";

export interface DecoratedPokemon extends Pokemon {
  powerLevel?: number;
  isLegendary?: boolean;
  isShiny?: boolean;
}

const LEGENDARY_IDS = [144, 145, 146, 150, 151];

export function withPowerLevel(pokemon: Pokemon): DecoratedPokemon {
  let totalPower = 0;
  if (pokemon.stats) {
     const { hp, attack, defense, speed } = pokemon.stats as { hp?: number; attack?: number; defense?: number; speed?: number };
     totalPower = (hp || 0) + (attack || 0) + (defense || 0) + (speed || 0);
  }
  
  return { ...pokemon, powerLevel: totalPower };
}

export function withLegendary(pokemon: Pokemon): DecoratedPokemon {
  return { ...pokemon, isLegendary: LEGENDARY_IDS.includes(pokemon.id) };
}

export function withShiny(pokemon: Pokemon, shinyChance: number = 0.05): DecoratedPokemon {
  return { ...pokemon, isShiny: Math.random() < shinyChance };
}
