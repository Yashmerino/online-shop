import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

const initialState = {
    roles: [{ id: 0, name: "null" }]
}

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        updateRoles: (state, action: PayloadAction<Array<{
            id: number;
            name: string;
        }>>) => {
            state.roles = action.payload;
        }
    }
})

export const { updateRoles } = rolesSlice.actions

export const getRoles = (state: RootState) => state.roles;

export default rolesSlice.reducer;