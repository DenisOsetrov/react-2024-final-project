import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../store/store";


interface ThemeState {
    isDarkTheme: boolean;
}

const initialState: ThemeState = {
    isDarkTheme: localStorage.getItem('theme') === 'theme-dark',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
            const theme = state.isDarkTheme ? 'theme-dark' : 'theme-light';
            localStorage.setItem('theme', theme);
            document.documentElement.className = theme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export const selectIsDarkTheme = (state: RootState) => state.theme.isDarkTheme;

const themeReducer = themeSlice.reducer;
export default themeReducer;