import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function MovieSummaryCard({ movie, booking }: any) {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: movie.poster }} style={styles.banner}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>{movie.subtitle}</Text>
      </ImageBackground>

      <View style={styles.info}>
        <InfoRow label="Rạp chiếu" value={booking.cinema} />
        <InfoRow label="Ngày chiếu" value={booking.date} />
        <InfoRow label="Giờ chiếu" value={booking.time} />
        <InfoRow label="Phòng chiếu" value={booking.room} />
        <InfoRow label="Loại vé" value={booking.ticketType} />
      </View>
    </View>
  );
}

const InfoRow = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', margin: 12, borderRadius: 12, overflow: 'hidden' },
  banner: { height: 140, justifyContent: 'flex-end', padding: 12 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#EEE', fontSize: 13 },
  info: { padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  label: { color: '#777' },
  value: { fontWeight: '600' },
});
