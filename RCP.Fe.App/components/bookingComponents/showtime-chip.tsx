import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  time: string;
  seats: number;
  cinemaName: string;
  movieId: string;
  date: string;
};

export default function ShowtimeChip({ time, seats, cinemaName, movieId, date }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/booking/seat',
          params: { cinemaName, movieId, time, date },
        })
      }
    >
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.seats}>{seats} trống</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#EEE',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    minWidth: 72,
  },
  time: { fontWeight: '600', fontSize: 14 },
  seats: { fontSize: 11, color: '#555' },
});
