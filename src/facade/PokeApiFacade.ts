import { PokemonAdapter, RawPokemonApi, RawSpeciesApi } from "@/adapter/PokemonAdapter";
import { PokemonItem } from "@/types/pokemon";


export interface SimplePokemonApi {
    name: string;
    url: string;
}

export class PokeApiFacade {
   
    static async getPokemonDetails(slug: string): Promise<PokemonItem> {
        const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
        const rawPokemon: RawPokemonApi = await resPokemon.json();

        const resSpecies = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
        const rawSpecies: RawSpeciesApi = await resSpecies.json();

        const data = PokemonAdapter.adapt(rawPokemon, rawSpecies);

        return data;
    }

  
    static async getPokemonsPage(page: number) {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=' + (page - 1) * 24);
        return await res.json();
    }

   
    static async getRandomPokemons(limit: number): Promise<SimplePokemonApi[]> {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
        const data = await res.json();
        return data.results.sort(() => Math.random() - 0.5).slice(0, limit);
    }
}
