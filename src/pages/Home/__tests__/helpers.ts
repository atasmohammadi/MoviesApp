import {filterMoviesList} from '../helpers';

const movies = [
  {
    imdbID: 'id2',
    Title: 'movie2',
    Poster: 'url',
    Year: '2001',
    Type: 'movie',
    page: 1,
  },
  {
    imdbID: 'id3',
    Title: 'movie3',
    Poster: 'url',
    Year: '2001',
    Type: 'movie',
    page: 2,
  },
];

describe('filter movies', () => {
  it('should return empty array', () => {
    expect(filterMoviesList([], '', 1)).toEqual([]);
  });

  it('should return array with 1 results', () => {
    expect(filterMoviesList(movies, 'movie2', 1).length).toEqual(1);
  });

  it('should return empty array', () => {
    expect(filterMoviesList(movies, 'movie2', 2).length).toEqual(0);
  });
});
