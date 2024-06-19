import React from 'react';
import './StarRating.css';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 10; i++) {
        const starClass = i <= rating ? 'star-rating__star is-selected' : 'star-rating__star';
        stars.push(
            <label key={i} className={starClass}>
                ★
            </label>
        );
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;