import React from 'react';
import { FlatList } from 'react-native';
import MovieCard from './movie-card';

const movies = [
  {
    id: '1',
    title: 'Avatar: Dòng Chảy Của Nước',
    duration: '197 phút',
    poster: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    id: '2',
    title: 'Hoàng Tử Quỷ',
    duration: '117 phút',
    poster: 'https://i.imgur.com/DvpvklR.png',
  },
  {
    id: '3',
    title: 'Phi Vụ Động Trời 2',
    duration: '107 phút',
    poster: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    id: '4',
    title: 'Fast & Furious 10',
    duration: '141 phút',
    poster: 'https://i.imgur.com/jT0bG4H.jpg',
  },
  {
    id: '5',
    title: 'Dune: Part Two',
    duration: '165 phút',
    poster: 'https://i.imgur.com/J5LVHEL.jpg',
  },
  {
    id: '6',
    title: 'Inside Out 2',
    duration: '102 phút',
    poster: 'https://i.imgur.com/0y8Ftya.jpg',
  },
];

export default function MovieGrid() {
  return (
    <FlatList
      data={movies}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MovieCard movie={item} />}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ padding: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
