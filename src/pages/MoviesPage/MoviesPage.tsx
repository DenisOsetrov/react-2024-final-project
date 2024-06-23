import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store/store';
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchMovies, resetMovies, selectMoviesList, selectLoading, selectError } from '../../redux/slices/moviesSlice';
import { fetchGenres } from '../../redux/slices/genresSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../../styles/pagination.css';
import '../../styles/moviesGenresPageName.css';

const MoviesPage: React.FC = () => {
    const { pageNumber } = useParams<{ pageNumber: string }>(); // Отримання номера сторінки з URL за допомогою useParams
    const navigate = useNavigate(); // Хук useNavigate для навігації між сторінками
    const page = pageNumber ? parseInt(pageNumber, 10) : 1; // Конвертація номера сторінки в числовий формат
    const dispatch: AppDispatch = useDispatch(); // Отримання функції dispatch з Redux для виклику дій
    const movies = useSelector(selectMoviesList); // Витягнення списку фільмів з Redux store
    const loading = useSelector(selectLoading); // Витягнення статусу завантаження з Redux store
    const error = useSelector(selectError); // Витягнення помилки з Redux store
    const totalPages = useSelector((state: RootState) => state.movies.totalPages); // Витягнення загальної кількості сторінок з Redux store

    // Колбек для асинхронного завантаження фільмів з певної сторінки
    const fetchMoviesFromPage = useCallback(
        async (pageNumber: number) => {
            try {
                await dispatch(fetchMovies(pageNumber)); // Виклик функції fetchMovies для завантаження фільмів з певної сторінки
            } catch (error: any) {
                console.error('Error fetching movies:', error.message); // Обробка помилок під час завантаження фільмів
            }
        },
        [dispatch]
    );

    // Виклик ефектів при завантаженні компоненту
    useEffect(() => {
        dispatch(fetchGenres()); // Завантаження жанрів при монтуванні компоненту
        dispatch(resetMovies()); // Скидання списку фільмів перед завантаженням нових
        fetchMoviesFromPage(page); // Завантаження фільмів з поточної сторінки
    }, [dispatch, fetchMoviesFromPage, page]);

    // Відображення компоненту
    return (
        <div>
            <h2 className="page-header">Movies Page</h2>
            {loading && <p>Loading...</p>} {/* Відображення повідомлення про завантаження, якщо фільми ще не завантажені */}
            {error && <p>Error: {error}</p>} {/* Відображення повідомлення про помилку, якщо вона виникла */}
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => navigate(`/page/${value}`)} // Зміна сторінки при кліку на пагінаційній кнопці
                    shape="rounded"
                />
            </Stack>
            <MoviesList movies={movies} /> {/* Відображення списку фільмів */}
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => navigate(`/page/${value}`)} // Зміна сторінки при кліку на пагінаційній кнопці
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default MoviesPage;