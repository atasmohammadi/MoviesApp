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
  error: false,
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
        const movies = action.payload.movies.Search.reduce((obj, item) => {
          obj[item.imdbID] = item;
          return obj;
        }, {});
        draft.list = Object.assign({}, state.list, movies);
        draft.success = true;
        draft.loading = false;
        draft.error = false;
        break;
      case LOAD_MOVIES_FAILED:
        draft.error = action.payload.error;
        draft.success = false;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
