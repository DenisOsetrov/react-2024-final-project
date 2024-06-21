import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store/store';
import { fetchMoviesByQuery } from '../../redux/slices/searchSlice';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim()) {
            await dispatch(fetchMoviesByQuery(query));
            navigate('/search'); // Перенаправлення на сторінку результатів пошуку
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Find</button>
        </div>
    );
};

export default SearchBar;