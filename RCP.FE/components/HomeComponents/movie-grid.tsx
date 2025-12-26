import { FlatList } from 'react-native';
import MovieCard from './movie-card';

const movies = [
  { id: '1', title: 'Avatar', duration: '197 phút', poster: 'https://i.imgur.com/2nCt3Sbl.jpg' },
  { id: '2', title: 'Hoàng Tử Quỷ', duration: '117 phút', poster: 'https://i.imgur.com/DvpvklR.png' },
  { id: '3', title: 'Phi Vụ Động Trời 2', duration: '107 phút', poster: 'https://i.imgur.com/KZsmUi2l.jpg' },
];

export default function MovieGrid() {
  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MovieCard movie={item} />}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ padding: 12 }}
    />
  );
}
