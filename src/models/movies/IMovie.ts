export interface IMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres: { id: number; name: string }[]; // Додано поле genres
}