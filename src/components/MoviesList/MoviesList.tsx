import React from 'react';
import { useSelector } from 'react-redux';
import {RootState} from "@reduxjs/toolkit/query";
import MoviesListCard from "../MoviesListCard/MoviesListCard";


const MoviesList: React.FC = () => {
    const movies = useSelector((state: RootState) => state.movies.moviesList);

    return (
        <div>
            {movies.map((movie) => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;