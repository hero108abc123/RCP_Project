import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

type Props = {
  selectedSeats: string[];
  timeLeft: number;
};

export default function SeatFooter({ selectedSeats }: Props) {

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(593); 
  const totalPrice = selectedSeats.length * 50000;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ padding: 16 }}>
      <View>
          <Text style={styles.label}>Thời gian giữ ghế</Text>
          <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    // borderTopWidth: 1,
    // borderColor: '#EEE',
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
  label: {
    fontSize: 12,
    color: '#777',
  },
    time: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E53935',
  }

});
