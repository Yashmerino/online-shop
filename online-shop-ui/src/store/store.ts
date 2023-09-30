import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "../app/slices/jwtSlice";
import userReducer from "../app/slices/usernameSlice";
import langReducer from "../app/slices/langSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import usernameSlice from "../app/slices/usernameSlice";
import rolesSlice from "../app/slices/rolesSlice";
import langSlice from "../app/slices/langSlice";

const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers({ jwt: jwtReducer, username: usernameSlice, roles: rolesSlice, lang: langSlice });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch