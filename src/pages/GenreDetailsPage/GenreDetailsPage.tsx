import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchMoviesByGenre, selectGenreMovies, selectTotalPages, resetMovies } from '../../redux/slices/genresSlice';
import MoviesList from '../../components/MoviesList/MoviesList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const GenreDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const movies = useSelector((state: RootState) => selectGenreMovies(state));
    const totalPages = useSelector((state: RootState) => selectTotalPages(state));
    const [page, setPage] = useState(1);
    const maxPages = Math.min(totalPages, 500); // Максимальна кількість сторінок

    useEffect(() => {
        if (id) {
            dispatch(fetchMoviesByGenre({ genreId: Number(id), page }));
        }
    }, [dispatch, id, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(resetMovies());  // Скидання масиву фільмів перед завантаженням нових
    };

    useEffect(() => {
        // Виконання скидання стану і прокрутки на початок при зміні id жанру
        dispatch(resetMovies());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, dispatch]);

    if (!movies.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Movies</h2>
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

export default GenreDetailsPage;