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
    rarity: number;
}

export interface ApiResponse {
    results: SpecificPokemon[];
  }

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const resPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + slug);
    const data = await resPokemon.json();
    const resRarity = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + slug);
    const dataRarity = await resRarity.json();

    data.rarity = dataRarity.capture_rate;

    return Response.json({ data });
}