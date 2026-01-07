import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    duration: string;
    poster: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/movie/${movie.id}` as any)}
      activeOpacity={0.8}
    >
      {movie.poster && !imageError ? (
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
          onError={() => {
            console.log('Image load error:', movie.poster);
            setImageError(true);
          }}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    maxWidth: '31%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    color: '#999',
    fontSize: 10,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  duration: {
    fontSize: 10,
    color: '#666',
  },
});