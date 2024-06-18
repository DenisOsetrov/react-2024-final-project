import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api.service";


export const getMovies = createAsyncThunk('movies/getMovies', async (page: number) => {
    const response = await api.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`);
    return response.data.results;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesList: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.moviesList = action.payload;
        });
        builder.addCase(getMovies.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default moviesSlice.reducer;