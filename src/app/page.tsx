import { Pokemon } from './api/pokemons/route';
import { SpecificPokemon } from './api/pokemons/[slug]/route';
import { CardShine } from './components/CardShine';

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

  const typesGradients: { [key: string]: string } = {
    normal: "from-gray-300 to-gray-100",
    fire: "from-red-500 to-orange-500",
    water: "from-blue-500 to-blue-300",
    electric: "from-yellow-500 to-yellow-300",
    grass: "from-green-500 to-green-300",
    ice: "from-blue-300 to-blue-100",
    fighting: "from-red-700 to-red-500",
    poison: "from-purple-500 to-purple-300",
    ground: "from-yellow-700 to-yellow-500",
    flying: "from-blue-200 to-blue-100",
    psychic: "from-purple-300 to-purple-100",
    bug: "from-green-700 to-green-500",
    rock: "from-yellow-500 to-yellow-300",
    ghost: "from-purple-700 to-purple-500",
    dragon: "from-red-300 to-red-100",
    dark: "from-gray-700 to-gray-500",
    steel: "from-gray-500 to-gray-300",
    fairy: "from-pink-500 to-pink-300",
  };

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
