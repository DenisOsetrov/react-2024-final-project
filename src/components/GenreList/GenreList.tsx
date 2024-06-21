import React from 'react';
import { IGenre } from "../../models/genres/IGenre";
import { Link } from "react-router-dom";
import './GenreList.css';

interface IProps {
    genres: IGenre[];
}

const GenreList: React.FC<IProps> = ({ genres }) => {
    return (
        <div className="genre-list">
            {genres.map((genre) => (
                <div key={genre.id} className="genre-card">
                    <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                </div>
            ))}
        </div>
    );
};


export default GenreList;