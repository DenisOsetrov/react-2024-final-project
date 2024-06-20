import React from 'react';
import { Link } from 'react-router-dom';

interface Genre {
    id: number;
    name: string;
}

interface GenresListProps {
    genres: Genre[];
}

const GenresListComponent: React.FC<GenresListProps> = ({ genres }) => {
    return (
        <div>
            <h3>Genres:</h3>
            <ul>
                {genres.map(genre => (
                    <li key={genre.id}>
                        <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenresListComponent;