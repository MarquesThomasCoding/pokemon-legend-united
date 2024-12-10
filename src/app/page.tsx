import {CardShine} from './components/CardShine';

function getPokemonsList(page: number) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page-1)*40}`)
    .then(response => response.json())
    .then(data => data.results);
}

export default async function Home() {
  const pokemons = await getPokemonsList(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pokemon List</h1>
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(208px,1fr))] gap-2'>
        {pokemons.map((pokemon: any) => 
          <CardShine key={pokemon.name} show={true} name={pokemon.name.toUpperCase()} imageSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.url.split('/')[6]}.png`} />
        )}
      </div>
      {/* <CardShine show={true} name="Pikachu" imageSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/25.png" /> */}
    </main>
  );
}
