import api from './api.service';
import {IMoviesResponse} from "../models/movies/IMoviesResponse";
import {IMovie} from "../models/movies/IMovie";

// Функція для отримання фільмів
export const getMovies = async (page: number): Promise<IMoviesResponse> => {
    const response = await api.get<IMoviesResponse>('/discover/movie', {

        params: {
            language: 'en-US',
            page,
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false
        }
    });
    return response.data;
};

export const getMovieById = async (id: number): Promise<IMovie> => {
    const response = await api.get<IMovie>(`/movie/${id}`, {
        params: {
            language: 'en-US',
        },
    });
    return response.data;
};