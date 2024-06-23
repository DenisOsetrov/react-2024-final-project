import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import MoviesList from '../../components/MoviesList/MoviesList';


// Компонент для відображення результатів пошуку фільмів
const SearchResults: React.FC = () => {

    // Використовуємо useSelector для отримання стану пошуку з Redux store
    const { searchResults, loading, error } = useSelector((state: RootState) => state.search);

    return (
        <div>
            <h2>Search Results</h2>

            {/* Відображення повідомлення про завантаження, якщо searchResults все ще завантажуються */}
            {loading && <p>Loading...</p>}

            {/* Відображення повідомлення про помилку, якщо сталася помилка під час завантаження searchResults */}
            {error && <p>Error: {error}</p>}

            {/* Відображення списку фільмів з використанням компоненту MoviesList */}
            <MoviesList movies={searchResults} />
        </div>
    );
};

export default SearchResults;