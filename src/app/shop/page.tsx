'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { reduceCoins, setGacha } from '../../store/userSlice';
import './style.css';


export default function Page() {
    const username = useSelector((state: RootState) => state.user.username);
    const pokecoins = useSelector((state: RootState) => state.user.pokecoins);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleGacha = (amount: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (pokecoins >= amount) {
            dispatch(reduceCoins(amount));
            dispatch(setGacha(amount));
            router.push('/shop/gacha');
        } else {
            alert('Pas assez de pokecoins !');
        }
    };
    
    return (
        <>
            <main className='px-6 pt-6 flex flex-col items-center justify-center'>
                <div className='w-full flex flex-col gap-6 items-center justify-center max-w-[600px]'>
                    <div className='px-4 py-6 flex flex-col gap-2 items-center rounded-xl bg-red-600 text-white text-xl font-pokemonSolid tracking-widest h-full w-full'>
                        <h1>Welcome to the shop {username} !</h1>
                        <h2>Try your luck & catch them all</h2>
                    </div>
                    <div className='py-6 px-4 bg-white text-red-600 rounded-xl h-full w-full font-impact flex items-center justify-center'>
                        <div className='flex items-center text-xl'>
                            1
                            <Image
                                src="/images/pokeball.png"
                                alt="Pokecoins"
                                width={25}
                                height={25}></Image>
                             = 1 carte
                        </div>
                    </div>
                </div>
                <Image
                    src="/images/pokeball.png"
                    alt="Pokeball"
                    width={250}
                    height={250}
                    className='animate-pokeball'></Image>
                <div className='w-full flex justify-center gap-4 pt-6'>
                    <Link 
                        onClick={(e)=> handleGacha(1, e)} 
                        href="/shop/gacha?amount=1" 
                        className='w-fit h-full p-6 bg-black rounded-full flex items-center justify-center font-impact text-xl tracking-wide text-white'>
                        Gacha x 1
                    </Link>
                    <Link 
                        onClick={(e)=> handleGacha(10, e)} 
                        href="/shop/gacha?amount=10" 
                        className='w-fit h-full p-6 bg-black rounded-full flex items-center justify-center font-impact text-xl tracking-wide text-white'>
                        Gacha x 10
                    </Link>
                    <Link 
                        onClick={(e)=> handleGacha(50, e)} 
                        href="/shop/gacha?amount=50" 
                        className='w-fit h-full p-6 bg-black rounded-full flex items-center justify-center font-impact text-xl tracking-wide text-white'>
                        Gacha x 50
                    </Link>
                </div>
            </main>
        </>
    );
}