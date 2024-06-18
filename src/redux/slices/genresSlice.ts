import {IGenre} from "../../models/IGenre";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IGenre[] = [];

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<IGenre[]>) => {
            return action.payload;
        },
    },
});

export const { setGenres } = genresSlice.actions;
const genresReducer = genresSlice.reducer;
export default genresReducer;