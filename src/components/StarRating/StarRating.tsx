import React from 'react';
import './StarRating.css';


// Визначення інтерфейсу для пропсів
interface StarRatingProps {
    rating: number; // Оцінка фільму від 1 до 10
}

// Функціональний компонент для відображення рейтингу у вигляді зірок
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    // Масив для зберігання зірок
    const stars = [];

    // Цикл для створення 10 зірок
    for (let i = 1; i <= 10; i++) {

        // Визначення класу для кожної зірки на основі рейтингу
        const starClass = i <= rating ? 'star-rating__star is-selected' : 'star-rating__star';

        // Додавання зірки до масиву
        stars.push(
            <label key={i} className={starClass}>
                ★
            </label>
        );
    }

    // Повернення JSX, що містить зірки
    return <div className="star-rating">{stars}</div>;
};

export default StarRating;