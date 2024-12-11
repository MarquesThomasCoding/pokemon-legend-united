import { PokemonItem } from '@/store/PokemonStore';
import { Pokemon } from '../../api/pokemons/route';
import { CardShine } from '../../components/CardShine';

async function getPokemonItem(name: string) {
  const response = await fetch("http://localhost:3000/api/pokemons/" + name);
  const data = await response.json();
  return data.data;
}

async function getPokemonsList() {
  const response = await fetch("http://localhost:3000/api/pokemons");
  const data = await response.json();
  const pokemonsList: PokemonItem[] = [];

  const promises = data.data.results.map(async (pokemon: Pokemon) => {
    const response = await getPokemonItem(pokemon.name);
    const data = await response as PokemonItem;
    pokemonsList.push(data);
  });

  await Promise.all(promises);
  return pokemonsList;
}

export default async function Home() {
  const pokemons = await getPokemonsList();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-24 py-24">
      <h1>Pokemon List</h1>
      <div className='w-full grid grid-cols-[repeat(auto-fit,208px)] justify-center gap-8'>
        {pokemons.map((pokemon: PokemonItem) =>
          <CardShine key={pokemon.species.name} show={true} pokemon={pokemon} initialReverse />
        )}
      </div>
    </main>
  );
}
