import { Pokemon } from './api/pokemons/route';
import { SpecificPokemon } from './api/pokemons/[slug]/route';
import { CardShine } from './components/CardShine';
import { typesGradients } from '../utils/gradients';

async function getSpecificPokemon(name: string) {
  const response = await fetch("http://localhost:3000/api/pokemons/" + name);
  const data = await response.json();
  return data.data;
}

async function getPokemonsList() {
  const response = await fetch("http://localhost:3000/api/pokemons");
  const data = await response.json();
  const pokemonsList: SpecificPokemon[] = [];

  const promises = data.data.results.map(async (pokemon: Pokemon) => {
    const response = await getSpecificPokemon(pokemon.name);
    const data = await response as SpecificPokemon;
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
        {pokemons.map((pokemon: SpecificPokemon) =>
          <CardShine key={pokemon.species.name} show={true} name={pokemon.species.name.toUpperCase()} imageSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.species.url.split('/')[6]}.png`} gradient={typesGradients[pokemon.types[0].type.name]} />
        )}
      </div>
    </main>
  );
}
