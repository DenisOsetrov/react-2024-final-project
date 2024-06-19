import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import userAvatar from './user.png'; // Імпортуємо зображення

const Header: React.FC = () => (
    <header>
        <nav>
            <Link to="/">Movies</Link>
            <Link to="/genres">Genres</Link>
            <input type="text" placeholder="Search" />
            <ThemeSwitcher />
            <img src={userAvatar} alt="User Avatar" style={{ width: '30px', borderRadius: '50%' }} />
        </nav>
    </header>
);

export default Header;