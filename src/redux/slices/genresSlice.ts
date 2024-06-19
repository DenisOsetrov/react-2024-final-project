import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IGenre } from '../../models/genres/IGenre';
import { IMovie } from '../../models/movies/IMovie';
import { RootState } from '../store/store';
import { getGenres, getMoviesByGenre } from '../../services/genres.services';

interface GenresState {
    genresList: IGenre[];
    genreMovies: IMovie[];
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    genresList: [],
    genreMovies: [],
    loading: false,
    error: null,
};

export const fetchGenres = createAsyncThunk<IGenre[]>(
    'genres/fetchGenres',
    async () => {
        const response = await getGenres();
        return response.genres;  // Повертайте масив жанрів безпосередньо
    }
);

interface FetchMoviesByGenreParams {
    genreId: number;
    page: number;
}

export const fetchMoviesByGenre = createAsyncThunk<IMovie[], FetchMoviesByGenreParams>(
    'genres/fetchMoviesByGenre',
    async ({ genreId, page }) => {
        const response = await getMoviesByGenre(genreId, page);
        return response.results;  // Повертайте масив фільмів безпосередньо
    }
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
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
            .addCase(fetchMoviesByGenre.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.loading = false;
                state.genreMovies = action.payload;
            })
            .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies by genre';
            });
    },
});

export const selectGenres = (state: RootState) => state.genres.genresList;
export const selectGenreMovies = (state: RootState) => state.genres.genreMovies;

const genresReducer = genresSlice.reducer;
export default genresReducer;