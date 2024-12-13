import { CardShine } from '@/app/components/CardShine';
import Link from 'next/link';

async function getSpecificPokemon(name: string) {
    const response = await fetch("http://localhost:3000/api/pokemons/" + name);
    const data = await response.json();
    return data.data;
}

export async function generateStaticParams() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await res.json();
    return data.results.map((pokemon: { name: string }) => ({
        slug: pokemon.name,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const pokemon = await getSpecificPokemon(params.slug);
    return {
        title: pokemon.species.name,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const pokemon = await getSpecificPokemon(params.slug);
    
    return (
        <main className="flex flex-col items-center p-24 gap-4 text-black">
            <div className="flex m-auto">
                <CardShine pokemon={pokemon} show initialReverse />
                <ul className="grid grid-cols-2 justify-center p-8">
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>HP: <span className="text-xl font-impact">{pokemon.stats[0].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>Attack: <span className="text-xl font-impact">{pokemon.stats[1].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>Defense: <span className="text-xl font-impact">{pokemon.stats[2].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>Special Attack: <span className="text-xl font-impact">{pokemon.stats[3].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>Special Defense: <span className="text-xl font-impact">{pokemon.stats[4].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8 border-b-2 border-white'>Speed: <span className="text-xl font-impact">{pokemon.stats[5].base_stat}</span></li>
                    <li className='flex justify-between p-4 gap-8'>Rarity: <span className="text-xl font-impact">{pokemon.rarity}</span></li>
                    <li className='flex justify-between p-4 gap-8'>Region: <span className="text-xl font-impact">{pokemon.habitat.name}</span></li>
                </ul>
            </div>
            <Link href="/collection" className='relative flex items-center justify-center p-4 text-white'>
                <svg className="absolute -z-10 mt-2 w-auto h-full" viewBox="0 0 105 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M104.5 0.5H10.3047L0.5 23.2114V44.5H56.9131H93.8282L104.5 19.9635V0.5Z" fill="black" stroke="black"/>
                </svg>
                Collection
            </Link>
        </main>
    );
}