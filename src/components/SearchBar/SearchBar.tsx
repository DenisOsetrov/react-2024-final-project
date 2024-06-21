import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { fetchMoviesByQuery } from '../../redux/slices/moviesSlice';
import './SearchBar.css';

interface SearchBarProps {
    onSearchComplete: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchComplete }) => {
    const [query, setQuery] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const handleSearch = async () => {
        if (query.trim()) {
            await dispatch(fetchMoviesByQuery(query));
            onSearchComplete();
        }
    };

    // функція зчитування даних з інпуту при написканні Enter
    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown} // Додайте обробник події onKeyDown
            />
            <button onClick={handleSearch}>Find</button>
        </div>
    );
};

export default SearchBar;