import {createBrowserRouter} from "react-router-dom";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MainLayout from "../layouts/MainLayout";
import GenresPage from "../pages/GenresPage";
import GenreDetailsPage from "../pages/GenreDetailsPage/GenreDetailsPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <MoviesPage />,
            },
            {
              path: '/genres',
              element: <GenresPage />,
            },
            {
                path: '/genre/:id',
                // eslint-disable-next-line react/jsx-no-undef
                element: <GenreDetailsPage />,
            },
            {
                path: '/movie/:id',
                element: <MovieDetailsPage />,
            },
        ],
    },
]);

export default router;
