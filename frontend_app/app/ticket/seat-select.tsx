import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";

export default function SeatSelectionScreen() {

    const router = useRouter();
  // Cấu hình số hàng và cột
  const numRows = 9; // A–I
  const numCols = 8;

  // Tạo danh sách ghế
  const generateSeats = () => {
    const rows = Array.from({ length: numRows }, (_, i) =>
      String.fromCharCode(65 + i)
    ); // A, B, C,...
    const seats: { id: string; row: string; col: number; reserved: boolean }[] = [];

    rows.forEach((row) => {
      for (let col = 1; col <= numCols; col++) {
        seats.push({
          id: `${row}${col}`,
          row,
          col,
          reserved: Math.random() < 0.25, // random 25% ghế bị đặt
        });
      }
    });
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Xử lý chọn ghế
  const handleSelectSeat = (id: string, reserved: boolean) => {
    if (reserved) return; // không chọn được nếu đã đặt
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== id));
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction onPress={() => router.back()} color="white" />
          <Appbar.Content title="Choose your seats" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        {/* Màn hình rạp */}
        <Text style={styles.screenText}>Screen</Text>
        <View style={styles.screenCurve} />

        {/* Bảng ghế */}
        <FlatList
          data={Array.from({ length: numRows })}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ alignItems: "center", marginTop: 20 }}
          renderItem={({ index: rowIndex }) => {
            const rowLetter = String.fromCharCode(65 + rowIndex);
            const rowSeats = seats.filter((s) => s.row === rowLetter);

            return (
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{rowLetter}</Text>
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  return (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,
                        seat.reserved && styles.seatReserved,
                        isSelected && styles.seatSelected,
                      ]}
                      onPress={() => handleSelectSeat(seat.id, seat.reserved)}
                    />
                  );
                })}
              </View>
            );
          }}
        />

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "transparent", borderColor: "white" }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "red" }]} />
            <Text style={styles.legendText}>Reserved</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: "#00ffff" }]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
        </View>

        {/* Nút xác nhận */}
        <TouchableOpacity style={styles.confirmButton} 
            onPress={() => {
                router.push('/ticket/ticket-detail');
                console.log(selectedSeats);
            }}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1f2937" },
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  screenText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  screenCurve: {
    width: "70%",
    height: 20,
    borderTopWidth: 4,
    borderTopColor: "white",
    borderRadius: 100,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  rowLabel: {
    color: "white",
    width: 20,
    marginRight: 10,
    textAlign: "center",
  },
  seat: {
    width: 25,
    height: 25,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
  },
  seatReserved: {
    backgroundColor: "red",
  },
  seatSelected: {
    backgroundColor: "#00ffff",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendBox: {
    width: 18,
    height: 18,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "white",
  },
  legendText: {
    color: "white",
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: "black",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
