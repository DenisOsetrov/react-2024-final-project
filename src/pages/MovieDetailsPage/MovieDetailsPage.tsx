import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, selectMovieDetails } from "../../redux/slices/moviesSlice";
import StarRating from '../../components/StarRating/StarRating';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const movie = useSelector((state: RootState) => selectMovieDetails(state));

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieById(Number(id)));
        }
    }, [dispatch, id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <div>Rating: <StarRating rating={Math.round(movie.vote_average / 2)} /></div> {/* Рейтинг з 10 до 5 */}
        </div>
    );
};

export default MovieDetailsPage;