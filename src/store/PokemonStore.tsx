"use client"

import { createContext, useReducer, ReactNode, useContext } from 'react';

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string[];
    times: number;
}

// Définir le type d'action pour le reducer
type Action =
  | { type: 'ADD_POKEMON'; payload: Pokemon }
  | { type: 'REMOVE_POKEMON'; payload: number }
  | { type: 'CLEAR_COLLECTION' };

// Définir le type pour l'état
interface State {
  collection: Pokemon[];
}

// État initial
const initialState: State = {
  collection: [],
};

// Créer le reducer
const pokemonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_POKEMON':
      const existingPokemon = state.collection.find((p) => p.id === action.payload.id);
      if (existingPokemon) {
      return {
        ...state,
        collection: state.collection.map((p) =>
        p.id === action.payload.id ? { ...p, times: p.times + 1 } : p
        ),
      };
      } else {
      return { ...state, collection: [...state.collection, { ...action.payload, times: 1 }] };
      }
    case 'REMOVE_POKEMON':
      return {
        ...state,
        collection: state.collection.filter((p) => p.id !== action.payload),
      };
    case 'CLEAR_COLLECTION':
      return { ...state, collection: [] };
    default:
      return state;
  }
};

// Créer le contexte
const PokemonContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Fournisseur
interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte
export const usePokemonStore = () => useContext(PokemonContext);
