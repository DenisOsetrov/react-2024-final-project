import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchMoviesByGenre, selectGenreMovies, selectTotalPages, resetMovies } from '../../redux/slices/genresSlice';
import MoviesList from '../../components/MoviesList/MoviesList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../../styles/pagination.css';
import '../../styles/moviesGenresPageName.css';

// Компонент для відображення списку фільмів за жанром
const MoviesByGenrePage: React.FC = () => {

    // Використання useParams для отримання id жанру з URL
    const { id } = useParams<{ id: string }>();

    // Використання useDispatch для отримання dispatch функції з Redux
    const dispatch: AppDispatch = useDispatch();

    // Використання useSelector для отримання масиву фільмів і загальної кількості сторінок з Redux store
    const movies = useSelector((state: RootState) => selectGenreMovies(state));
    const totalPages = useSelector((state: RootState) => selectTotalPages(state));

    // Використання useState для збереження поточної сторінки
    const [page, setPage] = useState(1);

    // Максимальна кількість сторінок обмежена до 500 (обмеження API)
    const maxPages = Math.min(totalPages, 500);

    // Використання useEffect для завантаження фільмів за жанром при зміні id жанру або сторінки
    useEffect(() => {
        if (id) {
            dispatch(fetchMoviesByGenre({ genreId: Number(id), page }));
        }
    }, [dispatch, id, page]);

    // Функція для обробки зміни сторінки
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(resetMovies());  // Скидання масиву фільмів перед завантаженням нових
    };

    // Використання useEffect для скидання стану і прокрутки на початок при зміні id жанру
    useEffect(() => {
        dispatch(resetMovies());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, dispatch]);

    // Відображення повідомлення про завантаження, якщо фільми ще не завантажені
    if (!movies.length) {
        return <div>Loading...</div>;
    }

    // Відображення компоненту
    return (
        <div>
            <h2 className="page-header">Films by genre</h2>
            <MoviesList movies={movies} />
            <Stack spacing={2} className="pagination">
                <Pagination
                    count={maxPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default MoviesByGenrePage;