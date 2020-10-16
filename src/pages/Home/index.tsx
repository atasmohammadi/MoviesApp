import * as React from 'react';
import { SafeAreaView, FlatList, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { filterMoviesList } from './helpers';
import type { Movie, HomeScreenPropsType } from './types';
import * as actions from './actions';
import styles from './styles';
import { itemPerPage } from '../../constants';

import {
  makeSelectLoading,
  makeSelectList,
  makeSelectCount,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import saga from './saga';

function Home(props: HomeScreenPropsType): React.ReactNode {
  const { loadMovies, movies, error, count, navigation } = props;
  useInjectSaga({ key: 'Home', saga });
  const [searchQuery, updateSearchQuery] = React.useState('');
  const [page, updatePage] = React.useState(1);

  const moviesArray = Object.values(movies)
  const filteredMoviesArray = filterMoviesList(moviesArray, searchQuery, page);
  const lastPageNumber = Math.ceil(count / itemPerPage);
  const fetchedPages = moviesArray.reduce((arr, itm) => {
    if (!arr.includes(itm.page)) arr.push(itm.page);
    return arr;
  }, []);

  const shouldShowPreviousButton = page > 1;
  // If search query is set, we can fetch more pages since we know the query
  // but if query is not set (e.g. persisted data) only show next page button
  // if we have the next page in cache
  const shouldShowNextButton = searchQuery ? page < lastPageNumber : fetchedPages.includes(page + 1);

  // following code is commented out, because there is
  // no query to fetch movies. API doesn't support listing
  // all movies. we can only search

  // Load movies when component mounts
  // React.useEffect(() => {
  //   loadMovies();
  // }, []);

  // Re-load movies when search query changes
  React.useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) return;
    updatePage(1);
    loadMovies(searchQuery.toLowerCase(), 1);
  }, [searchQuery]);

  // Re-load movies when page number changes
  React.useEffect(() => {
    // if we have the page already in cache, don't re-fetch
    if (!searchQuery || fetchedPages.includes(page)) return;
    loadMovies(searchQuery.toLowerCase(), page);
  }, [page]);

  function previousPage() {
    if (page > 1) updatePage(page - 1);
  }

  function nextPage() {
    if (page < lastPageNumber) updatePage(page + 1);
  }

  // Render list item ( movie )
  function renderItem({ item }: { item: Movie }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', {
        movie: item,
      })}>
        <View style={styles.imageContainer}>
          {item.Poster && <Image
            style={styles.itemImage}
            source={{
              uri: item.Poster,
            }}
          />}
        </View>
        <View style={styles.descriptionContainer}>
          {item.Title && (
            <View style={styles.row}>
              <Text style={styles.title}>Title: </Text>
              <Text style={styles.desc}>{item.Title}</Text>
            </View>
          )}
          {item.Year && (
            <View style={styles.row}>
              <Text style={styles.title}>Year: </Text>
              <Text style={styles.desc}>{item.Year}</Text>
            </View>
          )}
          {item.Type && (
            <View style={styles.row}>
              <Text style={styles.title}>Type: </Text>
              <Text style={styles.desc}>{item.Type}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function pagination() {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationLeft}>
          {shouldShowPreviousButton && <Button
            title="Previous"
            onPress={previousPage}
          />}
        </View>
        <View style={styles.paginationCurrent}>
          <Text style={styles.currentPage}>{page}</Text>
        </View>
        <View style={styles.paginationRight}>
          {shouldShowNextButton && <Button
            title="Next"
            onPress={nextPage}
          />}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search by title..."
        onChangeText={updateSearchQuery}
        value={searchQuery}
      />
      {/* {error && <Text style={styles.error}>Error: {error}</Text>} */}
      <FlatList
        data={filteredMoviesArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.imdbID}
        extraData={filteredMoviesArray}
      />
      {!!filteredMoviesArray.length && pagination()}
    </SafeAreaView>
  );
}

const mapStateToProps = createStructuredSelector({
  movies: makeSelectList(),
  count: makeSelectCount(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadMovies: (query: string, page: number) => dispatch(actions.loadMovies(query, page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(Home);
