import React from 'react';

interface PosterPreviewProps {
    posterPath: string;
    title: string;
}

const PosterPreviewComponent: React.FC<PosterPreviewProps> = ({ posterPath, title }) => {
    return (
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
    );
};

export default PosterPreviewComponent;