export interface Movie {
    imdbID: string,
    Title: string,
    Poster?: string,
    Year: string,
    Type: string,
    page: number,
}

export interface HomeScreenPropsType {
    navigation: {
        navigate: () => void,
    },
    loadMovies: (query?: string, page?: number) => void,
    movies: Movie[],
    count: number,
    error: boolean,
    success: boolean,
    loading: boolean,
};