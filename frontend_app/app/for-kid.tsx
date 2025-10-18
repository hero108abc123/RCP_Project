
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const kids = Array.from({ length: 10 }).map((_, i) => ({
  id: String(200 + i),
  title: `Kids Movie ${i + 1}`,
  img:  require('../assets/images/movie_sample.png'),
}));

export default function ForKid() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phim cho trẻ em</Text>

      <FlatList
        data={kids}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } } as any)}
          >
            <Image source={item.img} style={styles.img} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', paddingTop: 12 },
  header: { color: '#FB923C', fontSize: 22, fontWeight: '800', marginLeft: 16, marginBottom: 12 },
  card: { backgroundColor: '#1f2937', borderRadius: 12, margin: 8, flex: 1, overflow: 'hidden' },
  img: { width: '100%', height: 160 },
  title: { color: '#fff', padding: 8, fontWeight: '700', textAlign: 'center' },
});
