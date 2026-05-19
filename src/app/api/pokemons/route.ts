import { PokeApiFacade, SimplePokemonApi } from "@/facade/PokeApiFacade";

export interface ApiResponse {
  results: SimplePokemonApi[];
}

export async function GET(request: Request) {
    const page = parseInt(request.url.split('?page=')[1] || '1');
    const data = await PokeApiFacade.getPokemonsPage(page);

    return Response.json({ data });
}