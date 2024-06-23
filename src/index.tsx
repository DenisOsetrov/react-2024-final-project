import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import store from "./redux/store/store";
import router from "./router/router";
import './index.css';

// Ініціалізація теми
const currentTheme = localStorage.getItem('theme') || 'theme-light';
document.documentElement.className = currentTheme;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);