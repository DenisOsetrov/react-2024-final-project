import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movies/IMovie';
import { getMovies, getMovieById } from '../../services/movies.services';
import { RootState } from "../store/store";

interface MoviesState {
    moviesList: IMovie[];
    movieDetails: IMovie | null;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    moviesList: [],
    movieDetails: null,
    currentPage: 1,
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk<IMovie[], number>(
    'movies/fetchMovies',
    async (page: number) => {
        const response = await getMovies(page);
        return response.results; // Отримання результату списку фільмів
    }
);

export const fetchMovieById = createAsyncThunk<IMovie, number>(
    'movies/fetchMovieById',
    async (id: number) => {
        return await getMovieById(id);
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        resetMovies: (state) => {
            state.moviesList = [];
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.loading = false;
                if (state.currentPage === 1) {
                    state.moviesList = action.payload;
                } else {
                    state.moviesList = [...state.moviesList, ...action.payload];
                }
                state.currentPage += 1;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies';
            })
            .addCase(fetchMovieById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<IMovie>) => {
                state.loading = false;
                state.movieDetails = action.payload;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movie details';
            });
    },
});

export const { resetMovies } = moviesSlice.actions;
export const selectMovies = (state: RootState) => state.movies.moviesList;
export const selectMovieDetails = (state: RootState) => state.movies.movieDetails;

const moviesReducer = moviesSlice.reducer;
export default moviesReducer;