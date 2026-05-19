'use client'
import { CardShine } from "@/app/components/CardShine";
import { Pokemon } from '../../api/pokemons/route';
import { PokemonItem } from '../../../store/PokemonStore';
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { setPityCounter } from '../../../store/userSlice';
import { Suspense, useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { GachaContext, GachaStrategyId } from '@/types/gacha';
import { bannersById, defaultBannerId } from '@/config/banners';

async function fetchById(idOrName: number | string): Promise<PokemonItem> {
    const response = await fetch(`/api/pokemons/${idOrName}`);
    const data = await response.json();
    return data.data;
}

async function fetchPool(count: number): Promise<PokemonItem[]> {
    if (count <= 0) return [];
    const response = await fetch(`/api/pokemons/random?limit=${count}`);
    const data = await response.json();
    const items: PokemonItem[] = await Promise.all(
        data.data.map((p: Pokemon) => fetchById(p.name))
    );
    return items;
}

export default function Page() {
    const dispatch = useDispatch();
    const gacha = useSelector((state: RootState) => state.user.gacha);
    const strategyId = useSelector((state: RootState) => state.user.gachaStrategy) as GachaStrategyId;
    const initialPity = useSelector((state: RootState) => state.user.pityCounter);
    const [randomCards, setRandomCards] = useState<PokemonItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchRandomCards = async () => {
            const banner = bannersById[strategyId] ?? bannersById[defaultBannerId];
            const strategy = banner.strategy;
            const ctx: GachaContext = {
                fetchPool,
                fetchById,
                pityCounter: initialPity,
            };
            const { pokemons, newPityCounter } = await strategy.apply(gacha, ctx);
            if (cancelled) return;
            setRandomCards(pokemons);
            dispatch(setPityCounter(newPityCounter));
            setLoading(false);
        };
        fetchRandomCards();
        return () => { cancelled = true; };
    }, [gacha, strategyId]);

    return (
        <>
            <section className="grid grid-cols-[repeat(auto-fit,208px)] gap-4 justify-items-center px-6 pt-6">
                <Suspense fallback={<Loader />}>
                    {loading ? <Loader /> : randomCards.map((card: PokemonItem, i) => (
                        <CardShine
                            key={`${card.id}-${i}`}
                            pokemon={card}
                            show={true}
                            initialReverse={false}
                            canSelect
                        />
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
