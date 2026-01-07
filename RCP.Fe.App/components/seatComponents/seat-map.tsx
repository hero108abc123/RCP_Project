import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { IGheInRoom } from "@/model/room/ghe.models";

type Props = {
  ghes: IGheInRoom[];
  selectedSeats: IGheInRoom[];
  onSeatPress: (seat: IGheInRoom) => void;
};

export default function SeatMap({ ghes, selectedSeats, onSeatPress }: Props) {
  // Nhóm ghế theo thuộc tính 'hang' từ backend
  const groupedGhes = ghes.reduce((acc, current) => {
    const row = current.hang || "Unknown";
    if (!acc[row]) acc[row] = [];
    acc[row].push(current);
    return acc;
  }, {} as Record<string, IGheInRoom[]>);

  const rowLabels = Object.keys(groupedGhes).sort();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {rowLabels.map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seats}>
                {groupedGhes[row]
                  .sort((a, b) => (a.hangGhe || 0) - (b.hangGhe || 0)) // Sắp xếp ghế 1, 2, 3...
                  .map((seat) => (
                    <TouchableOpacity
                      key={seat.id}
                      onPress={() => onSeatPress(seat)}
                      style={[
                        styles.seat,
                        selectedSeats.some((s) => s.id === seat.id) &&
                          styles.selected,
                      ]}
                    >
                      <Text style={styles.seatText}>{seat.hangGhe}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rowLabel: {
    width: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#999",
  },
  seats: { flexDirection: "row", gap: 8, marginHorizontal: 10 },
  seat: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: { backgroundColor: "#1976D2", borderColor: "#1976D2" },
  seatText: { fontSize: 10, fontWeight: "bold" },
});
