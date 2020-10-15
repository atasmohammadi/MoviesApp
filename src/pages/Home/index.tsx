import * as React from 'react';
import { SafeAreaView, FlatList, View, Text, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { filterMoviesList } from './helpers';
import type { Movie, HomeScreenPropsType } from './types';
import * as actions from './actions';
import styles from './styles';

import {
  makeSelectLoading,
  makeSelectList,
  makeSelectCount,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import saga from './saga';

function Home(props: HomeScreenPropsType): React.ReactNode {
  const { loadMovies, movies, error, count } = props;
  useInjectSaga({ key: 'Home', saga });
  const [searchQuery, updateSearchQuery] = React.useState('');
  const [page, updatePage] = React.useState(1);

  // Load movies when component mounts
  // React.useEffect(() => {
  //   loadMovies();
  // }, []);

  // Re-load movies when search query changes
  React.useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) return;
    loadMovies(searchQuery.toLowerCase(), page);
  }, [searchQuery]);

  // Re-load movies when page number changes
  React.useEffect(() => {
    if (!searchQuery) return;
    loadMovies(searchQuery.toLowerCase(), page);
  }, [page]);

  const moviesArray = Object.values(movies)
  const filteredMoviesArray = filterMoviesList(moviesArray, searchQuery, page);
  const itemPerPage = 10;
  const lastPageNumber = Math.ceil(count / itemPerPage);

  function nextPage() {
    updatePage(page + 1);
  }

  // Render list item ( movie )
  function renderItem({ item }: { item: Movie }) {
    return (
      <View style={styles.item}>
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
      </View>
    );
  }

  function pagination() {
    if(!searchQuery || searchQuery.length < 3) return;
    return (
      <View style={styles.paginationContainer}>
            <View style={styles.paginationLeft}>
              {page > 1 && <Text style={styles.error}>Previous</Text>}
            </View>
            <View style={styles.paginationCurrent}>
              <Text style={styles.error}>{page}</Text>
            </View>
            <View style={styles.paginationRight}>
              {page < lastPageNumber && <Text style={styles.error}>Next</Text>}
            </View>
        </View>
    );
  }

  return (
    <>
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
        {pagination()}
      </SafeAreaView>
    </>
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
