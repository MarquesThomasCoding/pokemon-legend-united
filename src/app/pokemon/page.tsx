"use client"

import { usePokemonStore } from '../../store/PokemonStore';
import { CardShine } from '../components/CardShine';

export default function Page() {
  const { state } = usePokemonStore();

  return (
    <div className='text-black'>
      <h1>Your Pokémon Collection</h1>
      <ul>
        {state.collection.map((pokemon) => (
          <CardShine key={pokemon.id} pokemon={pokemon} show />
        ))}
      </ul>
    </div>
  );
};
