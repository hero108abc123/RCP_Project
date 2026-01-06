import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function PaymentHeader() {
  return (
    <View>
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/Qr71crq.jpg' }}
        style={styles.banner}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Avatar: Lửa Và Tro Tàn</Text>
          <Text style={styles.sub}>
            2D Phụ đề | Khoa học viễn tưởng | 197 phút
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.card}>
        <Info label="Rạp chiếu" value="Beta Giải Phóng" />
        <Info label="Ngày chiếu" value="29/12/2025" />
        <Info label="Giờ chiếu" value="10:30" />
        <Info label="Phòng chiếu" value="P6" />
        <Info label="Loại vé" value="DOUBLE" />
      </View>
    </View>
  );
}

const Info = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  banner: { height: 180, justifyContent: 'flex-end' },
  overlay: { padding: 14, backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  sub: { color: '#E0E0E0', marginTop: 4 },

  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { color: '#757575' },
  value: { fontWeight: '600' },
});
