// components/seatComponents/seat-map.tsx
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { IGheInRoom } from "@/model/room/ghe.models";
import {
  GHE_TYPE_CONSTANTS,
  TRANG_THAI_GHE_CONSTANTS,
} from "@/constants/cinema/gheConstants";

type Props = {
  ghes: IGheInRoom[];
  selectedSeats: IGheInRoom[];
  onSeatPress: (seat: IGheInRoom) => void;
};

export default function SeatMap({ ghes, selectedSeats, onSeatPress }: Props) {
  // Nhóm ghế theo hàng
  const groupedGhes = ghes.reduce((acc, current) => {
    const row = current.hang || "Unknown";
    if (!acc[row]) acc[row] = [];
    acc[row].push(current);
    return acc;
  }, {} as Record<string, IGheInRoom[]>);

  const rowLabels = Object.keys(groupedGhes).sort();

  // Hàm xác định màu ghế dựa trên trạng thái
  const getSeatStyle = (seat: IGheInRoom, isSelected: boolean) => {
    const status = seat.trangThaiDatVe?.trangThaiDatVe;

    if (isSelected) {
      return {
        bgColor: "#1976D2",
        borderColor: "#0D47A1",
        textColor: "#FFFFFF",
      };
    }

    switch (status) {
      case TRANG_THAI_GHE_CONSTANTS.DA_DAT:
        return {
          bgColor: "#E53935",
          borderColor: "#B71C1C",
          textColor: "#FFFFFF",
        };
      case TRANG_THAI_GHE_CONSTANTS.DANG_GIU:
        return {
          bgColor: "#FFC107",
          borderColor: "#FF8F00",
          textColor: "#000000",
        };
      default:
        return {
          bgColor: "#E8E8E8",
          borderColor: "#BDBDBD",
          textColor: "#616161",
        };
    }
  };

  // Kiểm tra ghế có bị disable không
  const isSeatDisabled = (seat: IGheInRoom) => {
    const status = seat.trangThaiDatVe?.trangThaiDatVe;
    return (
      status === TRANG_THAI_GHE_CONSTANTS.DA_DAT ||
      status === TRANG_THAI_GHE_CONSTANTS.DANG_GIU
    );
  };

  if (ghes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu ghế</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        <View style={styles.container}>
          {rowLabels.map((row) => {
            const rowSeats = groupedGhes[row].sort(
              (a, b) => (a.hangGhe || 0) - (b.hangGhe || 0)
            );

            return (
              <View key={row} style={styles.row}>
                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>{row}</Text>
                </View>

                <View style={styles.seats}>
                  {rowSeats.map((seat) => {
                    const isSelected = selectedSeats.some(
                      (s) => s.id === seat.id
                    );
                    const colors = getSeatStyle(seat, isSelected);
                    const disabled = isSeatDisabled(seat);

                    return (
                      <TouchableOpacity
                        key={seat.id}
                        disabled={disabled}
                        onPress={() => onSeatPress(seat)}
                        style={[
                          styles.seat,
                          {
                            backgroundColor: colors.bgColor,
                            borderColor: colors.borderColor,
                          },
                        ]}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[styles.seatText, { color: colors.textColor }]}
                        >
                          {seat.hangGhe}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.rowLabelContainer}>
                  <Text style={styles.rowLabel}>{row}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  horizontalScroll: {
    paddingHorizontal: 10,
  },
  container: {
    paddingVertical: 20,
    alignItems: "center",
    minWidth: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rowLabelContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9E9E9E",
  },
  seats: {
    flexDirection: "row",
    gap: 6,
    marginHorizontal: 8,
    alignItems: "center",
  },
  seat: {
    width: 32,
    height: 28,
    borderRadius: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  seatText: {
    fontSize: 10,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#9E9E9E",
  },
});