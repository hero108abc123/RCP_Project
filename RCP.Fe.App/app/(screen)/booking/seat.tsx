import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback, useRef } from "react";
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
import {
  $getTrangThaiGhe,
  $datVeTam,
  $huyDatVeTam,
  $huyDatVeTamBySession,
  $xacNhanDatVeUser,
  $getChiTietVe,
  tick,
  setTimeLeft,
  resetDatVe,
} from "@/redux/slices/datVeSlice";
import { GetTrangThaiGheDto } from "@/model/datve/ghetam.models";
import { DatVeTamDto, XacNhanDatVeByUserIdDto } from "@/model/datve/ve.models";
import { IGheInRoom } from "@/model/room/ghe.models";
import { getAllGheInRoom } from "@/api/room.service";

// Hàm sinh sessionId duy nhất
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

interface SelectedSeatInfo {
  idGhe: number;
  idGheTamGiu: number;
  hang: string;
  hangGhe: number;
  gia: string;
}

export default function SeatScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams<any>();

  // Redux state
  const listTrangThai = useSelector(
    (state: any) => state.datVe?.listGheTrangThai || []
  );
  const timeLeft = useSelector((state: any) => state.datVe?.timeLeft ?? 600);
  const loading = useSelector((state: any) => state.datVe?.loading || false);

  // Local state
  const [sessionId] = useState<string>(() => generateSessionId());
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ghes, setGhes] = useState<IGheInRoom[]>([]);
  const [loadingGhes, setLoadingGhes] = useState(true);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // Parse params
  const idCinema = Number(params.idCinema) || 0;
  const idPhim = Number(params.idPhim) || 0;
  const idRoom = Number(params.idRoom) || 0;
  const idLichChieu = Number(params.idLichChieu) || 0;

  // Format time từ ISO string
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return "";
    }
  };

  // Format date từ ISO string
  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return "";
    }
  };

  // Hàm lấy danh sách ghế từ API room
  const fetchGhes = useCallback(async () => {
    if (!idCinema || !idRoom || !idLichChieu) return;

    try {
      setLoadingGhes(true);
      const res = await getAllGheInRoom({
        idCinema,
        idRoom,
        idLichChieu,
        pageNumber: 1,
        pageSize: 500,
      });
      setGhes(res.items || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách ghế:", error);
    } finally {
      setLoadingGhes(false);
    }
  }, [idCinema, idRoom, idLichChieu]);

  // Hàm lấy trạng thái ghế
  const fetchTrangThaiGhe = useCallback(() => {
    if (!idCinema || !idRoom || !idLichChieu) return;

    const dto: GetTrangThaiGheDto = {
      idCinema,
      idRoom,
      idSuatChieu: idLichChieu,
      sessionId,
    };
    dispatch($getTrangThaiGhe(dto));
  }, [dispatch, idCinema, idRoom, idLichChieu, sessionId]);

  // Merge ghế với trạng thái
  const mergedGhes = useCallback((): IGheInRoom[] => {
    if (ghes.length === 0) return [];

    // Nếu có dữ liệu trạng thái từ API, merge vào
    if (listTrangThai && listTrangThai.length > 0) {
      return ghes.map((ghe) => {
        const trangThai = listTrangThai.find(
          (t: any) => t.idGhe === ghe.id || t.id === ghe.id
        );
        if (trangThai) {
          return {
            ...ghe,
            trangThaiDatVe: {
              trangThaiDatVe:
                trangThai.trangThai ?? trangThai.trangThaiDatVe ?? 0,
            },
          };
        }
        return ghe;
      });
    }

    return ghes;
  }, [ghes, listTrangThai]);

  // Hàm xử lý khi chọn/bỏ chọn ghế
  const handleSeatPress = useCallback(
    async (seat: IGheInRoom) => {
      if (loading || !seat.id) return;

      const existingSeat = selectedSeats.find((s) => s.idGhe === seat.id);

      if (existingSeat) {
        // Bỏ chọn ghế -> Gọi API hủy đặt vé tạm
        try {
          await dispatch($huyDatVeTam(existingSeat.idGheTamGiu)).unwrap();
          setSelectedSeats((prev) => prev.filter((s) => s.idGhe !== seat.id));
          fetchTrangThaiGhe();
        } catch (error) {
          Alert.alert("Lỗi", "Không thể hủy ghế đang giữ");
        }
      } else {
        // Chọn ghế mới -> Gọi API đặt vé tạm
        const dto: DatVeTamDto = {
          idCinema,
          idPhim,
          idRoom,
          idSuatChieu: idLichChieu,
          idGhe: [seat.id],
          sessionId,
        };

        try {
          const result = await dispatch($datVeTam(dto)).unwrap();

          const newSeat: SelectedSeatInfo = {
            idGhe: seat.id,
            idGheTamGiu: result.id || 0,
            hang: seat.hang || "",
            hangGhe: seat.hangGhe || 0,
            gia: result.gia || seat.giave?.giaVe || "0",
          };
          setSelectedSeats((prev) => [...prev, newSeat]);

          fetchTrangThaiGhe();
        } catch (error) {
          Alert.alert("Lỗi", "Không thể giữ ghế. Vui lòng thử lại.");
        }
      }
    },
    [
      dispatch,
      loading,
      selectedSeats,
      idCinema,
      idPhim,
      idRoom,
      idLichChieu,
      sessionId,
      fetchTrangThaiGhe,
    ]
  );

  // Hàm xử lý khi nhấn tiếp tục
  const handleContinue = useCallback(async () => {
    if (selectedSeats.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const dto: XacNhanDatVeByUserIdDto = {
      idGheTamGiu: selectedSeats.map((s) => s.idGheTamGiu),
      sessionId,
    };

    try {
      const result = await dispatch($xacNhanDatVeUser(dto)).unwrap();
      await dispatch($getChiTietVe(result.idVe)).unwrap();

      router.push({
        pathname: "/booking/payment",
        params: { idVe: result.idVe.toString() },
      } as any);
    } catch (error) {
      Alert.alert("Lỗi", "Xác nhận đặt vé thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, selectedSeats, sessionId, router, isSubmitting]);

  // Hàm xử lý khi thoát màn hình
  const handleExit = useCallback(() => {
    if (selectedSeats.length > 0) {
      Alert.alert("Xác nhận", "Bạn có chắc muốn hủy đặt vé không?", [
        { text: "Không", style: "cancel" },
        {
          text: "Có",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch($huyDatVeTamBySession(sessionId)).unwrap();
            } catch (error) {
              // Vẫn cho thoát dù có lỗi
            }
            dispatch(resetDatVe());
            router.back();
          },
        },
      ]);
      return true;
    }
    dispatch(resetDatVe());
    router.back();
    return true;
  }, [dispatch, selectedSeats, sessionId, router]);

  // Hàm xử lý khi hết thời gian
  const handleTimeExpired = useCallback(() => {
    Alert.alert(
      "Hết phiên đặt vé",
      "Thời gian giữ ghế đã hết. Mời bạn đặt lại.",
      [
        {
          text: "OK",
          onPress: () => {
            dispatch(resetDatVe());
            router.back();
          },
        },
      ]
    );
  }, [dispatch, router]);

  // Effect: Set timeLeft = 600 (10 phút) khi vào màn hình
  useEffect(() => {
    dispatch(setTimeLeft(600));
  }, [dispatch]);

  // Effect: Load danh sách ghế lần đầu
  useEffect(() => {
    fetchGhes();
  }, [fetchGhes]);

  // Effect: Load trạng thái ghế sau khi có danh sách ghế
  useEffect(() => {
    if (ghes.length > 0) {
      fetchTrangThaiGhe();
    }
  }, [ghes.length, fetchTrangThaiGhe]);

  // Effect: Refresh trạng thái ghế mỗi 5 giây
  useEffect(() => {
    if (ghes.length === 0) return;

    refreshIntervalRef.current = setInterval(() => {
      fetchTrangThaiGhe();
    }, 5000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [ghes.length, fetchTrangThaiGhe]);

  // Effect: Countdown timer - chạy ngay khi vào màn hình
  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [dispatch]);

  // Effect: Kiểm tra hết thời gian
  useEffect(() => {
    if (timeLeft === 0 && selectedSeats.length > 0) {
      handleTimeExpired();
    }
  }, [timeLeft, selectedSeats.length, handleTimeExpired]);

  // Effect: Handle hardware back button (Android)
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => handleExit()
      );
      return () => subscription.remove();
    }, [handleExit])
  );

  // Effect: Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  // Convert selectedSeats sang format cho SeatFooter
  const selectedSeatsForFooter = selectedSeats.map((s) => ({
    id: s.idGhe,
    hang: s.hang,
    hangGhe: s.hangGhe,
    giave: { giaVe: s.gia },
  }));

  const isLoading = loadingGhes || (loading && selectedSeats.length === 0);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#0B4A8B" }}>
        <Appbar.BackAction onPress={handleExit} color="white" />
        <Appbar.Content
          title="ĐẶT VÉ PHIM"
          titleStyle={{ color: "#fff", fontWeight: "700" }}
        />
      </Appbar.Header>

      <SeatHeader
        movieTitle={params.movieTitle}
        cinemaName={params.cinemaName}
        date={formatDate(params.time)}
        time={formatTime(params.time)}
      />
      <SeatLegend />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B4A8B" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScreenIndicator />
          <SeatMap
            ghes={mergedGhes()}
            selectedSeats={selectedSeatsForFooter as any}
            onSeatPress={handleSeatPress}
          />
        </View>
      )}

      {(loading || isSubmitting) && selectedSeats.length > 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0B4A8B" />
        </View>
      )}

      <SeatFooter
        selectedSeats={selectedSeatsForFooter as any}
        timeLeft={timeLeft}
        onContinue={handleContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});