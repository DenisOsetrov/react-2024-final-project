import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {getMovies} from '../../services/movies.services';
import {IMovie} from '../../models/IMovie';
import {RootState} from "../store/store";


interface MoviesState {
    moviesList: IMovie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    moviesList: [],
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk<IMovie[], number>(
    'movies/fetchMovies',
    async (page: number) => {
        const response = await getMovies(page);
        return response;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.loading = false;
                state.moviesList = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies';
            });
    },
});

export const selectMovies = (state: RootState) => state.movies.moviesList;


const moviesReducer = moviesSlice.reducer;
export default moviesReducer;