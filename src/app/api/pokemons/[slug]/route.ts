export interface SpecificPokemon {
    id: number;
    species: {
        name: string;
        url: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface ApiResponse {
    results: SpecificPokemon[];
  }

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
    const data = await res.json();

    return Response.json({ data });
}