export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface ApiResponse {
    results: Pokemon[];
  }

export async function GET(request: Request) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const data = await res.json();
    const randomPokemons = data.results.sort(() => Math.random() - 0.5).slice(0, request.url.split('?limit=')[1]);
    return Response.json({ data: randomPokemons });
  }