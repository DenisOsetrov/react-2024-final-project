import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchMovieById, selectMovieDetails } from '../../redux/slices/moviesSlice';
import PosterPreviewComponent from '../../components/PosterPreviewComponent/PosterPreviewComponent';
import GenresListComponent from '../../components/GenresListComponent/GenresListComponent';
import StarRating from '../../components/StarRating/StarRating';
import './MovieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const movie = useSelector((state: RootState) => selectMovieDetails(state));

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieById(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        // Scroll to the top of the page when movie details load
        window.scrollTo(0, 0);
    }, [movie]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"movie-card"}>
            <h2>{movie.title}</h2>
            <PosterPreviewComponent posterPath={movie.poster_path} title={movie.title} releaseDate={movie.release_date} />
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <div>Rating: <StarRating rating={Math.round(movie.vote_average / 2)} /></div>
            <div>
                <h3>Genres:</h3>
                <GenresListComponent genres={movie.genres} />
            </div>
        </div>
    );
};

export default MovieDetailsPage;