import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGenres, getMoviesByGenre } from '../../services/genres.services';
import { IGenre } from '../../models/genres/IGenre';
import { IMovie } from '../../models/movies/IMovie';
import { RootState } from '../store/store';

interface GenresState {
    genresList: IGenre[];
    genreMovies: IMovie[];
    loading: boolean;
    error: string | null;
    totalPages: number;  // Загальна кількість сторінок
}

const initialState: GenresState = {
    genresList: [],
    genreMovies: [],
    loading: false,
    error: null,
    totalPages: 0,  // Ініціалізація загальної кількості сторінок
};

export const fetchGenres = createAsyncThunk<IGenre[]>(
    'genres/fetchGenres',
    async () => {
        const response = await getGenres();
        return response.genres;
    }
);

interface FetchMoviesByGenreParams {
    genreId: number;
    page: number;
}

export const fetchMoviesByGenre = createAsyncThunk(
    'genres/fetchMoviesByGenre',
    async ({ genreId, page }: FetchMoviesByGenreParams) => {
        const response = await getMoviesByGenre(genreId, page);
        return {
            results: response.results,
            totalPages: Math.min(response.total_pages, 500), // Обмеження до 500 сторінок
        };
    }
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        resetMovies: (state) => {
            state.genreMovies = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.loading = false;
                state.genresList = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch genres';
            })
            .addCase(fetchMoviesByGenre.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByGenre.fulfilled, (state, action: PayloadAction<{ results: IMovie[], totalPages: number }>) => {
                state.loading = false;
                state.genreMovies = action.payload.results;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies by genre';
            });
    },
});

export const { resetMovies } = genresSlice.actions;

export const selectGenres = (state: RootState) => state.genres.genresList;
export const selectGenreMovies = (state: RootState) => state.genres.genreMovies;
export const selectTotalPages = (state: RootState) => state.genres.totalPages;

const genresReducer = genresSlice.reducer;
export default genresReducer;