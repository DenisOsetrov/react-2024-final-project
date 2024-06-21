import { createBrowserRouter } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MainLayout from "../layouts/MainLayout";
import GenresPage from "../pages/GenresPage";
import GenreDetailsPage from "../pages/GenreDetailsPage/GenreDetailsPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import SearchResults from "../components/SearchResults/SearchResults";

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
                path: '/page/:pageNumber',
                element: <MoviesPage />,
            },
            {
                path: '/genres',
                element: <GenresPage />,
            },
            {
                path: '/genre/:id',
                element: <GenreDetailsPage />,
            },
            {
                path: '/movie/:id',
                element: <MovieDetailsPage />,
            },
            {
                path: '/search',
                element: <SearchResults />,
            },
        ],
    },
]);

export default router;