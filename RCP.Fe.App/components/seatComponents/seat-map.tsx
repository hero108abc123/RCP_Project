import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  selectedSeats: string[];
  onChange: (seats: string[]) => void;
};

const rows = ['A','B','C','D','E','F','G','H','I'];

const seatsPerRow: Record<string, number> = {
  A: 8, B: 8, C: 8,
  D: 8, E: 8, F: 8,
  G: 8, H: 8, I: 8,
  J:8
};

const seatStatusMap: Record<string, 'available' | 'sold'> = {
  F7: 'sold'
};

export default function SeatMap({ selectedSeats, onChange }: Props) {

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      onChange(selectedSeats.filter(id => id !== seatId));
    } else {
      onChange([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return 'selected';
    return seatStatusMap[seatId] ?? 'available';
  };

  return (
    <View style={styles.container}>
      {rows.map(row => {
        const numSeats = seatsPerRow[row];
        const isLastRow = row === 'L';

        return (
          <View key={row} style={styles.row}>
            <Text style={styles.rowLabel}>{row}</Text>

            <View style={styles.seats}>
              {Array.from({ length: numSeats }, (_, i) => {
                const seatNumber = i + 1;
                const seatId = `${row}${seatNumber}`;
                const status = getSeatStatus(seatId);

                return (
                  <TouchableOpacity
                    key={seatId}
                    disabled={status === 'sold'}
                    onPress={() => toggleSeat(seatId)}
                    style={[
                      styles.seat,
                      isLastRow && styles.largeSeat,
                      status === 'selected' && styles.selected,
                      status === 'sold' && styles.sold
                    ]}
                  >
                    <Text style={styles.seatText}>{seatNumber}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.rowLabel}>{row}</Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  rowLabel: {
    width: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#666',
  },
  seats: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 8,
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeSeat: {
    width: 32,
    height: 32,
  },
  selected: {
    backgroundColor: '#1976D2',
  },
  sold: {
    backgroundColor: '#9E9E9E',
  },
  vip: {
    backgroundColor: '#FFD54F',
  },
  seatText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
