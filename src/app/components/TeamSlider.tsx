"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removePokemonTeam } from "@/store/userSlice";
import { TeamIterator } from "@/iterator/TeamIterator";
import { PokemonCache } from "@/singleton/PokemonCache";
import { PokemonFactory } from "@/factory/pokemonFactory";
import { PokemonItem } from "@/types/pokemon";

export const MAX_TEAM_SIZE = 6;

export default function TeamSlider() {
  const dispatch = useDispatch();
  const pokemonTeams = useSelector((s: RootState) => s.user.pokemonTeams);
  const [defaultPokemon, setDefaultPokemon] = useState<PokemonItem | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (pokemonTeams.length === 0 && !defaultPokemon) {
      PokemonCache.getInstance()
        .getOrFetch("mewtwo", (id) =>
          fetch(`/api/pokemons/${id}`).then(r => r.json()).then(p => p.data)
        )
        .then((data) => setDefaultPokemon(PokemonFactory.createStandard(data)));
    }
  }, [pokemonTeams.length, defaultPokemon]);

  const displayed: PokemonItem[] = useMemo(() => {
    if (pokemonTeams.length > 0) return pokemonTeams;
    return defaultPokemon ? [defaultPokemon] : [];
  }, [pokemonTeams, defaultPokemon]);

  const iterator = useMemo(() => new TeamIterator(displayed, index), [displayed, index]);

  if (!iterator.hasItems()) {
    return <div className="w-[420px] h-[420px]" />;
  }

  const current = iterator.current()!;
  const isDefault = pokemonTeams.length === 0;

  const handleNext = () => {
    iterator.next();
    setIndex(iterator.getIndex());
  };

  const handlePrev = () => {
    iterator.previous();
    setIndex(iterator.getIndex());
  };

  const handleRemove = () => {
    if (isDefault) return;
    dispatch(removePokemonTeam(current));
    setIndex(Math.max(0, index - 1));
  };

  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center">
      <button
        onClick={handlePrev}
        disabled={iterator.size() <= 1}
        aria-label="Previous pokemon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={32} />
      </button>

      <Image
        src={current.image}
        alt={current.species.name}
        width={360}
        height={360}
        className={"max-h-full w-auto object-contain drop-shadow-[6px_6px_4px_#111] pointer-events-none " + (current.isShiny ? "brightness-125 saturate-150" : "")}
      />

      <button
        onClick={handleNext}
        disabled={iterator.size() <= 1}
        aria-label="Next pokemon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={32} />
      </button>

      {!isDefault && (
        <button
          onClick={handleRemove}
          aria-label="Remove from team"
          className="absolute top-0 right-0 z-10 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
