"use client"

import { useState } from "react";
import Image from "next/image";
import { PokemonItem } from "../../store/PokemonStore";
import { usePokemonStore } from "../../store/PokemonStore";
import { typesGradients } from "@/utils/gradients";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Link from "next/link";

export const CardShine = ({ pokemon, show, initialReverse, canSelect, setTypes, setRegion}: { pokemon: PokemonItem, show: boolean, initialReverse?: boolean, canSelect?: boolean, setTypes: string, setRegion: string}) => {
    const { state } = usePokemonStore();
    const isOwned = state.collection.some(item => item.id === pokemon.id);
    const [reversed, setReversed] = useState(initialReverse);
    const pokemonCries = useSelector((state: RootState) => state.user.cries);
    const { dispatch } = usePokemonStore();
    
    const reverseCard = () => {
        setReversed(!reversed);
    }

    const handleAddPokemon = async () => {
        const newPokemon: PokemonItem = {
            id: pokemon.id,
            image: pokemon.image,
            species: {
                name: pokemon.species.name,
                url: pokemon.species.url,
            },
            types: [
                {
                    type: {
                        name: pokemon.types[0].type.name,
                    },
                },
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
    
    const criesPokemon = () => {
        if(pokemonCries){
            const audio = new Audio(pokemon.cries.latest);
            audio.play();
        }
    }

    return (
        <div className={"[perspective:1000px] [transform-style:preserve-3d] transition-all duration-1000" + (reversed?"":" [transform:rotateY(180deg)] ") + (show?"flex":"hidden") + " relative w-52 h-80"} 
        style={{display: (setTypes==="all" || setTypes===pokemon.types[0].type.name || setTypes===pokemon.types[1]?.type.name) ? "": "none !important"}}
            onClick={() => {
                reverseCard(); 
                criesPokemon();
                if(canSelect) handleAddPokemon()
            }}>
            <div className={"w-full h-full absolute top-0 left-0 rounded-xl bg-cover bg-no-repeat" + (!isOwned?" grayscale":"")} style={{ backgroundImage: 'url(/images/pokemon-card-reverse-2.png)'}}></div>
            <div className={"[backface-visibility:hidden] absolute top-0 left-0 flex flex-col w-full h-full rounded-xl bg-gradient-to-r " + typesGradients[pokemon.types[0].type.name] + (!isOwned?" grayscale":"") + " cursor-pointer shadow-md shadow-gray-500"}>
                <p className="font-semibold m-4 mb-0">{pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}</p>
                <div className="mx-4 flex gap-1">
                    <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />
                    {pokemon.rarity < 200 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                    {pokemon.rarity < 100 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                    {pokemon.rarity < 50 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                    {pokemon.rarity < 10 && <Image className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />}
                </div>
                <div className="overflow-hidden rounded-xl absolute top-0 left-0 w-full h-full after:absolute after:top-0 after:translate-x-full hover:after:-translate-x-full after:transition-all after:duration-1000 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-40"></div>
                <Image className="absolute bottom-3 self-center max-w-none w-auto h-4/5 drop-shadow-[4px_4px_4px_#111] pointer-events-none" src={pokemon.image} alt="Pokemon" width={320} height={320} />
            </div>
            <button 
            // onClick={handleAddPokemonTeams}
            >Ajouter à la collection</button>
            <Link href="">Voir les stats</Link>
        </div>
    );
};