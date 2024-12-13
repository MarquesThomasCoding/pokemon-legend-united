'use client'
import { CardShine } from "@/app/components/CardShine";
import { Pokemon } from '../../api/pokemons/route';
import { PokemonItem } from '../../../store/PokemonStore';
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Suspense } from "react";
import Loader from "@/app/components/Loader";
import { useEffect, useState } from 'react';

async function getSpecificPokemon(name: string) {
    const response = await fetch("/api/pokemons/" + name);
    const data = await response.json();
    return data.data;
  }

const getRandomCards = async (count: number) => {
    const response = await fetch("/api/pokemons/random?limit=" + count);
    const data = await response.json();
    const pokemonsList: PokemonItem[] = [];

    const promises = data.data.map(async (pokemon: Pokemon) => {
        const response = await getSpecificPokemon(pokemon.name);
        const data = await response as PokemonItem;
        pokemonsList.push(data);
    });

    await Promise.all(promises);
    return pokemonsList;
} 

export default function Page() {
    const gacha = useSelector((state: RootState) => state.user.gacha);
    const [randomCards, setRandomCards] = useState<PokemonItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomCards = async () => {
            const cards = await getRandomCards(gacha);
            setRandomCards(cards);
            setLoading(false);
        };
        fetchRandomCards();
    }, [gacha]);

    return (
        <>
            <section className="grid grid-cols-[repeat(auto-fit,208px)] gap-4 justify-items-center px-6 pt-6">
                <Suspense fallback={<Loader />}>
                    {loading ? <Loader /> : randomCards.map((card: PokemonItem) => (
                        <CardShine key={card.id} pokemon={card} show={true} initialReverse={false} canSelect />
                    ))}
                </Suspense>
            </section>
            <div className="flex items-center justify-center py-6">
                <button className="rounded-full p-6 bg-blue-500 font-impact text-2xl text-white tracking-wider">
                    <Link href='/collection'>Back to my collection</Link>
                </button>
            </div>
        </>
    );
};