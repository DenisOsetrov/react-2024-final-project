import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import MoviesList from '../../components/MoviesList/MoviesList';

const SearchResults: React.FC = () => {
    const { searchResults, loading, error } = useSelector((state: RootState) => state.search);

    return (
        <div>
            <h2>Search Results</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <MoviesList movies={searchResults} />
        </div>
    );
};

export default SearchResults;