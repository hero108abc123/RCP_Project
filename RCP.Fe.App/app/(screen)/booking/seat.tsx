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
  resetDatVe,
} from "@/redux/slices/datVeSlice";
import { GetTrangThaiGheDto } from "@/model/datve/ghetam.models";
import { DatVeTamDto, XacNhanDatVeByUserIdDto } from "@/model/datve/ve.models";
import { IGheInRoom } from "@/model/room/ghe.models";
import { getAllGheInRoom } from "@/api/room.service";

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
  const loading = useSelector((state: any) => state.datVe?.loading || false);

  // ✅ LOCAL STATE cho timer thay vì dùng Redux
  const [timeLeft, setTimeLeft] = useState(600);
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

  const idCinema = Number(params.idCinema) || 0;
  const idPhim = Number(params.idPhim) || 0;
  const idRoom = Number(params.idRoom) || 0;
  const idLichChieu = Number(params.idLichChieu) || 0;

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

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("vi-VN");
    } catch {
      return "";
    }
  };

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

  const mergedGhes = useCallback((): IGheInRoom[] => {
    if (ghes.length === 0) return [];

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

  const handleSeatPress = useCallback(
    async (seat: IGheInRoom) => {
      if (loading || !seat.id) return;

      const existingSeat = selectedSeats.find((s) => s.idGhe === seat.id);

      if (existingSeat) {
        try {
          await dispatch($huyDatVeTam(existingSeat.idGheTamGiu)).unwrap();
          setSelectedSeats((prev) => prev.filter((s) => s.idGhe !== seat.id));
          fetchTrangThaiGhe();
        } catch (error) {
          Alert.alert("Lỗi", "Không thể hủy ghế đang giữ");
        }
      } else {
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

  const handleContinue = useCallback(async () => {
  if (selectedSeats.length === 0 || isSubmitting) return;

  setIsSubmitting(true);

  // ✅ Lấy danh sách idGhe từ selectedSeats
  const listIdGhe = selectedSeats.map((seat) => seat.idGhe);

  const dto: XacNhanDatVeByUserIdDto = {
    idGhe: listIdGhe as any, // Cast vì interface định nghĩa là []
    sessionId,
  };

  try {
    console.log("📤 Sending DTO:", dto);
    const result = await dispatch($xacNhanDatVeUser(dto)).unwrap();
    console.log("📥 Response:", result);

    // ✅ VALIDATE idVe trước khi gọi API tiếp
    if (!result?.idVe || result.idVe === 0) {
      throw new Error("Không nhận được mã vé từ server");
    }

    await dispatch($getChiTietVe(result.idVe)).unwrap();

    router.push({
      pathname: "/booking/payment",
      params: { 
        idVe: result.idVe.toString(),
        sessionId: sessionId 
      },
    } as any);
  } catch (error: any) {
    console.error("❌ Error:", error);
    const errorMsg = error?.message || "Xác nhận đặt vé thất bại. Vui lòng thử lại.";
    Alert.alert("Lỗi", errorMsg);
  } finally {
    setIsSubmitting(false);
  }
}, [dispatch, sessionId, router, isSubmitting, selectedSeats]);

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
              console.error("Error cancelling seats:", error);
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

  const handleTimeExpired = useCallback(() => {
    Alert.alert(
      "Hết phiên đặt vé",
      "Thời gian giữ ghế đã hết. Mời bạn đặt lại.",
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              await dispatch($huyDatVeTamBySession(sessionId)).unwrap();
            } catch (error) {
              console.error("Error cancelling seats:", error);
            }
            dispatch(resetDatVe());
            router.back();
          },
        },
      ],
      { cancelable: false }
    );
  }, [dispatch, router, sessionId]);

  useEffect(() => {
    fetchGhes();
  }, [fetchGhes]);

  useEffect(() => {
    if (ghes.length > 0) {
      fetchTrangThaiGhe();
    }
  }, [ghes.length, fetchTrangThaiGhe]);

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

  // ✅ FIX: Timer dùng local state
  useEffect(() => {
    console.log("🚀 Starting countdown timer");

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev > 0 ? prev - 1 : 0;
        console.log("⏰ Time left:", newTime);
        return newTime;
      });
    }, 1000);

    return () => {
      console.log("🛑 Clearing countdown timer");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ✅ Check hết thời gian
  useEffect(() => {
    if (timeLeft === 0 && selectedSeats.length > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      handleTimeExpired();
    }
  }, [timeLeft, selectedSeats.length, handleTimeExpired]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => handleExit()
      );
      return () => subscription.remove();
    }, [handleExit])
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

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