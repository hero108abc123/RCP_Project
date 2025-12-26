import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function MovieCard({ movie }: any) {
  return (
    <View style={{ width: '48%', marginBottom: 16 }}>
      <Image
        source={{ uri: movie.poster }}
        style={{ width: '100%', height: 220, borderRadius: 8 }}
      />
      <Text numberOfLines={1} style={{ fontWeight: '600', marginTop: 6 }}>
        {movie.title}
      </Text>
      <Text style={{ color: '#888', fontSize: 12 }}>{movie.duration}</Text>
    </View>
  );
}