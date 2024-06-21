import React, { FC } from 'react';
import { IMovie } from "../../models/movies/IMovie";
import { Link } from "react-router-dom";
import { Badge } from "../PosterPreviewComponent/BadgeStyles";
import '../MoviesList/MoviesList.css';

interface IProps {
    movie: IMovie;
}

const MoviesListCard: FC<IProps> = ({ movie }) => {
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';

    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <Badge badgeContent={releaseYear.toString()} max={9999} className="small">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </Badge>
                <h3>{movie.title}</h3>
            </Link>
        </div>
    );
};

export default MoviesListCard;