import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    router.push({
      pathname: '/cinema/seat',
      params: {
        movieId,
        cinemaName,
        date,
        time,
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={onPress}
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
  },
  seat: {
    fontSize: 11,
    color: '#757575',
  },
});
