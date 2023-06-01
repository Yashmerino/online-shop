import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "../app/slices/jwtSlice";
import userReducer from "../app/slices/userSlice";

const store = configureStore({
    reducer: {
        jwt: jwtReducer,
        user: userReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch