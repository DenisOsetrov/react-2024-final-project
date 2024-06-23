import React, {FC} from 'react';
import { IMovie } from "../../models/movies/IMovie";
import MoviePoster from "../MoviePoster/MoviePoster";


interface IProps {
    movie: IMovie;
}

const MoviesListCard: FC<IProps> = ({ movie }) => {

    return (
        <div className="movie-card">
            <MoviePoster posterPath={movie.poster_path} title={movie.title} releaseDate={movie.release_date} size="small" />
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MoviesListCard;





