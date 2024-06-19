import api from './api.service';
import {IGenresResponse} from "../models/genres/IGenresResponse";
import {IMoviesResponse} from "../models/movies/IMoviesResponse";

// Функція для отримання жанрів
export const getGenres = async (): Promise<IGenresResponse> => {
    const response = await api.get<IGenresResponse>('/genre/movie/list', {
        params: {
            language: 'en-US'
        }
    });
    return response.data;
};

export const getMoviesByGenre = async (genreId: number, page: number): Promise<IMoviesResponse> => {
    const response = await api.get<IMoviesResponse>('/discover/movie', {
        params: {
            with_genres: genreId,
            language: 'en-US',
            page,
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
        },
    });
    return response.data;
};