import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store";
import { selectIsDarkTheme, toggleTheme } from "../../redux/slices/themeSlice";
import './ThemeSwitcher.css';


// Функціональний компонент для перемикання теми
const ThemeSwitcher: React.FC = () => {

    // Використовуємо хук useDispatch для виклику екшенів
    const dispatch = useDispatch();

    // Отримуємо поточний стан теми (темна або світла) з Redux store
    const isDarkTheme = useSelector((state: RootState) => selectIsDarkTheme(state));

    // Обробник події для перемикання теми
    const handleToggle = () => {
        // Викликаємо екшен toggleTheme для зміни теми
        dispatch(toggleTheme());
    };

    return (
        // Компонент для перемикання теми у вигляді перемикача
        <label className="switch">
            {/* Інпут для перемикання теми */}
            <input type="checkbox" checked={!isDarkTheme} onChange={handleToggle} />
            {/* Слайдер перемикача */}
            <span className="slider round"></span>
        </label>
    );
};

export default ThemeSwitcher;