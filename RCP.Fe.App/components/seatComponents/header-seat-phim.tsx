import { View, Text, StyleSheet, ImageBackground } from 'react-native';

type Props = {
  movieTitle?: string;
  cinemaName?: string;
  date?: string;
  time?: string;
  duration?: string;
};

export default function SeatHeader({
  movieTitle,
  cinemaName,
  date,
  time,
  duration,
}: Props) {
  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/800/400' }}
      style={styles.bg}
    >
      <Text style={styles.title}>{movieTitle}</Text>
      <Text style={styles.subtitle}>
        {cinemaName} | {date} {time} | {duration}
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    padding: 16,
    height: 150,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#ddd',
    fontSize: 13,
    marginTop: 4,
  },
});
