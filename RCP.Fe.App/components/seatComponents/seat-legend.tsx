// components/seatComponents/seat-legend.tsx
import { View, Text, StyleSheet } from "react-native";

const LegendItem = ({
  color,
  borderColor,
  label,
}: {
  color: string;
  borderColor?: string;
  label: string;
}) => (
  <View style={styles.item}>
    <View
      style={[
        styles.seatIcon,
        { backgroundColor: color, borderColor: borderColor || color },
      ]}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const PriceItem = ({
  color,
  borderColor,
  label,
  price,
}: {
  color: string;
  borderColor?: string;
  label: string;
  price: string;
}) => (
  <View style={styles.priceItem}>
    <View
      style={[
        styles.seatIcon,
        { backgroundColor: color, borderColor: borderColor || color },
      ]}
    />
    <View>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{price}</Text>
    </View>
  </View>
);

export default function SeatLegend() {
  return (
    <View style={styles.container}>
      {/* Trạng thái ghế */}
      <View style={styles.statusSection}>
        <LegendItem color="#E8E8E8" borderColor="#BDBDBD" label="Ghế trống" />
        <LegendItem
          color="#64B5F6"
          borderColor="#1976D2"
          label="Ghế đang được giữ"
        />
        <LegendItem
          color="#1976D2"
          borderColor="#0D47A1"
          label="Ghế đang chọn"
        />
        <LegendItem color="#E53935" borderColor="#B71C1C" label="Ghế đã bán" />
        <LegendItem
          color="#FFC107"
          borderColor="#FF8F00"
          label="Ghế đã đặt trước"
        />
      </View>

      <View style={styles.divider} />

      {/* Giá vé */}
      <View style={styles.priceSection}>
        <PriceItem
          color="#E8E8E8"
          borderColor="#BDBDBD"
          label="Ghế thường"
          price="70.000 đ"
        />
        <PriceItem
          color="#E8E8E8"
          borderColor="#9575CD"
          label="Ghế VIP"
          price="75.000 đ"
        />
        <PriceItem
          color="#FFCDD2"
          borderColor="#E57373"
          label="Ghế đôi"
          price="150.000 đ"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  statusSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "45%",
    marginBottom: 4,
  },
  seatIcon: {
    width: 18,
    height: 14,
    borderRadius: 3,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 1,
    marginRight: 6,
  },
  label: {
    fontSize: 11,
    color: "#616161",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 10,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 10,
    color: "#9E9E9E",
  },
  priceValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1976D2",
  },
});