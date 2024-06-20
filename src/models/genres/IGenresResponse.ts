import {IGenre} from "./IGenre";

export interface IGenresResponse {
    genres: IGenre[];
    total_pages: number;
}