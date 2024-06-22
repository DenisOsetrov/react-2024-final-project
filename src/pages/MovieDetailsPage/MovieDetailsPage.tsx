import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchMovieById, selectMovieDetails } from '../../redux/slices/moviesSlice';
import PosterPreviewComponent from '../../components/PosterPreviewComponent/PosterPreviewComponent';
import StarRating from '../../components/StarRating/StarRating';
import './MovieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const movie = useSelector((state: RootState) => selectMovieDetails(state));

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieById(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movie]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-card">
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{movie.title}</h2>
            <div className="movie-details">
                <PosterPreviewComponent posterPath={movie.poster_path} title={movie.title} releaseDate={movie.release_date} />
                <div className="info">
                    <p>{movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> <StarRating rating={Math.round(movie.vote_average)} /></p>
                    <div className="genre-buttons">
                        {movie.genres.map(genre => (
                            <button
                                key={genre.id}
                                className="genre-button"
                                onClick={() => navigate(`/genre/${genre.id}`)}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;