import React, { useState } from 'react';

const ThemeSwitcher: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
        document.body.className = darkTheme ? 'dark-theme' : 'light-theme';
    };

    return <button onClick={toggleTheme}>{darkTheme ? 'Light Mode' : 'Dark Mode'}</button>;
};

export default ThemeSwitcher;