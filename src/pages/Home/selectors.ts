import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Home state domain
 */

const selectHomeDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

 const makeSelectLoading = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.loading,
  );

const makeSelectList = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.list,
  );

const makeSelectError = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.error,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.success,
  );

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(
    selectHomeDomain,
    subState => subState,
  );

export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectLoading,
  makeSelectList,
  makeSelectError,
  makeSelectSuccess,
};
