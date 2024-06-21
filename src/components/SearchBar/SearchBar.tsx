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

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Find</button>
        </div>
    );
};

export default SearchBar;