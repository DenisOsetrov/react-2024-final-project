import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getMovies} from "../redux/slices/moviesSlice";
import MoviesList from "../components/MoviesList/MoviesList";


const MoviesPage: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies(1));
    }, [dispatch]);

    return (
        <div>
            <MoviesList />
        </div>
    );
};

export default MoviesPage;