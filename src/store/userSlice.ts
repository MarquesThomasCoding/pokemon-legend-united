import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonItem } from './PokemonStore'

interface User {
  username: string
  pokecoins : number
  redeemCode : string
  gacha: number
  cries: boolean
  pokemonTeams: PokemonItem[]
}

const initialState: User = {
  username: 'Username',
  pokecoins: 10,
  redeemCode: '',
  gacha: 0,
  cries: false,
  pokemonTeams: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
    },
    reduceCoins: (state, action: PayloadAction<number>) => {
        state.pokecoins -= action.payload;
    },
    addCoins: (state, action: PayloadAction<number>) => {
        state.pokecoins += action.payload;
    },
    redeemCode: (state, action: PayloadAction<string>) => {
        state.redeemCode = action.payload;
        switch (state.redeemCode) {
          case 'Moltres666':
            state.pokecoins += 500;
          case 'Reshiram777':
            state.pokecoins += 777;
          case 'Pikachu131224':
            state.pokecoins += 20;
          case 'Voltorbe0901':
            state.pokecoins += 11;
        }
    },
    setGacha: (state, action: PayloadAction<number>) => {
        state.gacha = action.payload;
    },
    setPokemonCries: (state, action: PayloadAction<boolean>) => {
        state.cries = action.payload;
    },
    addPokemonsTeam: (state, action: PayloadAction<PokemonItem>) => {
        state.pokemonTeams.push(action.payload);
    },
    removePokemonTeam: (state, action: PayloadAction<PokemonItem>) => {
        state.pokemonTeams = state.pokemonTeams.filter(team => team.id !== action.payload.id);
    },  
    setPokemonTeams : (state, action: PayloadAction<PokemonItem[]>) => {
        state.pokemonTeams = action.payload;
    },
  }
})

export const { setUsername, reduceCoins, addCoins, redeemCode, setGacha, setPokemonCries, addPokemonsTeam, removePokemonTeam, setPokemonTeams } = usersSlice.actions
export default usersSlice.reducer