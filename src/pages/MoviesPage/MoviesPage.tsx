import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store/store';
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchMovies, resetMovies } from '../../redux/slices/moviesSlice';
import { fetchGenres } from '../../redux/slices/genresSlice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './MoviesPage.css';

const MoviesPage: React.FC = () => {
    const { pageNumber } = useParams<{ pageNumber: string }>();
    const navigate = useNavigate();
    const page = pageNumber ? parseInt(pageNumber, 10) : 1;
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
        dispatch(fetchGenres()); // додано
        dispatch(resetMovies());
        fetchMoviesFromPage(page);
    }, [dispatch, fetchMoviesFromPage, page]);

    return (
        <div>
            <h2>Movies Page</h2>
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => navigate(`/page/${value}`)} // оновлення
                    shape="rounded"
                />
            </Stack>
            <MoviesList movies={movies} />
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => navigate(`/page/${value}`)} // оновлення
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default MoviesPage;