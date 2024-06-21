import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import userAvatar from './userAvatar.png';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const toggleSearchBar = () => {
        setShowSearch((prevState) => !prevState);
    };

    const handleGenresClick = () => {
        navigate('/genres');
    };

    return (
        <header>
            <nav>
                <Link to="/">Movies</Link>
                <div className="dropdown">
                    <span
                        className="dropdown-toggle"
                        onClick={handleGenresClick}
                        onMouseEnter={(e) => e.currentTarget.parentElement?.querySelector('.dropdown-menu')?.classList.add('show')}
                        onMouseLeave={(e) => e.currentTarget.parentElement?.querySelector('.dropdown-menu')?.classList.remove('show')}
                    >
                        Genres
                    </span>
                    <div
                        className="dropdown-menu"
                        onMouseEnter={(e) => e.currentTarget.classList.add('show')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('show')}
                    >
                        {/* Посилання на жанри */}
                    </div>
                </div>
                <span onClick={toggleSearchBar} style={{ cursor: 'pointer' }}>
                    Search <i className="fas fa-search"></i>
                </span>
                <ThemeSwitcher />
                <img src={userAvatar} alt="User Avatar" style={{ width: '30px', borderRadius: '50%' }} />
            </nav>
            {showSearch && <SearchBar />}
        </header>
    );
};

export default Header;