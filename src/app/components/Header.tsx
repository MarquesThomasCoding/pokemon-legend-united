'use client'
import Image from "next/image";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Header() {
    const username = useSelector((state: RootState) => state.user.username);
    const usercoins = useSelector((state: RootState) => state.user.pokecoins);
    return (
        <header className="sticky top-0 bg-white z-10 lg:px-40 pt-6 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-5 font-pokemonSolid">
                <Link href="/">
                    <h1 className="text-4xl text-black tracking-widest">{username}</h1>
                </Link>
                <div className="text-white p-6 bg-cover bg-no-repeat flex items-center justify-center">
                    <p className="absolute text-xl">LV.<em>5</em></p>
                    <svg className="mt-2" width="105" height="45" viewBox="0 0 105 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M104.5 0.5H10.3047L0.5 23.2114V44.5H56.9131H93.8282L104.5 19.9635V0.5Z" fill="black" stroke="black"/>
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-20">
                <div className="flex items-center gap-5 rounded-full border-2 py-5 px-2 md:px-10 font-impact text-4xl bg-slate-400">
                    <Image
                        src="/images/pokeball.png"
                        alt="Poke Coins icons"
                        width={50}
                        height={50}
                        className="w-10 h-10"
                    />
                    <span>{usercoins}</span>
                </div>
                <Link href="/settings" className="hover:scale-110 transition-300 min-w-6 min-h-6">
                    <Image
                        src="/images/settings-icon.png"
                        alt="Settings icon"
                        width={50}
                        height={50}
                    />
                </Link>
            </div>
        </header>
    )
}