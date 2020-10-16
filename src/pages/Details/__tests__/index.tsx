import React from 'react';
import renderer from 'react-test-renderer';
import Details from '../index';

const mockedProps = {
  route: {
    params: {
      movie: {
        imdbID: 'id2',
        Title: 'movie2',
        Poster: 'url',
        Year: '2001',
        Type: 'movie',
        page: 1,
      }
    }
  }
};

describe('Details Screen', () => {
  let component: React.ReactNode;
 
  beforeEach(() => {
    component = renderer.create(
      <Details {...mockedProps} />
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});