"use client"

import { PokemonItem } from '@/store/PokemonStore';
import { Pokemon } from '../../api/pokemons/route';
import { CardShine } from '../../components/CardShine';
import { Pagination } from '../../components/Pagination';
import { useState, useEffect, Suspense } from 'react';
import HabitatFilter from '@/app/components/HabitatFilter';
import TypeFilter from '@/app/components/TypeFilter';

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
  const [filteredType, setFilteredType] = useState("all");
  const [filteredRegion, setFilteredRegion] = useState("all");
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
          <HabitatFilter filteredRegion={filteredRegion} setFilteredRegion={setFilteredRegion} />
          <TypeFilter filteredType={filteredType} setFilteredType={setFilteredType} />
        </div>
        <ul className='w-full grid grid-cols-[repeat(auto-fit,208px)] justify-center gap-8'>
        <Suspense fallback={<p className='text-black'>Loading cards...</p>}>
          {pokemons.map((pokemon: PokemonItem) =>
            <CardShine key={pokemon.species.name} show={(filteredRegion === "all" || pokemon.habitat.name === filteredRegion) && (filteredType === "all" || pokemon.types[0].type.name === filteredType)} pokemon={pokemon} initialReverse />
          )}
        </Suspense>
        </ul>
      <Pagination actualPage={actualPage} setActualPage={setActualPage} />
    </main>
  );
}
