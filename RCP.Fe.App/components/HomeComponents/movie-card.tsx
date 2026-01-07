import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';


type Movie = {
  id: string;
  title: string;
  duration: string;
  poster: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {

  const router = useRouter();


  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8} 
      onPress={() => router.push({
        pathname: '/movie-booking',
        params: { movie: JSON.stringify(movie) },
      })}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>

      <Text style={styles.duration}>{movie.duration}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  duration: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
});
