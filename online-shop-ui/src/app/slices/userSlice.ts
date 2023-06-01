import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export interface User {
    info: object
}

const initialState: User = {
    info: { username: "" }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<object>) => {
            state.info = action.payload;
        }
    }
})

export const { updateUserInfo } = userSlice.actions

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;