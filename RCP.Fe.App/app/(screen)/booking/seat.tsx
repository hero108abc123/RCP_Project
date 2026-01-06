import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SeatHeader from '@/components/seatComponents/header-seat-phim';
import SeatFooter from '@/components/seatComponents/footer-ghe';
import SeatLegend from '@/components/seatComponents/seat-legend';
import SeatMap from '@/components/seatComponents/seat-map';
import { Seat } from '@/components/seatComponents/type-seat';
import { useState } from 'react';
import ScreenIndicator from '@/components/seatComponents/screen';
import { Appbar } from 'react-native-paper';

export default function SeatScreen() {

  const router = useRouter();
  const params = useLocalSearchParams<{
    movieTitle: string;
    cinemaName: string;
    date: string;
    time: string;
    duration: string;
  }>();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} color='white'/>
        <Appbar.Content title="ĐẶT VÉ THEO PHIM" titleStyle={{ color: '#fff', fontWeight: '700' }} />
      </Appbar.Header>
      <SeatHeader {...params} />
      <SeatLegend />
      <ScreenIndicator />

      <SeatMap
        selectedSeats={selectedSeats}
        onChange={setSelectedSeats}
      />

      <SeatFooter selectedSeats={selectedSeats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
