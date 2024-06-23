import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import userAvatar from './userAvatar.png';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false); // Стан для відображення/приховування пошукової панелі
    const navigate = useNavigate(); // Хук для навігації
    const location = useLocation(); // Хук для отримання поточного шляху

    useEffect(() => {
        setShowSearch(false); // Сховати пошукову панель при зміні шляху
    }, [location]);

    // Функція для відкриття сторінки з жанрами
    const handleGenresClick = () => {
        navigate('/genres');
    };

    // Функція для зміни стану відображення пошукової панелі
    const toggleSearchBar = () => {
        setShowSearch(prevState => !prevState);
    };

    return (
        <header>
            <nav>
                <Link to="/">Movies</Link> {/* Посилання на головну сторінку */}
                <div className="dropdown">
                    {/* Елемент з випадаючим меню жанрів */}
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
                        {/* Посилання на різні жанри */}
                        <Link to="/genre/28">Action</Link>
                        <Link to="/genre/12">Adventure</Link>
                        <Link to="/genre/16">Animation</Link>
                        <Link to="/genre/35">Comedy</Link>
                        <Link to="/genre/80">Crime</Link>
                        <Link to="/genre/99">Documentary</Link>
                        <Link to="/genre/18">Drama</Link>
                        <Link to="/genre/10751">Family</Link>
                        <Link to="/genre/14">Fantasy</Link>
                        <Link to="/genre/36">History</Link>
                        <Link to="/genre/27">Horror</Link>
                        <Link to="/genre/10402">Music</Link>
                        <Link to="/genre/9648">Mystery</Link>
                        <Link to="/genre/10749">Romance</Link>
                        <Link to="/genre/878">Science Fiction</Link>
                        <Link to="/genre/10770">TV Movie</Link>
                        <Link to="/genre/53">Thriller</Link>
                        <Link to="/genre/10752">War</Link>
                        <Link to="/genre/37">Western</Link>
                    </div>
                </div>
                <span onClick={toggleSearchBar}>
                    Search <i className="fas fa-search"></i>
                </span>
                <ThemeSwitcher /> {/* Компонент перемикача тем */}
                <img src={userAvatar} alt="User Avatar" /> {/* Зображення аватара користувача */}
            </nav>
            {showSearch && <SearchBar />} {/* Відображення пошукової панелі при showSearch === true */}
        </header>
    );
};

export default Header;