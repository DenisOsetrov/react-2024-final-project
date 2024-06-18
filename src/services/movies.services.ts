import api from './api.service';

// Функція для отримання фільмів
export const getMovies = async (page: number) => {
    const response = await api.get('/discover/movie', {
        params: {
            language: 'en-US',
            page,
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false
        }
    });
    return response.data.results;
};