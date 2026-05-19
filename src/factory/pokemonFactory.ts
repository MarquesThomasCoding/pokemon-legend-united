import { withLegendary, withPowerLevel, withShiny, withStars } from "../decorator/pokemonDecorator";
import type { PokemonItem } from "@/types/pokemon";
import type { DecoratedPokemon } from "../decorator/pokemonDecorator";

export class PokemonFactory {
  static createStandard(basePokemon: PokemonItem): DecoratedPokemon {
    const stars = PokemonFactory.calculateStars(basePokemon.rarity);
    
    const decorators: Array<(p: DecoratedPokemon) => DecoratedPokemon> = [
      withPowerLevel, 
      (p: DecoratedPokemon) => withStars(p, stars)
    ];

    if (stars === 5) decorators.push(withLegendary);

    let decoratedPokemon: DecoratedPokemon = basePokemon as DecoratedPokemon;
    decorators.forEach(decorator => {
        decoratedPokemon = decorator(decoratedPokemon);
    });

    return decoratedPokemon;
  }

  static createGachaRoll(basePokemon: PokemonItem): DecoratedPokemon {
    const decoratedPokemon = PokemonFactory.createStandard(basePokemon);

    const shinyChance = decoratedPokemon.stars === 5 ? 0.3 : decoratedPokemon.stars === 4 ? 0.1 : 0.02;
    return withShiny(decoratedPokemon, shinyChance);
  }

  private static calculateStars(rarity: number): number {
    if (rarity < 10) return 5;
    if (rarity < 50) return 4;
    if (rarity < 100) return 3;
    if (rarity < 200) return 2;
    return 1;
  }
}

