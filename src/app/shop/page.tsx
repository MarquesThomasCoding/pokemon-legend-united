'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
    const username = useSelector((state: RootState) => state.user.username);
    
    return (
        <>
            <main className='px-6'>
                <div className='flex flex-col gap-6 items-center justify-between'>
                    <div className='pt-4 flex flex-col gap-2 items-center'>
                        <h1>Welcome to the shop {username} !</h1>
                        <h2>Try your luck & catch them all</h2>
                    </div>
                    <div>
                        <div className='flex items-center'>
                            1
                            <Image
                                src="/images/pokeball.png"
                                alt="Pokecoins"
                                width={25}
                                height={25}></Image>
                             = 1 carte
                        </div>
                        <p><em className=''>30%</em> de chance de tirer un pokémon de rareté 5⭐</p>
                    </div>
                </div>
                <div className='w-full flex justify-center gap-4 pt-6'>
                    <Link href="/gacha" className='w-fit h-full p-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        Gacha x 1
                    </Link>
                    <Link href="/gacha" className='w-fit h-full p-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        Gacha x 10
                    </Link>
                    <Link href="/gacha" className='w-fit h-full p-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        Gacha x 50
                    </Link>
                </div>
            </main>
        </>
    );
}