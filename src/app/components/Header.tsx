import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="px-40 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-5 font-pokemonSolid">
                <Link href="/">
                    <h1 className="text-4xl text-black">Username</h1>
                </Link>
                <div className="text-white p-6 bg-cover bg-no-repeat flex items-center justify-center">
                    <p className="absolute text-xl">LV.<em>5</em></p>
                    <svg className="mt-2" width="105" height="45" viewBox="0 0 105 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M104.5 0.5H10.3047L0.5 23.2114V44.5H56.9131H93.8282L104.5 19.9635V0.5Z" fill="black" stroke="black"/>
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-20">
                <div className="flex items-center gap-5 rounded-full border-2 py-5 px-10 font-impact text-4xl bg-slate-400">
                    <Image
                        src="/images/pokeball.png"
                        alt="Poke Coins icons"
                        width={50}
                        height={50}
                    />
                    10
                </div>
                <Link href="/settings">
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