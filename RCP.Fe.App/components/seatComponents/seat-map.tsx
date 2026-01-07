// components/seatComponents/seat-map.tsx
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
  // Nhóm ghế theo hàng (ví dụ: 'A', 'B'...)
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
                  .sort((a, b) => (a.hangGhe || 0) - (b.hangGhe || 0))
                  .map((seat) => {
                    const isSelected = selectedSeats.some(
                      (s) => s.id === seat.id
                    );

                    // Logic trạng thái ghế:
                    // Giả sử 1 là đã đặt (sold), 0 là trống (available)
                    // Bạn cần kiểm tra giá trị thực tế từ Backend trả về
                    const isSold = seat.trangThaiDatVe?.trangThaiDatVe === 1;

                    return (
                      <TouchableOpacity
                        key={seat.id}
                        disabled={isSold}
                        onPress={() => onSeatPress(seat)}
                        style={[
                          styles.seat,
                          selectedSeats.some((s) => s.id === seat.id) &&
                            styles.selected,
                          isSold && styles.sold,
                        ]}
                      >
                        <Text
                          style={[
                            styles.seatText,
                            (isSelected || isSold) && { color: "#fff" },
                          ]}
                        >
                          {seat.hangGhe}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
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
  sold: { backgroundColor: "#E53935", borderColor: "#E53935" }, // Màu đỏ cho ghế đã bán
  seatText: { fontSize: 10, fontWeight: "bold" },
});
