import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import userAvatar from './userAvatar.png';
import SearchBar from '../SearchBar/SearchBar';

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearchBar = () => {
        setShowSearch(prevState => !prevState);
    };

    return (
        <header>
            <nav>
                <Link to="/">Movies</Link>
                <Link to="/genres">Genres</Link>
                <span onClick={toggleSearchBar} style={{ cursor: 'pointer' }}>
                    Search <i className="fas fa-search"></i>
                </span>
                <ThemeSwitcher />
                <img src={userAvatar} alt="User Avatar" style={{ width: '30px', borderRadius: '50%' }} />
            </nav>
            {showSearch && <SearchBar onSearchComplete={() => setShowSearch(false)} />}
        </header>
    );
};

export default Header;