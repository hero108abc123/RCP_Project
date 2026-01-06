import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PaymentMethod() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>THANH TOÁN</Text>
      <Text style={styles.sub}>Chọn thẻ thanh toán</Text>

      <Method active label="THẺ NỘI ĐỊA" />
      <Method label="THẺ QUỐC TẾ" />
      <Method label="VÍ SHOPEEPAY" />
      <Method label="VÍ MOMO" />
      <Method label="VÍ ZALOPAY" />
    </View>
  );
}

const Method = ({ label, active }: any) => (
  <TouchableOpacity
    style={[styles.method, active && styles.active]}
  >
    <Text style={active && { color: '#0B4A8B', fontWeight: '700' }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 12, marginBottom: 30 },
  title: { fontWeight: '700' },
  sub: { color: '#757575', marginBottom: 10 },
  method: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
  },
  active: {
    borderColor: '#0B4A8B',
    backgroundColor: '#E3F2FD',
  },
});
