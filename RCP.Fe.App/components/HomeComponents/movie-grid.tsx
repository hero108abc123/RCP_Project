import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './movie-card';
import { IMovie } from '@/model/movie/movie.models';
import { getAllMovie } from '@/api/movie.service';
import { useState } from 'react';

export default function MovieGrid() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllMovie({
        pageNumber: 1,
        pageSize: 20,
      });

      // Log toàn bộ response để debug
      console.log('API response:', res);
      console.log('Items:', res.items);
      console.log('Total items:', res.totalItems);

      setMovies(res?.items ?? []);
    } catch (err: any) {
      console.log('Fetch movies error:', err);
      setError(err?.message ?? 'Lỗi khi lấy danh sách phim');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0B4A8B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Chưa có phim nào</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      numColumns={3}
      keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={{
            id: item.id?.toString() ?? '',
            title: item.tenPhim ?? '',
            duration: item.thoiLuongPhut ? `${item.thoiLuongPhut} phút` : 'Đang cập nhật',
            poster: item.anhBia ?? '',
          }}
        />
      )}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ padding: 12 }}
      showsVerticalScrollIndicator={false}
    />

  );
}
