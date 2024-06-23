import React from 'react';
import {IGenre} from "../../models/genres/IGenre";
import {Link} from "react-router-dom";
import './GenreList.css';

interface IProps {
    genres: IGenre[];
}

const GenreList: React.FC<IProps> = ({genres}) => {
    return (
        <div className="genre-list">
            {genres.map((genre) => (
                <Link to={`/genre/${genre.id}`} key={genre.id} className="genre-card">
                    <span>{genre.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default GenreList;