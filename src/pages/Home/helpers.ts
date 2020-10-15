export function filterMoviesList(list, query) {
  if (!query) return list;
  const queryLowerCase = query.toLowerCase();
  return list.filter((item) => {
    const types = (item.types || []).map((i) => i.toLowerCase());
    const name = item.name.toLowerCase();
    return name.includes(queryLowerCase) || types.includes(queryLowerCase);
  });
}
