import { PokemonItem } from "@/types/pokemon";

export interface RawPokemonApi {
    id: number;
    species: { name: string; url: string };
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
    cries: { latest: string };
    [key: string]: unknown;
}
export interface RawSpeciesApi {
    capture_rate: number;
    habitat: { name: string } | null;
    [key: string]: unknown;
}

export class PokemonAdapter {
    static adapt(rawPokemon: RawPokemonApi, rawSpecies: RawSpeciesApi): PokemonItem {
        return {
            id: rawPokemon.id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${rawPokemon.id}.png`,
            species: rawPokemon.species,
            stats: rawPokemon.stats,
            types: rawPokemon.types,
            cries: rawPokemon.cries,
            rarity: rawSpecies.capture_rate,
            habitat: rawSpecies.habitat ?? { name: "unknown" },
            times: 1,
        };
    }
}
