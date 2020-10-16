import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Home from '../index';

const mockStore = configureStore([]);

const mockedProps = {
  loadMovies: jest.fn(),
  movies: [
    {
      imdbID: 'id1',
      Title: 'movie1',
      Poster: 'url',
      Year: '1991',
      Type: 'movie',
      page: 1,
    },
    {
      imdbID: 'id2',
      Title: 'movie2',
      Poster: 'url',
      Year: '2001',
      Type: 'movie',
      page: 1,
    },
  ],
  count: 2,
  error: false,
  loading: false,
  success: true,
};

jest.mock('../../../utils/injectSaga', () => ({  
  useInjectSaga: jest.fn(),
}));

describe('Home Screen', () => {
  let store;
  let component: React.ReactNode;
 
  beforeEach(() => {
    store = mockStore(mockedProps);
    component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});