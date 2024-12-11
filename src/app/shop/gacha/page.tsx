import { CardShine } from "@/app/components/CardShine";
import { Pokemon } from '../../api/pokemons/route';
import { PokemonItem } from '../../../store/PokemonStore';
import Link from "next/link";

async function getSpecificPokemon(name: string) {
    const response = await fetch("http://localhost:3000/api/pokemons/" + name);
    const data = await response.json();
    return data.data;
  }

const getRandomCards = async (count: number) => {
    const response = await fetch("http://localhost:3000/api/pokemons/random?limit=" + count);
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

export default async function Page() {
    const randomCards = await getRandomCards(10);

    return (
        <>
            <section className="grid grid-cols-5 gap-4 justify-items-center px-6 pt-6">
                {randomCards.map((card: PokemonItem) => (
                    <CardShine key={card.id} pokemon={card} show={true} initialReverse={false} canSelect />
                ))}
            </section>
            <div className="flex items-center justify-center py-6">
                <button className="rounded-full p-6 bg-blue-500 font-impact text-2xl text-white tracking-wider">
                    <Link href='/collection'>Back to my collection</Link>
                </button>
            </div>
        </>
    );
};