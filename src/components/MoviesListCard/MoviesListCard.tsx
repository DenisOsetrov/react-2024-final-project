import React, {FC} from 'react';
import {IMovie} from "../../models/movies/IMovie";
import {Link} from "react-router-dom";

interface IProps {
    movie: IMovie;
}

const MoviesListCard: FC<IProps> = ({ movie }) => {
    return (
        <div>
            <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
            </Link>
        </div>
    );
};

export default MoviesListCard;