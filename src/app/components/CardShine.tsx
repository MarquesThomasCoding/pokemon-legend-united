"use client"

import { useState } from "react";
import Image from "next/image";
import { PokemonItem } from "../../store/PokemonStore";
import { usePokemonStore } from "../../store/PokemonStore";
import { typesGradients } from "@/utils/gradients";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export const CardShine = ({ pokemon, show, initialReverse, canSelect}: { pokemon: PokemonItem, show: boolean, initialReverse?: boolean, canSelect?: boolean}) => {
    const { state } = usePokemonStore();
    const isOwned = state.collection.some(item => item.id === pokemon.id);
    const [reversed, setReversed] = useState(initialReverse);
    const { dispatch } = usePokemonStore();
    
    const reverseCard = () => {
        setReversed(!reversed);
    }

    const handleAddPokemon = async () => {
        const newPokemon: PokemonItem = {
            id: pokemon.id,
            image: pokemon.image,
            stats: [
                { base_stat: pokemon.stats[0].base_stat, stat: { name: pokemon.stats[0].stat.name }},
                { base_stat: pokemon.stats[1].base_stat, stat: { name: pokemon.stats[1].stat.name }},
                { base_stat: pokemon.stats[2].base_stat, stat: { name: pokemon.stats[2].stat.name }},
                { base_stat: pokemon.stats[3].base_stat, stat: { name: pokemon.stats[3].stat.name }},
                { base_stat: pokemon.stats[4].base_stat, stat: { name: pokemon.stats[4].stat.name }},
                { base_stat: pokemon.stats[5].base_stat, stat: { name: pokemon.stats[5].stat.name }},
            ],
            species: {
                name: pokemon.species.name,
                url: pokemon.species.url,
            },
            types: [
                { type: { name: pokemon.types[0].type.name }},
            ],
            rarity: pokemon.rarity,
            times: 1,
            cries: {
                latest: pokemon.cries.latest,
            },
            habitat: {
                name: pokemon.habitat.name,
            },
        };
        dispatch({ type: 'ADD_POKEMON', payload: newPokemon });
      };

    const handleRevealAndAddPokemon = () => {
        setTimeout(() => {
            reverseCard();
            handleAddPokemon();
        }, 500);
    }

    return (
        <div className={"[perspective:1000px] [transform-style:preserve-3d] transition-all duration-1000 " + (reversed?"":" [transform:rotateY(180deg)] ") + (show?"flex ":"hidden ") + " relative w-52 h-80"}
            onLoad={() => {
                if(canSelect) handleRevealAndAddPokemon();
            }}>
            <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/images/pokemon-card-reverse-2.png)'}}></div>
            <div className={"[backface-visibility:hidden] absolute top-0 left-0 grid grid-cols-2 justify-between w-full h-full rounded-xl bg-gradient-to-r " + (isOwned?'':'grayscale ') + typesGradients[pokemon.types[0].type.name] + " cursor-pointer shadow-md shadow-gray-500"}>
                <div>
                    <p className="font-semibold m-4 mb-0">{pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}</p>
                    <div className="mx-4 flex gap-1">
                        <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />
                        {pokemon.rarity < 200 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                        {pokemon.rarity < 100 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                        {pokemon.rarity < 50 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                        {pokemon.rarity < 10 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                    </div>
                </div>
                <Link href="/pokemon/[id]" as={`/pokemon/${pokemon.id}`} className="p-2 rounded-se-xl rounded-es-xl h-fit hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-150 justify-self-end"><EyeIcon /></Link>
                <div className="pointer-events-none overflow-hidden rounded-xl absolute top-0 left-0 w-full h-full after:absolute after:top-0 after:translate-x-full hover:after:-translate-x-full after:transition-all after:duration-1000 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-40"></div>
                <Image className="absolute bottom-3 justify-self-center max-w-none w-auto h-4/5 drop-shadow-[4px_4px_4px_#111] pointer-events-none" src={pokemon.image} alt="Pokemon" width={320} height={320} />
            </div>
            <Link href="">Voir les stats</Link>
        </div>
    );
};