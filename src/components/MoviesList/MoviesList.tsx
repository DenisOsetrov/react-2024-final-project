import React from 'react';
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import { IMovie } from "../../models/movies/IMovie";
import './MoviesList.css';
import { Link } from "react-router-dom";

interface Props {
    movies: IMovie[];
}

const MoviesList: React.FC<Props> = ({ movies }) => {
    // Перевірка на пустий список фільмів
    if (!movies || movies.length === 0) {
        return <div>No movies found.</div>;
    }

    return (
        <div className="movies-container">
            {movies.map((movie: IMovie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card-link">
                    <MoviesListCard movie={movie} />
                </Link>
            ))}
        </div>
    );
};

export default MoviesList;