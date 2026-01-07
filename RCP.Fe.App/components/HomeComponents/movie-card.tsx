import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

<<<<<<< HEAD
interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    duration: string;
    poster: string;
    genre?: string;
    director?: string;
    cast?: string;
    language?: string;
    releaseDate?: string;
    description?: string;
  };
}
=======
type Movie = {
  id: string;
  title: string;
  duration: string;
  poster: string;
};
>>>>>>> 52b8d0ddd65d6e9c232490c34ff8bb201e119286

export default function MovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(screen)/movie-booking',
      params: {
        movie: JSON.stringify(movie), // Truyền toàn bộ object phim
      },
    });
  };

  return (
<<<<<<< HEAD
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {movie.poster && !imageError ? (
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.poster, styles.placeholder]}>
          <Text style={styles.placeholderText}>Không có ảnh</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.duration}>{movie.duration}</Text>
      </View>
=======
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8} 
      onPress={() => router.push({
        pathname: '/movie-booking',
        params: { 
          movie: JSON.stringify(movie),
          movieId: movie.id, // ✅ THÊM movieId riêng để dễ lấy
        },
      })}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>

      <Text style={styles.duration}>{movie.duration}</Text>
>>>>>>> 52b8d0ddd65d6e9c232490c34ff8bb201e119286
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
