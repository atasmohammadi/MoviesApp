/*
 *
 * Home reducer
 *
 */

import produce from 'immer';
import {
  LOAD_MOVIES,
  LOAD_MOVIES_SUCCESS,
  LOAD_MOVIES_FAILED,
} from './constants';

export const initialState = {
  list: {},
  count: 0,
  error: false,
  query: '',
  success: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MOVIES:
        draft.loading = true;
        break;
      case LOAD_MOVIES_SUCCESS:
        // to cache the results and also have the offline capability, instead
        // of replacing the list with results from API, we would append new
        // data into existing one. To avoid having duplicate entries array
        // is converted to object.
        const movies = action.payload.movies.reduce((obj, item) => {
          obj[item.imdbID] = item;
          return obj;
        }, {});
        // only append the new results to the old ones, if the search queries
        // are the same. otherwise remove the old data
        const shouldAppend = state.query === action.payload.query;
        draft.list = shouldAppend ? Object.assign({}, state.list, movies) : movies;
        draft.count = action.payload.count;
        draft.success = true;
        draft.loading = false;
        draft.error = false;
        break;
      case LOAD_MOVIES_FAILED:
        draft.error = action.payload;
        draft.success = false;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
