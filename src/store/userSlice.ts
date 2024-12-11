import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string
  pokecoins : number
}

const initialState: User = {
  username: 'Username',
  pokecoins: 10
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
    }
  }
})

export const { setUsername } = usersSlice.actions
export default usersSlice.reducer