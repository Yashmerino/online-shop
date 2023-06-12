import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export interface UserInfo {
    sub: string
}

export interface User {
    info: UserInfo
}

const initialState: User = {
    info: { sub: "" }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.info = action.payload;
        }
    }
})

export const { updateUserInfo } = userSlice.actions

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;