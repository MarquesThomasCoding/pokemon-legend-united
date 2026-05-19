import { PokemonAdapter, RawPokemonApi, RawSpeciesApi } from "@/adapter/PokemonAdapter";
import { PokemonItem } from "@/store/PokemonStore";


export class PokeApiFacade {
   
    static async getPokemonDetails(slug: string): Promise<PokemonItem> {
        const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
        const rawPokemon: RawPokemonApi = await resPokemon.json();

        const resSpecies = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
        const rawSpecies: RawSpeciesApi = await resSpecies.json();

        const data = PokemonAdapter.adapt(rawPokemon, rawSpecies);

        return data;
    }
}
