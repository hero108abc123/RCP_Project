import { View, Text, StyleSheet } from 'react-native';

const Item = ({ color, label }: any) => (
  <View style={styles.item}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text>{label}</Text>
  </View>
);

export default function SeatLegend() {
  return (
    <View style={styles.container}>
      <Item color="#ccc" label="Ghế trống" />
      <Item color="#4FC3F7" label="Ghế đang giữ" />
      <Item color="#1976D2" label="Ghế đang chọn" />
      <Item color="#F44336" label="Ghế đã bán" />
      <Item color="#FFC107" label="Ghế đặt trước" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
});
