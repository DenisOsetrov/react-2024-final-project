import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies } from '../../services/movies.services';
import { IMovie } from '../../models/movies/IMovie';

interface SearchState {
    searchResults: IMovie[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    searchResults: [],
    loading: false,
    error: null,
};

export const fetchMoviesByQuery = createAsyncThunk(
    'search/fetchMoviesByQuery',
    async (query: string) => {
        return await searchMovies(query); // Example: service function for searching movies
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesByQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.results;
            })
            .addCase(fetchMoviesByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search movies';
            });
    },
});

export default searchSlice.reducer;