import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { fetchMovieById, selectMovieDetails } from '../../redux/slices/moviesSlice';
import StarRating from '../../components/StarRating/StarRating'; // Імпорт компоненту StarRating для відображення рейтингу
import './MovieDetailsPage.css';
import MoviePoster from "../../components/MoviePoster/MoviePoster"; // Імпорт компоненту MoviePoster для відображення постера фільму

const MovieDetailsPage: React.FC = () => {

    const { id } = useParams<{ id: string }>(); // Отримання id фільму з URL за допомогою useParams
    const navigate = useNavigate(); // Хук useNavigate для переходу між сторінками
    const dispatch: AppDispatch = useDispatch(); // Отримання функції dispatch з Redux для виклику дій
    const movie = useSelector((state: RootState) => selectMovieDetails(state)); // Витягнення деталей фільму з Redux store

    useEffect(() => {
        // Виклик функції fetchMovieById для завантаження деталей фільму при зміні id
        if (id) {
            dispatch(fetchMovieById(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        // Прокрутка сторінки вгору при завантаженні даних фільму
        window.scrollTo(0, 0);
    }, [movie]);

    if (!movie) {
        return <div>Loading...</div>; // Відображення повідомлення про завантаження, якщо фільм ще не завантажений
    }

    // Відображення деталей фільму
    return (
        <div className="movie-card">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button> {/* Кнопка "Back" для повернення на попередню сторінку */}
            <h2>{movie.title}</h2> {/* Заголовок з назвою фільму */}
            <div className="movie-details">
                <MoviePoster posterPath={movie.poster_path} title={movie.title} releaseDate={movie.release_date} /> {/* Компонент MoviePoster для відображення постера фільму */}
                <div className="info">
                    <p>{movie.overview}</p> {/* Опис фільму */}
                    <p><strong>Release Date:</strong> {movie.release_date}</p> {/* Відображення дати виходу фільму */}
                    <div><strong>Rating:</strong> <StarRating rating={Math.round(movie.vote_average)} /></div> {/* Компонент StarRating для відображення рейтингу фільму */}
                    <div className="genre-buttons">
                        {/* Відображення кнопок для переходу до сторінки жанру */}
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