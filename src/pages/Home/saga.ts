import {call, put, takeLatest} from 'redux-saga/effects';
import {baseUrl} from '../../constants';
import request from '../../utils/request';

import {LOAD_MOVIES} from './constants';

import {loadMoviesFailed, loadMoviesSuccess} from './actions';

function* loadMovies({payload: {query, page}}: { payload: { query: string, page: number }}) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const requestURL = `${baseUrl}&s=${query}&page=${page}`;
  try {
    const {data} = yield call(request, requestURL, options);
    console.log('Yoo', data)
    // if (!Boolean(data.Response)) throw error(data.Error)
    yield put(loadMoviesSuccess(data));
  } catch (error) {
    console.log('Catching erorr', error)
    yield put(loadMoviesFailed(error));
  }
}

export default function* HomeSaga() {
  yield takeLatest(LOAD_MOVIES, loadMovies);
}
