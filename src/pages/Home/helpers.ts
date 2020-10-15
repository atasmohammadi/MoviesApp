import type {Movie} from './types';

export function filterMoviesList(list: Movie[], query: string, page: number) {
  if (!query) return list;
  if (!list.length) return [];
  return list.filter((item) => {
    if(!item.Title) return false;
    return item.Title.toLowerCase().includes(query.toLowerCase()) && item.page === page;
  });
}
