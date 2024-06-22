import React from 'react';
import { Link } from 'react-router-dom';
import {IGenre} from "../../models/genres/IGenre";
// import


interface IProps {
    genres: IGenre[];
}

const GenresListComponent: React.FC<IProps> = ({ genres }) => {
    return (
        <div>
            <h3>Genres:</h3>
            <ul>
                {genres.map(genre => (
                    <li key={genre.id} >
                        <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenresListComponent;