import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  time: string;
  seats: number;
  movieId: string;
  cinemaName: string;
  date: string;
};

export default function ShowtimeChip({
  time,
  seats,
  movieId,
  cinemaName,
  date,
}: Props) {
  const router = useRouter();

  const onPress = () => {
    try {
      console.log('=== Navigation Debug ===');
      console.log('movieId:', movieId);
      console.log('cinemaName:', cinemaName);
      console.log('date:', date);
      console.log('time:', time);
      
      // Validate params
      if (!movieId || !cinemaName || !date || !time) {
        Alert.alert('Lỗi', 'Thiếu thông tin cần thiết');
        return;
      }


      router.push({
        pathname:'/(screen)/cinema/seat',
        params: {
          movieId: String(movieId),
          cinemaName: String(cinemaName),
          date: String(date),
          time: String(time),
        },
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Lỗi', 'Không thể chuyển trang');
    }
  };

  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.seat}>{seats} trống</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  time: {
    fontWeight: '700',
    fontSize: 14,
  },
  seat: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
});