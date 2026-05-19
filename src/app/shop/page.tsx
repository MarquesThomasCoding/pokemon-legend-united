'use client'
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RootState } from '../../store/store';
import { reduceCoins, setGacha, setGachaStrategy } from '../../store/userSlice';
import { banners, bannersById, defaultBannerId, spriteUrl } from '@/config/banners';
import { GachaStrategyId } from '@/types/gacha';


export default function Page() {
    const pokecoins = useSelector((state: RootState) => state.user.pokecoins);
    const pityCounter = useSelector((state: RootState) => state.user.pityCounter);
    const dispatch = useDispatch();
    const router = useRouter();

    const [selectedBannerId, setSelectedBannerId] = useState<GachaStrategyId>(defaultBannerId);
    const selectedBanner = bannersById[selectedBannerId];

    const handleGacha = (amount: number) => {
        if (pokecoins >= amount) {
            dispatch(reduceCoins(amount));
            dispatch(setGacha(amount));
            dispatch(setGachaStrategy(selectedBannerId));
            router.push('/shop/gacha');
        } else {
            alert('Pas assez de pokecoins !');
        }
    };

    return (
        <main className='px-6 py-6 h-[calc(100vh-8rem)] overflow-hidden'>
            <div className='grid grid-cols-12 gap-4 h-full'>
                <section className={`col-span-9 rounded-xl ${selectedBanner.bannerBg} p-6 flex flex-col gap-4 min-h-0 transition-colors duration-300`}>
                    <h1 className='font-pokemonSolid text-white text-4xl tracking-widest text-center'>
                        {selectedBanner.label}
                    </h1>

                    <div className='grid grid-cols-2 gap-8 items-center flex-1 min-h-0'>
                        <div className='flex flex-col items-start justify-center gap-6 px-4'>
                            <p className='font-impact text-white text-xl tracking-wide'>
                                {selectedBanner.description}
                            </p>
                            {selectedBanner.id === 'pity' && (
                                <div className='flex flex-col items-start gap-1 bg-black/30 rounded-xl p-4 w-full'>
                                    <span className='font-pokemonSolid text-white text-lg tracking-widest'>
                                        Pity counter
                                    </span>
                                    <span className='font-impact text-white text-3xl tracking-wide'>
                                        {pityCounter} / 50
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='flex items-center justify-center h-full min-h-0'>
                            <Image
                                src={spriteUrl(selectedBanner.featuredPokemonId)}
                                alt={selectedBanner.featuredName}
                                width={360}
                                height={360}
                                className='drop-shadow-[6px_6px_8px_#000] pointer-events-none max-h-full w-auto object-contain'
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        <button
                            onClick={() => handleGacha(1)}
                            className={`px-5 py-3 rounded-full ${selectedBanner.accent} ${selectedBanner.accentHover} font-impact text-xl tracking-wide text-white transition-colors`}
                        >
                            Pull x 1
                        </button>
                        <button
                            onClick={() => handleGacha(10)}
                            className={`px-5 py-3 rounded-full ${selectedBanner.accent} ${selectedBanner.accentHover} font-impact text-xl tracking-wide text-white transition-colors`}
                        >
                            Pull x 10
                        </button>
                        <button
                            onClick={() => handleGacha(50)}
                            className={`px-5 py-3 rounded-full ${selectedBanner.accent} ${selectedBanner.accentHover} font-impact text-xl tracking-wide text-white transition-colors`}
                        >
                            Pull x 50
                        </button>
                    </div>
                </section>

                <aside className='col-span-3 flex flex-col gap-4 h-full min-h-0'>
                    {banners.map(banner => {
                        const isSelected = banner.id === selectedBannerId;
                        return (
                            <button
                                key={banner.id}
                                onClick={() => setSelectedBannerId(banner.id)}
                                className={`rounded-xl p-3 ${banner.bannerBg} flex flex-col items-center justify-center gap-1 flex-1 min-h-0 overflow-hidden transition-all duration-200 ${isSelected ? 'border-4 border-yellow-400' : 'border-4 border-transparent opacity-80 hover:opacity-100'}`}
                            >
                                <Image
                                    src={spriteUrl(banner.featuredPokemonId)}
                                    alt={banner.featuredName}
                                    width={120}
                                    height={120}
                                    className={`drop-shadow-[3px_3px_4px_#000] pointer-events-none max-h-[60%] w-auto object-contain ${isSelected ? 'scale-[1.2]' : ''}`}
                                    unoptimized
                                />
                                <p className='font-pokemonSolid text-white text-sm tracking-widest text-center leading-tight'>
                                    {banner.label}
                                </p>
                                <p className='font-impact text-white text-xs tracking-wide text-center'>
                                    {banner.featuredName}
                                </p>
                            </button>
                        );
                    })}
                </aside>
            </div>
        </main>
    );
}
