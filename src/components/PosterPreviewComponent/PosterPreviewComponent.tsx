import React from 'react';
import {Badge} from "./BadgeStyles";


interface PosterPreviewProps {
    posterPath: string;
    title: string;
    releaseDate: string;
}

const PosterPreviewComponent: React.FC<PosterPreviewProps> = ({ posterPath, title, releaseDate }) => {
    // Видобування року з дати випуску
    const releaseYear = new Date(releaseDate).getFullYear();

    return (
        <Badge badgeContent={releaseYear} max={9999}>
            <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
        </Badge>
    );
};

export default PosterPreviewComponent;