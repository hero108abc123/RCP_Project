import { StyleSheet, Text, View } from 'react-native';
import ShowtimeChip from './showtime-chip';

type ShowTime = {
  time: string;
  seat: number;
};

type Props = {
  label: string;
  times: ShowTime[];
  cinemaName: string;
  movieId: string;
  date: string;
};

export default function ShowtimeRow({
  label,
  times,
  cinemaName,
  movieId,
  date,
}: Props) {
  // Validate data
  if (!times || !Array.isArray(times) || times.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {times.map((t, index) => (
          <ShowtimeChip
            key={`${t.time}-${index}`}
            time={t.time}
            seats={t.seat}
            movieId={movieId}
            cinemaName={cinemaName}
            date={date}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});