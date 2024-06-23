import React from 'react';
import { Badge } from './BadgeStyles';

interface MoviePosterProps {
    posterPath: string;
    title: string;
    releaseDate: string;
    size?: 'small' | 'large'; // Опціональний розмір компонента (для Badge)
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, title, releaseDate, size = 'large' }) => {

    // Визначення року випуску фільму за допомогою об'єкта Date
    let releaseYear: number | string = new Date(releaseDate).getFullYear();

    // Check if releaseYear is NaN and set it to 'N/A' if true
    if (isNaN(releaseYear)) {
        releaseYear = 'N/A';
    }

    // Визначення шляху до постера залежно від розміру компонента
    const posterUrl = size === 'small' ? `https://image.tmdb.org/t/p/w200${posterPath}` : `https://image.tmdb.org/t/p/w400${posterPath}`;

    return (
        // Використання Badge для відображення року випуску фільму над постером
        <Badge badgeContent={releaseYear} max={9999} className={size}>
            {/* Зображення постера фільму з використанням визначеного шляху */}
            <img src={posterUrl} alt={title} />
        </Badge>
    );
};

export default MoviePoster;