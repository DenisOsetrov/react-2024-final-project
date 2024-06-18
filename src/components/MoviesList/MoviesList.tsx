import React from 'react';
import { useSelector } from 'react-redux';
import {RootState} from "../../redux/store/store";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import {IMovie} from "../../models/IMovie";


interface Props {
    movies: IMovie[];
}

const MoviesList: React.FC<Props> = ({ movies }) => {
    // Перевірка на пустий список фільмів
    if (!movies || movies.length === 0) {
        return <div>No movies found.</div>;
    }

    return (
        <div>
            {movies.map((movie: IMovie) => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;