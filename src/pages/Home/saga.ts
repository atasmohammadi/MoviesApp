import {call, put, takeLatest} from 'redux-saga/effects';
import {baseUrl} from '../../constants';
import request from '../../utils/request';

import {LOAD_MOVIES} from './constants';

import {loadMoviesFailed, loadMoviesSuccess} from './actions';

function* loadMovies({
  payload: {query, page},
}: {
  payload: {query: string; page: number};
}) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const requestURL = `${baseUrl}&s=${query}&page=${page}`;
  try {
    const {
      data: {Response, Error, totalResults, Search},
    } = yield call(request, requestURL, options);
    if (Error) throw Error;
    const results =
      Array.isArray(Search) && Search.length
        ? Search.map((i) => {
            i.page = page;
            return i;
          })
        : [];
    yield put(loadMoviesSuccess(results, totalResults, query));
  } catch (error) {
    yield put(loadMoviesFailed(error));
  }
}

export default function* HomeSaga() {
  yield takeLatest(LOAD_MOVIES, loadMovies);
}
