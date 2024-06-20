import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchMovieById, selectMovieDetails } from "../../redux/slices/moviesSlice";
import { fetchGenres, selectGenres } from "../../redux/slices/genresSlice";
import StarRating from '../../components/StarRating/StarRating';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const movie = useSelector((state: RootState) => selectMovieDetails(state));
    const genres = useSelector(selectGenres);

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieById(Number(id)));
        }
        dispatch(fetchGenres());
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Movie:", movie);
        console.log("Genres:", genres);
    }, [movie, genres]);

    if (!movie || genres.length === 0) {
        return <div>Loading...</div>;
    }

    const movieGenres = movie.genres || [];

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <div>Rating: <StarRating rating={Math.round(movie.vote_average / 2)} /></div>

            <div>
                <h3>Genres:</h3>
                {movieGenres.length > 0 ? (
                    <ul>
                        {movieGenres.map(genre => (
                            <li key={genre.id}>
                                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No genres available</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsPage;