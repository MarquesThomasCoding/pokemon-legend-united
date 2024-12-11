import { PokemonItem } from "@/store/PokemonStore";

export interface ApiResponse {
    results: PokemonItem[];
  }

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
    const data = await resPokemon.json();
    data.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`;
    const resRarity = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
    const dataRarity = await resRarity.json();

    data.rarity = dataRarity.capture_rate;

    return Response.json({ data });
}