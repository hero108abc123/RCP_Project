import { StyleSheet, Text, View } from 'react-native';

export default function PaymentSummary({ seatCount, seatPrice, comboTotal }: any) {
  const total = seatCount * seatPrice + comboTotal;

  return (
    <View style={styles.box}>
      <Row label="Tổng tiền" value={`${total.toLocaleString()}đ`} />
      <Row label="Số tiền được giảm" value="0đ" />
      <Row label="Cần thanh toán" value={`${total.toLocaleString()}đ`} highlight />
    </View>
  );
}

const Row = ({ label, value, highlight }: any) => (
  <View style={styles.row}>
    <Text>{label}</Text>
    <Text style={highlight && { color: 'red', fontWeight: '700' }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: { backgroundColor: '#fff', margin: 12, padding: 12, borderRadius: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
});
