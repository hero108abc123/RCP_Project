import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Seat() {
  const router = useRouter();
  const { movieId, cinemaName, date, time } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="ĐẶT VÉ XEM PHIM"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <Text>🎬 Movie ID: {movieId}</Text>
        <Text>🏢 Rạp: {cinemaName}</Text>
        <Text>📅 Ngày: {date}</Text>
        <Text>⏰ Giờ chiếu: {time}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>👉 MÀN CHỌN GHẾ</Text>
      </View>
    </View>
  );
}
