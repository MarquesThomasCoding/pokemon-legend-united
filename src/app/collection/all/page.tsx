"use client"

import { PokemonItem } from '@/store/PokemonStore';
import { Pokemon } from '../../api/pokemons/route';
import { CardShine } from '../../components/CardShine';
import { Pagination } from '../../components/Pagination';
import { useState, useEffect, Suspense } from 'react';

async function getPokemonItem(name: string) {
  const response = await fetch("http://localhost:3000/api/pokemons/" + name);
  const data = await response.json();
  return data.data;
}

async function getPokemonsList(page: number) {
  const response = await fetch("http://localhost:3000/api/pokemons" + `?page=${page}`);
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

export default function Home() {
  const [actualPage, setActualPage] = useState(1);
  const [region, setRegion] = useState('kanto');
  const [types, setTypes] = useState('normal');
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);

  useEffect(() => {
    async function loadPokemons() {
      const pokemonsList = await getPokemonsList(actualPage);
      const sortedPokemons = pokemonsList.sort((a, b) => a.id - b.id);
      setPokemons(sortedPokemons);
    }
    loadPokemons();
  }, [actualPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
        <div>
          <select name="region" id="region" onChange={(e) => setRegion(e.target.value)}>
            <option value="all">All</option>
            <option value="kanto">Kanto</option>
            <option value="johto">Johto</option>
            <option value="hoenn">Hoenn</option>
            <option value="sinnoh">Sinnoh</option>
            <option value="unova">Unova</option>
            <option value="kalos">Kalos</option>
            <option value="alola">Alola</option>
            <option value="galar">Galar</option>
          </select>
          <select name="types" id="types" onChange={(e) => setTypes(e.target.value)}>
            <option value="all">All</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
            <option value="grass">Grass</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
          </select>
        </div>
        <ul className='w-full grid grid-cols-[repeat(auto-fit,208px)] justify-center gap-8'>
        <Suspense fallback={<p className='text-black'>Loading cards...</p>}>
          {pokemons.map((pokemon: PokemonItem) =>
            <CardShine key={pokemon.species.name} show={true} pokemon={pokemon} initialReverse setTypes={types} setRegion={region} />
          )}
        </Suspense>
        </ul>
      <Pagination actualPage={actualPage} setActualPage={setActualPage} />
    </main>
  );
}
