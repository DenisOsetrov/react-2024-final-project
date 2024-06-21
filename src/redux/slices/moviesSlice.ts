import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movies/IMovie';
import { getMovies, getMovieById, searchMovies } from '../../services/movies.services';
import { RootState } from '../store/store';
import { IMoviesResponse } from "../../models/movies/IMoviesResponse";

interface MoviesState {
    moviesList: IMovie[];
    movieDetails: IMovie | null;
    currentPage: number;
    totalPages: number;
    totalMovies: number;
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    moviesList: [],
    movieDetails: null,
    currentPage: 1,
    totalPages: 500,
    totalMovies: 0,
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk<IMoviesResponse, number>(
    'movies/fetchMovies',
    async (page: number) => {
        return await getMovies(page);
    }
);

export const fetchMovieById = createAsyncThunk<IMovie, number>(
    'movies/fetchMovieById',
    async (id: number) => {
        return await getMovieById(id);
    }
);

export const fetchMoviesByQuery = createAsyncThunk<IMoviesResponse, string>(
    'movies/fetchMoviesByQuery',
    async (query: string) => {
        return await searchMovies(query);
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        resetMovies: (state) => {
            state.moviesList = [];
            state.currentPage = 1;
            state.totalPages = 500; // Залишаємо 500 сторінок
            state.totalMovies = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMoviesResponse>) => {
                state.loading = false;
                if (state.currentPage === 1) {
                    state.moviesList = action.payload.results;
                } else {
                    state.moviesList = [...state.moviesList, ...action.payload.results];
                }
                state.totalPages = Math.min(action.payload.total_pages, 500);
                state.totalMovies = action.payload.total_results;
                state.currentPage = action.payload.page;
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
            })
            .addCase(fetchMoviesByQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByQuery.fulfilled, (state, action: PayloadAction<IMoviesResponse>) => {
                state.loading = false;
                state.moviesList = action.payload.results;
                state.totalPages = Math.min(action.payload.total_pages, 500);
                state.totalMovies = action.payload.total_results;
                state.currentPage = 1; // Знайдені результати показують першу сторінку
            })
            .addCase(fetchMoviesByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search movies';
            });
    },
});

export const { resetMovies } = moviesSlice.actions;
export const selectMovieDetails = (state: RootState) => state.movies.movieDetails;
export const selectMoviesList = (state: RootState) => state.movies.moviesList;
export const selectLoading = (state: RootState) => state.movies.loading;
export const selectError = (state: RootState) => state.movies.error;

const moviesReducer = moviesSlice.reducer;
export default moviesReducer;