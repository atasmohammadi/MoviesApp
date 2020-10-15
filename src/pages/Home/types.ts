export interface Movie {
    imdbID: string,
    Title: string,
    Poster?: string,
    Year: string,
}

export interface HomeScreenPropsType {
    loadMovies: (query?: string) => void,
    movies: Movie[],
    error: boolean,
    success: boolean,
    loading: boolean,
};