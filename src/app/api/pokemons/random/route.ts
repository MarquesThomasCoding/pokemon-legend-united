import { PokeApiFacade, SimplePokemonApi } from "@/facade/PokeApiFacade";

export interface ApiResponse {
  results: SimplePokemonApi[];
}

export async function GET(request: Request) {
    const limit = parseInt(request.url.split('?limit=')[1] || '10');
    const randomPokemons = await PokeApiFacade.getRandomPokemons(limit);
    
    return Response.json({ data: randomPokemons });
}