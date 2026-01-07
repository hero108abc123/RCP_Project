// components/seatComponents/footer-ghe.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IGheInRoom } from "@/model/room/ghe.models";

type Props = {
  selectedSeats: IGheInRoom[];
  timeLeft: number;
  onContinue?: () => void;
};

export default function SeatFooter({
  selectedSeats,
  timeLeft,
  onContinue,
}: Props) {
  const router = useRouter();

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    const price = seat.giave?.giaVe ? parseInt(seat.giave.giaVe) : 0;
    return sum + price;
  }, 0);

  const seatLabels = selectedSeats
    .map((s) => `${s.hang}${s.hangGhe}`)
    .join(", ");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.timerSection}>
        <Text style={styles.label}>Thời gian giữ ghế</Text>
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.infoFlex}>
          <Text style={styles.infoLabel}>Ghế đã chọn</Text>
          <Text style={styles.bold} numberOfLines={1}>
            {seatLabels || "--"}
          </Text>
        </View>

        <View style={styles.infoFlex}>
          <Text style={styles.infoLabel}>Tổng tiền</Text>
          <Text style={[styles.bold, styles.priceColor]}>
            {totalPrice.toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, selectedSeats.length === 0 && styles.disabled]}
          disabled={selectedSeats.length === 0}
          onPress={() => {
            if (onContinue) {
              onContinue();
            } else {
              router.push({
                pathname: "/booking/payment",
                params: {
                  selectedSeats: JSON.stringify(selectedSeats),
                  totalPrice: totalPrice,
                },
              } as any);
            }
          }}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingBottom: 20,
  },
  timerSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  infoFlex: {
    flex: 1,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#777",
  },
  bold: {
    fontWeight: "700",
    fontSize: 14,
  },
  priceColor: {
    color: "#0A4B8E",
  },
  button: {
    backgroundColor: "#0A4B8E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  disabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "700" },
  label: {
    fontSize: 12,
    color: "#777",
  },
  time: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E53935",
  },
});