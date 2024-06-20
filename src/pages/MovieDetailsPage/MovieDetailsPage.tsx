import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchMovieById, selectMovieDetails } from "../../redux/slices/moviesSlice";
import PosterPreviewComponent from "../../components/PosterPreviewComponent/PosterPreviewComponent";
import StarRating from "../../components/StarRating/StarRating";
import GenresListComponent from "../../components/GenresListComponent/GenresListComponent";


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
            <PosterPreviewComponent posterPath={movie.poster_path} title={movie.title} />
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <div>Rating: <StarRating rating={Math.round(movie.vote_average / 2)} /></div>
            <GenresListComponent genres={movie.genres} />
        </div>
    );
};

export default MovieDetailsPage;