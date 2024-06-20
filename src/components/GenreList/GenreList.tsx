import React from 'react';
import {IGenre} from "../../models/genres/IGenre";
import {Link} from "react-router-dom";

interface IProps {
    genres: IGenre[];
}

const GenreList: React.FC<IProps> = ({ genres }) => {
    return (
        <div>
            {genres.map((genre) => (
                <div key={genre.id}>
                    <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default GenreList;