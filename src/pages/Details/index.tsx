import * as React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import styles from './styles';
import type { DetailsScreenPropsType } from './types';

export default function Details(props: DetailsScreenPropsType): React.ReactNode {
  const { route } = props;
  const { movie } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          {movie.Poster && <Image
            style={styles.itemImage}
            source={{
              uri: movie.Poster,
            }}
          />}
        </View>
        <View style={styles.descriptionContainer}>
          {movie.Title && (
            <View style={styles.row}>
              <Text style={styles.title}>Title: </Text>
              <Text style={styles.desc}>{movie.Title}</Text>
            </View>
          )}
          {movie.Year && (
            <View style={styles.row}>
              <Text style={styles.title}>Year: </Text>
              <Text style={styles.desc}>{movie.Year}</Text>
            </View>
          )}
          {movie.Type && (
            <View style={styles.row}>
              <Text style={styles.title}>Type: </Text>
              <Text style={styles.desc}>{movie.Type}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
