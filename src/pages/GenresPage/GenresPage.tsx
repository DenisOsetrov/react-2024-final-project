import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../redux/store/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchGenres, selectGenres} from "../../redux/slices/genresSlice";
import GenreList from "../../components/GenreList/GenreList";
import '../../styles/moviesGenresPageName.css';

const GenresPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const genres = useSelector((state: RootState) => selectGenres(state));

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    return (
        <div>
            <h2 className="page-header">Genres Page</h2>
            <GenreList genres={genres} />
        </div>
    );
};

export default GenresPage;

