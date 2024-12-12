"use client"

import { usePokemonStore } from '../../store/PokemonStore';
import { CardShine } from '../components/CardShine';
import { Suspense } from 'react';

export default function Page() {
  const { state } = usePokemonStore();

  return (
    <div className='text-black'>
        <h1>Your Pokémon Collection</h1>
        <Suspense fallback={<p className='text-black'>Loading cards...</p>}>
            <ul className='w-full grid grid-cols-[repeat(auto-fit,208px)] justify-center gap-8'>
                {state.collection.map((pokemon) => (
                <CardShine key={pokemon.id} pokemon={pokemon} show initialReverse />
                ))}
            </ul>
        </Suspense>
    </div>
  );
};