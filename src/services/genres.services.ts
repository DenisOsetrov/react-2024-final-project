import api from './api.service';

// Функція для отримання жанрів
export const getGenres = async () => {
    const response = await api.get('/genre/movie/list', {
        params: {
            language: 'en-US'
        }
    });
    return response.data.genres;
};