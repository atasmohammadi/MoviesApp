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
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import saga from './saga';

function Home(props: HomeScreenPropsType): React.ReactNode {
  const { loadMovies, movies } = props;
  useInjectSaga({ key: 'Home', saga });
  const [searchQuery, updateSearchQuery] = React.useState('');
  const [page, updatePage] = React.useState(1);

  // Load movies when component mounts
  // React.useEffect(() => {
  //   loadMovies();
  // }, []);

  // Re-load movies when search query changes
  React.useEffect(() => {
    if (!searchQuery) return;
    loadMovies(searchQuery.toLowerCase(), page);
  }, [searchQuery]);

  // Re-load movies when page number changes
  React.useEffect(() => {
    if (!searchQuery) return;
    loadMovies(searchQuery.toLowerCase(), page);
  }, [page]);

  function nextPage() {
    updatePage(page + 1)
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
        </View>
      </View>
    );
  }
  const filteredMoviesArray = filterMoviesList(Object.values(movies), searchQuery);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search by title..."
          onChangeText={updateSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filteredMoviesArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.imdbID}
          extraData={filteredMoviesArray}
        />
      </SafeAreaView>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  movies: makeSelectList(),
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
