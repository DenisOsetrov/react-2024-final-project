import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store";
import { selectIsDarkTheme, toggleTheme } from "../../redux/slices/themeSlice";
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => selectIsDarkTheme(state));

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={!isDarkTheme} onChange={handleToggle} />
            <span className="slider round"></span>
        </label>
    );
};

export default ThemeSwitcher;