"use client"

import { usePokemonStore } from '../../store/PokemonStore';
import { CardShine } from '../components/CardShine';
import { typesGradients } from '@/utils/gradients';

export default function Page() {
  const { state } = usePokemonStore();

  return (
    <div>
      <h1>Your Pokémon Collection</h1>
      <ul>
        {state.collection.map((pokemon) => (
          // <span key={pokemon.id}>{pokemon.type}</span>
          <CardShine key={pokemon.id} name={pokemon.name} imageSrc={pokemon.image} show gradient={typesGradients[pokemon.type[0]]} />
        ))}
      </ul>
    </div>
  );
};
