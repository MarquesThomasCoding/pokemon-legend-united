import { PokemonItem } from "@/types/pokemon";
import { PokeApiFacade } from "@/facade/PokeApiFacade";

export interface ApiResponse {
    results: PokemonItem[];
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const pokemonDetails = await PokeApiFacade.getPokemonDetails(slug);

    return Response.json({ data: pokemonDetails });
}