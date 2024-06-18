import {createBrowserRouter} from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <MoviesPage />,
            },
            // Add more routes here as needed
            // {
            //   path: '/genres',
            //   element: <GenresPage />,
            // },
        ],
    },
]);

export default router;
