"use client"

import { useEffect, useState } from 'react';
import { usePokemonStore, Pokemon } from '../../../store/PokemonStore';
import Link from 'next/link';

async function getSpecificPokemon(name: string) {
    const response = await fetch("http://localhost:3000/api/pokemons/" + name);
    const data = await response.json();
    return data.data;
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { dispatch } = usePokemonStore();
    
    const [slug, setSlug] = useState<string>('');

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    const pokemon = getSpecificPokemon(slug);

    const handleAddPokemon = async () => {
        const newPokemon: Pokemon = {
          id: (await pokemon).id,
          name: (await pokemon).species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${(await pokemon).species.url.split('/')[6]}.png`,
          type: (await pokemon).types.map((type: any) => type.type.name),
          times: 1,
          rarity: (await pokemon).rarity,
        };
    
        dispatch({ type: 'ADD_POKEMON', payload: newPokemon });
      };
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>{slug}</h1>
            <button onClick={handleAddPokemon}>Add {slug}</button>
            <Link href="/pokemon">Go to collection</Link>
        </main>
    );
}