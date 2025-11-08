
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';


const sampleMovies = [
  {
    id: '1',
    title: 'TERMINATOR 3',
    poster: require('../assets/images/terminator1.jpg'),
    category: 'Action'
  },
  {
    id: '2',
    title: 'KỊ SĨ BÓNG ĐÊM',
    poster: require('../assets/images/darkknight.jpg'),
    category: 'Detective'
  },
  {
    id: '3',
    title: 'ANIME SAMPLE',
    poster: require('../assets/images/anime1.jpg'),
    category: 'Anime'
  },
  {
    id: '4',
    title: 'ROMANTIC SAMPLE',
    poster: require('../assets/images/romance1.jpg'),
    category: 'Romantic'
  }
];

const categories = ['Action', 'Romantic', 'Horror', 'Detective', 'Fantasy'];

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.menuRow}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.menuBtn}>
            <Text style={styles.menuText}>All movies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/for-kid')} style={styles.menuBtn}>
            <Text style={styles.menuText}>For kid</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/my-ticket')} style={styles.menuBtn}>
            <Text style={styles.menuText}>My ticket</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Coming soon</Text>

        {/* bấm vào chuyển tới detail) */}
        <TouchableOpacity
          style={styles.featured}
          activeOpacity={0.9}
          onPress={() => router.push(`/movie/${sampleMovies[0].id}`)}
        >
          <Image source={sampleMovies[0].poster} style={styles.featuredImage} />
          <View style={styles.playButton}>
            <Text style={styles.playText}>▶</Text>
          </View>
        </TouchableOpacity>

 
        <View style={styles.chipsRow}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              style={styles.chip}
              onPress={() => router.push(`/category/${c}`)}
            >
              <Text style={styles.chipText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Now Showing</Text>


        <Text style={styles.subTitle}>Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {sampleMovies.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={styles.card}
              onPress={() => router.push(`/movie/${m.id}`)}
            >
              <Image source={m.poster} style={styles.cardImage} />
              <Text numberOfLines={1} style={styles.cardTitle}>{m.title}</Text>
              <Text style={styles.cardCategory}>{m.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.subTitle, { marginTop: 18 }]}>Anime</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {sampleMovies
            .filter((m) => m.category === 'Anime')
            .map((m) => (
              <TouchableOpacity key={`a-${m.id}`} style={styles.card} onPress={() => router.push(`/movie/${m.id}`)}>
                <Image source={m.poster} style={styles.cardImage} />
                <Text numberOfLines={1} style={styles.cardTitle}>{m.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={[styles.subTitle, { marginTop: 18 }]}>Romantic</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8, marginBottom: 20 }}>
          {sampleMovies
            .filter((m) => m.category === 'Romantic' || m.category === 'Romantic')
            .map((m) => (
              <TouchableOpacity key={`r-${m.id}`} style={styles.card} onPress={() => router.push(`/movie/${m.id}`)}>
                <Image source={m.poster} style={styles.cardImage} />
                <Text numberOfLines={1} style={styles.cardTitle}>{m.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 12, paddingVertical: 10 },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuBtn: { paddingHorizontal: 6, paddingVertical: 4 },
  menuText: { color: '#FBBF24', fontWeight: '600' },

  container: { padding: 12 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 10 },

  featured: { height: 200, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  featuredImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    backgroundColor: '#FB923C',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playText: { color: '#fff', fontWeight: '700' },

  chipsRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#374151', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipText: { color: '#fff' },

  subTitle: { color: '#F3F4F6', fontWeight: '700' },

  card: { width: 140, marginRight: 12 },
  cardImage: { width: '100%', height: 180, borderRadius: 8 },
  cardTitle: { color: '#fff', marginTop: 6, fontWeight: '600' },
  cardCategory: { color: '#D1D5DB', fontSize: 12 }
});
