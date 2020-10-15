import type {Movie} from './types';

export function filterMoviesList(list: Movie[], query: string, page: number) {
  if (!list.length) return [];
  return list.filter((item) => {
    if(!item.Title) return false;
    if(!query) return item.page === page;
    return item.Title.toLowerCase().includes(query.toLowerCase()) && item.page === page;
  });
}
