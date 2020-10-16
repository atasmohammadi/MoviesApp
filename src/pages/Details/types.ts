import type { Movie } from '../Home/types';

export interface DetailsScreenPropsType {
  route: {
      params: {
          movie: Movie
      }
  }
}
