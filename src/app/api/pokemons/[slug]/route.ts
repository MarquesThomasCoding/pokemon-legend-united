import { PokemonItem } from "@/store/PokemonStore";
import { PokemonAdapter, RawPokemonApi, RawSpeciesApi } from "@/adapter/PokemonAdapter";

export interface ApiResponse {
    results: PokemonItem[];
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
    const rawPokemon: RawPokemonApi = await resPokemon.json();

    const resSpecies = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
    const rawSpecies: RawSpeciesApi = await resSpecies.json();

    // L'Adapter transforme les données brutes en PokemonItem
    const data = PokemonAdapter.adapt(rawPokemon, rawSpecies);

    return Response.json({ data });
}