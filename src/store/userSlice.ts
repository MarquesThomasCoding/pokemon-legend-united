import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string
}

const initialState: User = {
  username: 'trainer'
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