"use client"

import { useState } from "react";
import Image from "next/image";
import { PokemonItem } from "@/types/pokemon";
import { usePokemonStore } from "../../store/PokemonStore";
import { typesGradients } from "@/utils/gradients";
import Link from "next/link";
import { EyeIcon, Plus } from "lucide-react";
import { DecoratedPokemon } from "@/decorator/pokemonDecorator";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addPokemonsTeam } from "@/store/userSlice";
import { MAX_TEAM_SIZE } from "./TeamSlider";

export const CardShine = ({ pokemon, show, initialReverse, canSelect, canAddToTeam}: { pokemon: PokemonItem | DecoratedPokemon, show: boolean, initialReverse?: boolean, canSelect?: boolean, canAddToTeam?: boolean}) => {
    const { state, dispatch } = usePokemonStore();
    const reduxDispatch = useDispatch();
    const pokemonTeams = useSelector((s: RootState) => s.user.pokemonTeams);
    const isOwned = state.collection.some(item => item.id === pokemon.id && !!item.isShiny === !!(pokemon as DecoratedPokemon).isShiny);
    const isInTeam = pokemonTeams.some(t => t.id === pokemon.id && !!t.isShiny === !!(pokemon as DecoratedPokemon).isShiny);
    const teamFull = pokemonTeams.length >= MAX_TEAM_SIZE;
    const [reversed, setReversed] = useState(initialReverse);
    const [added, setAdded] = useState(false);
    const [canAddCard, setCanAddCard] = useState(canSelect);

    const handleAddToTeam = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInTeam || teamFull) return;
        reduxDispatch(addPokemonsTeam(pokemon));
    };

    const reverseCard = () => {
        setReversed(!reversed);
    }

    const handleAddPokemon = async () => {
        if (!added) {
            console.log('Adding pokemon to collection');
            dispatch({ type: 'ADD_POKEMON', payload: pokemon });
            setAdded(true);
        }
    };

    const handleRevealAndAddPokemon = () => {
        reverseCard();
        handleAddPokemon();
        setCanAddCard(false);
    }

    return (
        <div className={"[perspective:1000px] [transform-style:preserve-3d] transition-all duration-1000 " + (reversed?"":" [transform:rotateY(180deg)] ") + (show?"flex ":"hidden ") + " relative w-52 h-80"}
            onClick={() => canAddCard ? handleRevealAndAddPokemon() : reverseCard()}
        >
            <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/images/pokemon-card-reverse-2.png)'}}></div>
            <div className={"[backface-visibility:hidden] absolute top-0 left-0 grid grid-cols-[1fr,auto,auto] w-full h-full rounded-xl bg-gradient-to-r " + (isOwned?'':'grayscale ') + typesGradients[pokemon.types[0].type.name] + ((pokemon as DecoratedPokemon).isLegendary ? " ring-4 ring-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] " : "") + ((pokemon as DecoratedPokemon).isShiny ? " outline outline-4 outline-fuchsia-400 shadow-[0_0_30px_rgba(232,121,249,1)] brightness-125 saturate-150 " : "") + " cursor-pointer shadow-md shadow-gray-500"}>
                <div>
                    <p className="font-semibold m-4 mb-0 flex items-center justify-between">
                        {pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}
                        {(pokemon as DecoratedPokemon).isShiny && <span className="ml-2">✨</span>}
                    </p>
                    <div className="mx-4 flex gap-1">
                        {Array.from({ length: (pokemon as DecoratedPokemon).stars || 1 }).map((_, i) => (
                            <Image key={i} className="w-4 h-4" src="/images/star.svg" alt="Star" width={24} height={24} />
                        ))}
                    </div>
                </div>
                {pokemon.times > 1 && <p className="flex items-center justify-center m-2 p-2 w-8 h-8 rounded-full bg-gray-700 bg-opacity-50 justify-self-end font-bold"><span className="text-xs">x</span>{pokemon.times}</p>}
                <Link href="/pokemon/[id]" as={`/pokemon/${pokemon.id}`} className="p-2 rounded-se-xl rounded-es-xl h-fit hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-150 justify-self-end"><EyeIcon /></Link>
                <div className="pointer-events-none overflow-hidden rounded-xl absolute top-0 left-0 w-full h-full after:absolute after:top-0 after:translate-x-full hover:after:-translate-x-full after:transition-all after:duration-1000 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-40"></div>
                <Image className="absolute bottom-3 justify-self-center max-w-none w-auto h-4/5 drop-shadow-[4px_4px_4px_#111] pointer-events-none" src={pokemon.image} alt="Pokemon" width={320} height={320} />
                {canAddToTeam && (
                    <button
                        onClick={handleAddToTeam}
                        disabled={isInTeam || teamFull}
                        aria-label={isInTeam ? "Already in team" : teamFull ? "Team is full" : "Add to team"}
                        title={isInTeam ? "Already in team" : teamFull ? "Team is full (6/6)" : "Add to team"}
                        className={"absolute bottom-2 left-2 z-20 flex items-center justify-center w-10 h-10 rounded-full border-2 border-black shadow-md transition " + (isInTeam ? "bg-green-500 text-white cursor-not-allowed" : teamFull ? "bg-gray-400 text-white cursor-not-allowed" : "bg-yellow-400 text-black hover:scale-110 hover:bg-yellow-300")}
                    >
                        <Plus size={22} strokeWidth={3} />
                    </button>
                )}
            </div>
            <Link href="">Voir les stats</Link>
        </div>
    );
};