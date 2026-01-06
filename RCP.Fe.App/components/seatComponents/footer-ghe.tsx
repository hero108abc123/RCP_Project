import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  selectedSeats: string[];
};

export default function SeatFooter({ selectedSeats }: Props) {

  const router = useRouter();
  const totalPrice = selectedSeats.length * 50000;

  return (
    <View style={styles.container}>
      <View>
        <Text>Ghế đã chọn</Text>
        <Text style={styles.bold}>{selectedSeats.join(', ') || '--'}</Text>
      </View>

      <View>
        <Text>Tổng tiền</Text>
        <Text style={styles.bold}>
          {totalPrice.toLocaleString()} đ
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          selectedSeats.length === 0 && styles.disabled,
        ]}
        disabled={selectedSeats.length === 0}
        onPress={()=> {
          router.push('/booking/payment' as any)
        }}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  bold: { fontWeight: '700' },
  button: {
    backgroundColor: '#0A4B8E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
