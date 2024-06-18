import { configureStore } from '@reduxjs/toolkit';
import genresReducer from "../slices/genresSlice";
import moviesReducer from "../slices/moviesSlice";


const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
    },
});

// Визначте RootState та AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
