import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import CinemaList from '@/components/HomeComponents/cinema-list';
import DateSelector from '@/components/HomeComponents/date-selector';

type MovieParams = {
  id: string;
  title: string;
  poster: string;
  duration: string;
  genre?: string;
};

export default function MovieBooking() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();

  const data = JSON.parse(movie as string);

  return (
    <View style={{ flex: 1 }}>
      {/* ---------- Header ---------- */}
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} color='white'/>
        <Appbar.Content title="ĐẶT VÉ THEO PHIM" titleStyle={{ color: '#fff', fontWeight: '700' }} />
      </Appbar.Header>

      {/* ---------- Banner ---------- */}
{/* BANNER */}
      <ImageBackground
        source={{ uri: data.poster }}
        style={styles.banner}
        blurRadius={2}
      >
        <Text style={styles.movieTitle}>{data.title}</Text>
        <Text style={styles.movieInfo}>{data.duration}</Text>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() =>
            router.push({
              pathname: '/(screen)/movie-detail',
              params: {
                movie: JSON.stringify({
                  ...data,
                  director: 'James Cameron',
                  cast: 'Sam Worthington, Zoe Saldaña',
                  genre: 'Khoa học viễn tưởng',
                  language: 'Tiếng Anh',
                  releaseDate: '19/12/2025',
                  description:
                    'Sau nỗi đau mất đi đứa con trưởng, Jake Sully và Neytiri tiếp tục cuộc sống...',
                }),
              },
            })
          }
        >
          <Text style={styles.detailText}>Chi tiết phim</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* ---------- Chọn ngày ---------- */}
      <DateSelector />

      {/* ---------- Danh sách rạp ---------- */}
      <CinemaList />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 220,
    justifyContent: 'flex-end',
    padding: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  movieInfo: {
    color: '#E0E0E0',
    marginVertical: 6,
  },
  detailBtn: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  detailText: {
    color: '#0B4A8B',
    fontWeight: '600',
  },
});
