import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Seat } from './type-seat';

type Props = {
  selectedSeats: string[];
  onChange: (seats: string[]) => void;
};

const SEATS: Seat[] = [
  { id: 'F5', status: 'available', label: 'F5', price: 0 },
  { id: 'F6', status: 'available', label: 'F6', price: 0 },
  { id: 'F7', status: 'sold', label: 'F7', price: 0 },
];

export default function SeatMap({ selectedSeats, onChange }: Props) {
  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      onChange(selectedSeats.filter(id => id !== seatId));
    } else {
      onChange([...selectedSeats, seatId]);
    }
  };

  return (
    <View style={styles.container}>
      {SEATS.map(seat => {
        const isSelected = selectedSeats.includes(seat.id);

        return (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              isSelected && styles.selected,
              seat.status === 'sold' && styles.sold,
            ]}
            disabled={seat.status === 'sold'}
            onPress={() => toggleSeat(seat.id)}
          >
            <Text>{seat.id}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', padding: 16 },
  seat: {
    width: 36,
    height: 36,
    margin: 4,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: '#FF3D00' },
  sold: { backgroundColor: '#9E9E9E' },
});
