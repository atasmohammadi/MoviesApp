/*
 *
 * Home actions
 *
 */

import {
  LOAD_MOVIES,
  LOAD_MOVIES_SUCCESS,
  LOAD_MOVIES_FAILED,
} from './constants';

import type { Movie } from './types';

export const loadMovies = (query: string, page: number) => ({
  type: LOAD_MOVIES,
  payload: {query, page},
});

export const loadMoviesSuccess = (movies: Movie[], count: number, query: string) => ({
  type: LOAD_MOVIES_SUCCESS,
  payload: {movies, count, query},
});

export const loadMoviesFailed = (error: string) => ({
  type: LOAD_MOVIES_FAILED,
  payload: error,
});
