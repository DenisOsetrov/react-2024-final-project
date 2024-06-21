import React, { FC } from 'react';
import { IMovie } from "../../models/movies/IMovie";
import { Link } from "react-router-dom";
import { Badge } from "../PosterPreviewComponent/BadgeStyles";

interface IProps {
    movie: IMovie;
}

const MoviesListCard: FC<IProps> = ({ movie }) => {

    const releaseYear = new Date(movie.release_date).getFullYear();

    return (
        <div>
            <Link to={`/movie/${movie.id}`}>
                <Badge badgeContent={releaseYear} max={9999} className="small">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </Badge>
                <h3>{movie.title}</h3>
            </Link>
        </div>
    );
};

export default MoviesListCard;