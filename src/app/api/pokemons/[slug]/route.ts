import { PokemonItem } from "@/store/PokemonStore";

export interface ApiResponse {
    results: PokemonItem[];
  }

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
    const data = await resPokemon.json();
    data.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`;
    const resSpeciesPoke = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
    const dataSpeciesPoke = await resSpeciesPoke.json();

    data.rarity = dataSpeciesPoke.capture_rate;
    data.habitat = dataSpeciesPoke.habitat.name;

    return Response.json({ data });
}