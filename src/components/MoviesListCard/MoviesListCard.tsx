import React from 'react';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

const MoviesListCard: React.FC<{ movie: Movie }> = ({ movie }) => (
    <div>
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p>
    </div>
);

export default MoviesListCard;