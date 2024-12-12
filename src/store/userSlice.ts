import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string
  pokecoins : number
  redeemCode : string
  gacha: number
  cries: boolean

}

const initialState: User = {
  username: 'Username',
  pokecoins: 10,
  redeemCode: '',
  gacha: 0,
  cries: false,
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
  }
})

export const { setUsername, reduceCoins, addCoins, redeemCode, setGacha, setPokemonCries } = usersSlice.actions
export default usersSlice.reducer