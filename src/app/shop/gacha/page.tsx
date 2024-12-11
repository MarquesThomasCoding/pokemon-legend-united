import { CardShine } from "@/app/components/CardShine";
import { Pokemon } from '../../api/pokemons/route';
import { PokemonItem } from '../../../store/PokemonStore';

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
        <div className="flex flex-wrap gap-4 items-center justify-center">
            {randomCards.map((card: PokemonItem) => (
                <CardShine key={card.id} pokemon={card} show={true} initialReverse={false} canSelect />
            ))}
        </div>
    );
};