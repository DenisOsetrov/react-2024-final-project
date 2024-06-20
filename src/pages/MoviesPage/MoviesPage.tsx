import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchMovies, resetMovies } from '../../redux/slices/moviesSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './MoviesPage.css'; // Додаємо CSS стилі

const MoviesPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.moviesList);
    const totalPages = useSelector((state: RootState) => state.movies.totalPages);

    const fetchMoviesFromPage = useCallback(
        async (pageNumber: number) => {
            try {
                await dispatch(fetchMovies(pageNumber));
            } catch (error: any) {
                console.error('Error fetching movies:', error.message);
            }
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(resetMovies());
        fetchMoviesFromPage(page);
    }, [dispatch, fetchMoviesFromPage, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        if (value > 0 && value <= totalPages) { // Перевіряємо, що сторінка в межах доступних значень
            setPage(value);
        } else {
            console.error(`Invalid page number requested: ${value}`);
            // Можна показати повідомлення користувачу про недійсну сторінку
        }
    };

    return (
        <div>
            <h2>Movies Page</h2>
            <MoviesList movies={movies} />
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default MoviesPage;