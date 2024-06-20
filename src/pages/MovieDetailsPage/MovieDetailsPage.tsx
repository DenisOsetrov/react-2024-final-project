import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
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
            <div>Rating: <StarRating rating={Math.round(movie.vote_average / 2)} /></div>

            <div>
                <h3>Genres:</h3>
                <ul>
                    {movie.genres.map(genre => (
                        <li key={genre.id}>
                            <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
