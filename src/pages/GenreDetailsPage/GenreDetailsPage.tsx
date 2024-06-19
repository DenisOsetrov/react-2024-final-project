import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {AppDispatch, RootState} from "../../redux/store/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchMoviesByGenre, selectGenreMovies} from "../../redux/slices/genresSlice";
import MoviesList from "../../components/MoviesList/MoviesList";

const GenreDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const movies = useSelector((state: RootState) => selectGenreMovies(state));

    useEffect(() => {
        if (id) {
            dispatch(fetchMoviesByGenre({ genreId: Number(id), page: 1 }));
        }
    }, [dispatch, id]);

    if (!movies.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Movies</h2>
            <MoviesList movies={movies} />
        </div>
    );
};

export default GenreDetailsPage;