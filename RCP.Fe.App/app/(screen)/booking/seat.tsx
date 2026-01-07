import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

// Import Components
import SeatHeader from "@/components/seatComponents/header-seat-phim";
import SeatFooter from "@/components/seatComponents/footer-ghe";
import SeatLegend from "@/components/seatComponents/seat-legend";
import SeatMap from "@/components/seatComponents/seat-map";
import ScreenIndicator from "@/components/seatComponents/screen";

// Redux
import { AppDispatch } from "@/redux/store";
import { $getAllGheInRoom, clearGheData } from "@/redux/slices/roomSlice";
import { IGheInRoom } from "@/model/room/ghe.models";

export default function SeatScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams<any>();

  const [selectedSeats, setSelectedSeats] = useState<IGheInRoom[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);

  // Lấy data an toàn trực tiếp từ state
  const ghes = useSelector((state: any) => state.room?.ghes || []);
  const loading = useSelector(
    (state: any) => state.room?.$getAllGheInRoom?.loading || false
  );

  useEffect(() => {
    // Kiểm tra kỹ các tham số từ params truyền sang
    const { idRoom, idCinema, idLichChieu } = params;

    if (idRoom && idCinema && idLichChieu) {
      dispatch(
        $getAllGheInRoom({
          idRoom: Number(idRoom),
          idCinema: Number(idCinema),
          idLichChieu: Number(idLichChieu), // Tham số bắt buộc theo Interface mới
          pageNumber: 1,
          pageSize: 500, // Đảm bảo lấy hết sơ đồ ghế trong 1 lần gọi
        })
      );
    } else {
      console.warn("Missing params:", { idRoom, idCinema, idLichChieu });
    }

    return () => {
      dispatch(clearGheData());
    };
  }, [params.idRoom, params.idCinema, params.idLichChieu]);

  const handleSeatPress = useCallback((seat: IGheInRoom) => {
    setSelectedSeats((prev) => {
      const isExist = prev.some((s) => s.id === seat.id);
      return isExist ? prev.filter((s) => s.id !== seat.id) : [...prev, seat];
    });
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#0B4A8B" }}>
        <Appbar.BackAction onPress={() => router.back()} color="white" />
        <Appbar.Content
          title="ĐẶT VÉ PHIM"
          titleStyle={{ color: "#fff", fontWeight: "700" }}
        />
      </Appbar.Header>

      <SeatHeader {...params} />
      <SeatLegend />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B4A8B" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScreenIndicator />
          <SeatMap
            ghes={ghes}
            selectedSeats={selectedSeats}
            onSeatPress={handleSeatPress}
          />
        </View>
      )}

      <SeatFooter selectedSeats={selectedSeats} timeLeft={timeLeft} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
