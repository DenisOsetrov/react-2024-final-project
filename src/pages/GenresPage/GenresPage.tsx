import React, { useEffect } from 'react';
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, selectGenres } from "../../redux/slices/genresSlice";
import GenreList from "../../components/GenreList/GenreList";
import '../../styles/moviesGenresPageName.css';

const GenresPage = () => {

    // Використовуємо хуки useDispatch та useSelector для взаємодії з Redux store
    const dispatch: AppDispatch = useDispatch(); // Диспетчер Redux для виклику actions
    const genres = useSelector((state: RootState) => selectGenres(state)); // Вибираємо стан жанрів з Redux store

    // useEffect хук для виконання дій при монтажі компонента
    useEffect(() => {
        dispatch(fetchGenres()); // Викликаємо fetchGenres для отримання жанрів
    }, [dispatch]); // Залежність - dispatch, щоб викликати fetchGenres тільки під час монтажу компонента

    return (
        <div>
            {/* Заголовок сторінки */}
            <h2 className="page-header">Сторінка жанрів</h2>

            {/* Рендеримо компонент GenreList та передаємо genres як пропс */}
            <GenreList genres={genres} />
        </div>
    );
};

export default GenresPage;

