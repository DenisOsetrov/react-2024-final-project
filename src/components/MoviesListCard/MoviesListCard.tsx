import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';

interface IProps {
    movie: {
        poster_path: string;
        title: string;
        release_date: string;
    };
}

const MoviesListCard: React.FC<IProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            <MoviePoster
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                size="small"
            />
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MoviesListCard;





