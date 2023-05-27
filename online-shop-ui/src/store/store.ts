import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "../app/slices/jwtSlicer";

const store = configureStore({
    reducer: {
        jwt: jwtReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch