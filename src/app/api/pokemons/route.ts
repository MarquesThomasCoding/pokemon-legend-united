export interface Pokemon {
  name: string;
  url: string;
}

export interface ApiResponse {
  results: Pokemon[];
}

export async function GET(request: Request) {
    const page = parseInt(request.url.split('?page=')[1]);
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=' + (page - 1) * 24);
    const data = await res.json();

    return Response.json({ data });
}