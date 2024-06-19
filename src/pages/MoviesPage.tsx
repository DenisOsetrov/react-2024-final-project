import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import MoviesList from '../components/MoviesList/MoviesList';
import {fetchMovies, resetMovies} from '../redux/slices/moviesSlice';

const MoviesPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.moviesList);

    useEffect(() => {
        dispatch(resetMovies()); // Скидання списку фільмів перед новим завантаженням
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleLoadMore = () => {
        dispatch(fetchMovies(page + 1)); // Завантажуємо наступну сторінку фільмів
    };

    return (
        <div>
            <h2>Movies Page</h2>
            <MoviesList movies={movies} />
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
                <button onClick={handleLoadMore}>Load More</button>
            </div>
        </div>
    );
};

export default MoviesPage;