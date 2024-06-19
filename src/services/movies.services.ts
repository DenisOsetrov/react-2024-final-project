import api from './api.service';
import {IMoviesResponse} from "../models/movies/IMoviesResponse";
import {IMovie} from "../models/movies/IMovie";
import axios from "axios";

// Функція для отримання фільмів
export const getMovies = async (page: number): Promise<IMoviesResponse> => {
    try {
        if (page > 500) {
            throw new Error('Invalid page number requested. Please try a different page.');
        }

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
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Failed to fetch movies. Please try again later.');
        }
        throw error;
    }
};

export const getMovieById = async (id: number): Promise<IMovie> => {
    const response = await api.get<IMovie>(`/movie/${id}`, {
        params: {
            language: 'en-US',
        },
    });
    return response.data;
};