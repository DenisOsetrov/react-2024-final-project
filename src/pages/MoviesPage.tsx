import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {AppDispatch, RootState} from "../redux/store/store";
import MoviesList from "../components/MoviesList/MoviesList";
import {fetchMovies} from '../redux/slices/moviesSlice';

const MoviesPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.moviesList);

    useEffect(() => {
        dispatch(fetchMovies(20));
    }, [dispatch]);

    return (
        <div>
            <h2>Movies Page</h2>
            {/* Передаємо movies як властивість в MoviesList */}
            <MoviesList movies={movies} />
        </div>
    );
};

export default MoviesPage;
