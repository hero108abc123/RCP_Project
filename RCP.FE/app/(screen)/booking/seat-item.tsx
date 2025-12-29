import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SeatScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['I6', 'I7']);
  const [timeLeft, setTimeLeft] = useState(593);

  const { movieId, cinemaName, date, time } = params;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Debug params
  useEffect(() => {
    console.log('=== Seat Screen Params ===');
    console.log('movieId:', movieId);
    console.log('cinemaName:', cinemaName);
    console.log('date:', date);
    console.log('time:', time);
  }, [movieId, cinemaName, date, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const seatsPerRow: { [key: string]: number } = {
    A: 12,
    B: 12,
    C: 12,
    D: 12,
    E: 12,
    F: 12,
    G: 12,
    H: 12,
    I: 12,
    J: 12,
    K: 12,
    L: 6,
  };

  const bookedSeats = ['A3', 'A4', 'B5', 'C6', 'D7', 'E4', 'E5', 'F8', 'G3'];
  const vipSeats = rows
    .slice(6, 10)
    .flatMap((row) =>
      Array.from({ length: seatsPerRow[row] }, (_, i) => `${row}${i + 1}`)
    );

  const getSeatStatus = (seat: string) => {
    if (selectedSeats.includes(seat)) return 'selected';
    if (bookedSeats.includes(seat)) return 'booked';
    if (vipSeats.includes(seat)) return 'vip';
    return 'available';
  };

  const toggleSeat = (seat: string) => {
    const status = getSeatStatus(seat);
    if (status === 'booked') return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (vipSeats.includes(seat) ? 50000 : 50000);
    }, 0);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một ghế');
      return;
    }
    
    Alert.alert(
      'Xác nhận',
      `Bạn đã chọn ${selectedSeats.length} ghế: ${selectedSeats.join(', ')}\nTổng tiền: ${calculateTotal().toLocaleString('vi-VN')} đ`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Tiếp tục', onPress: () => console.log('Continue booking...') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐẶT VÉ THEO PHIM</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Movie Info */}
        <View style={styles.movieCard}>
          <Text style={styles.movieTitle}>Avatar: Lửa Và Trở Tận</Text>
          <Text style={styles.movieInfo}>
            {cinemaName} | {date} {time}
          </Text>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendAvailable]} />
              <Text style={styles.legendText}>Ghế trống</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBooked]} />
              <Text style={styles.legendText}>Ghế đã bán</Text>
            </View>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendSelected]} />
              <Text style={styles.legendText}>Ghế đang chọn</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendVip]} />
              <Text style={styles.legendText}>Ghế VIP</Text>
            </View>
          </View>
        </View>

        {/* Screen */}
        <View style={styles.screenContainer}>
          <Text style={styles.screenLabel}>MÀN HÌNH CHIẾU</Text>
          <View style={styles.screen} />
        </View>

        {/* Seats */}
        <View style={styles.seatsLayout}>
          {rows.map((row) => {
            const numSeats = seatsPerRow[row];

            return (
              <View key={row} style={styles.seatRow}>
                <Text style={styles.rowLabel}>{row}</Text>
                <View style={styles.seatsContainer}>
                  {Array.from({ length: numSeats }, (_, i) => {
                    const seatNumber = i + 1;
                    const seatId = `${row}${seatNumber}`;
                    const status = getSeatStatus(seatId);

                    return (
                      <TouchableOpacity
                        key={seatId}
                        style={[
                          styles.seat,
                          status === 'available' && styles.seatAvailable,
                          status === 'selected' && styles.seatSelected,
                          status === 'booked' && styles.seatBooked,
                          status === 'vip' && styles.seatVip,
                        ]}
                        onPress={() => toggleSeat(seatId)}
                        disabled={status === 'booked'}
                      >
                        <Text
                          style={[
                            styles.seatText,
                            (status === 'selected' || status === 'booked') &&
                              styles.seatTextWhite,
                          ]}
                        >
                          {seatNumber}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.rowLabel}>{row}</Text>
              </View>
            );
          })}
        </View>

        {/* Selection Info */}
        <View style={styles.selectionInfo}>
          <View>
            <Text style={styles.selectionLabel}>Ghế đã chọn:</Text>
            <Text style={styles.selectionSeats}>
              {selectedSeats.join(', ') || 'Chưa chọn'}
            </Text>
          </View>
          <View>
            <Text style={styles.selectionLabel}>Tổng tiền:</Text>
            <Text style={styles.selectionTotal}>
              {calculateTotal().toLocaleString('vi-VN')} đ
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Thời gian còn lại:</Text>
          <Text style={styles.footerTime}>{formatTime(timeLeft)}</Text>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0066CC',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  movieCard: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieInfo: {
    color: '#fff',
    fontSize: 14,
  },
  legend: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
  },
  legendAvailable: {
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  legendSelected: {
    backgroundColor: '#FF6B6B',
  },
  legendBooked: {
    backgroundColor: '#999',
  },
  legendVip: {
    backgroundColor: '#FFD700',
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
  screenContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  screenLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    letterSpacing: 2,
  },
  screen: {
    width: '80%',
    height: 4,
    backgroundColor: '#0066CC',
    borderRadius: 2,
  },
  seatsLayout: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  rowLabel: {
    width: 24,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  seatsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
  },
  seatAvailable: {
    backgroundColor: '#E8E8E8',
    borderColor: '#ccc',
  },
  seatSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  seatBooked: {
    backgroundColor: '#999',
    borderColor: '#999',
  },
  seatVip: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  seatText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  seatTextWhite: {
    color: '#fff',
  },
  selectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 16,
  },
  selectionLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  selectionSeats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectionTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  footerTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  continueButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});