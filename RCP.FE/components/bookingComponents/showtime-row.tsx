import { StyleSheet, Text, View } from 'react-native';
import ShowtimeChip from './showtime-chip';

export default function ShowtimeRow({ label, times, cinemaName, movieId, date }: any) {
  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {times.map((t: any, index: number) => (
          <ShowtimeChip 
            key={index} 
            {...t}
                        cinemaName={cinemaName}
            movieId={movieId}
            date={date} 
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '700',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
