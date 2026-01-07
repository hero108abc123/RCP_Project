import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Services và Models
import { ICinema } from "@/model/cinema/cinema.models";
import { getAllCinemas } from "@/api/cinema.service";
import { getAllCinemas as getLichChieuAPI } from "@/api/lichchieu.service";
import { ILichChieu } from "@/model/cinema/lichchieu.models";

export default function CinemaList() {
  const router = useRouter();

  // States
  const [openId, setOpenId] = useState<number | null>(null);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [loading, setLoading] = useState(false);

  // State quản lý suất chiếu của rạp đang mở
  const [selectedLichChieu, setSelectedLichChieu] = useState<ILichChieu | null>(
    null
  );
  const [loadingLichChieu, setLoadingLichChieu] = useState(false);

  // Hàm xử lý đóng/mở rạp và gọi API lịch chiếu
  const toggle = async (id: number) => {
    if (openId === id) {
      setOpenId(null);
      setSelectedLichChieu(null);
    } else {
      setOpenId(id);
      fetchSuatChieuByCinema(id);
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  // Lấy danh sách rạp ban đầu
  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const res = await getAllCinemas({ pageNumber: 1, pageSize: 20 });
      // Kiểm tra cấu trúc res.items hoặc res.data.items tùy theo axios config
      const data = (res as any)?.items || (res as any)?.data?.items || [];
      setCinemas(data);
    } catch (error) {
      console.log("Fetch cinema error", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy suất chiếu cho rạp cụ thể khi mở rộng Card
  const fetchSuatChieuByCinema = async (cinemaId: number) => {
    try {
      setLoadingLichChieu(true);
      setSelectedLichChieu(null); // Reset dữ liệu cũ để tránh nhầm rạp

      const res = await getLichChieuAPI({
        pageNumber: 1,
        pageSize: 10,
        idCinema: [cinemaId],
      });

      // Fix lỗi TypeError bằng cách kiểm tra an toàn res và res.items
      // Thử lấy từ res.items (nếu axios đã intercept) hoặc res.data.items
      const responseData =
        (res as any)?.items || (res as any)?.data?.items || [];

      if (responseData && responseData.length > 0) {
        setSelectedLichChieu(responseData[0]);
      } else {
        setSelectedLichChieu(null);
      }
    } catch (error) {
      console.log("Fetch lich chieu error:", error);
      setSelectedLichChieu(null);
    } finally {
      setLoadingLichChieu(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0B4A8B" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cinemas.map((cinema) => {
        const isOpen = openId === cinema.id;

        return (
          <View key={cinema.id} style={styles.card}>
            {/* HEADER - Thông tin rạp */}
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggle(cinema.id!)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.name}>{cinema.name}</Text>
                <Text style={styles.distance}>
                  {cinema.district}, {cinema.city}
                </Text>
              </View>

              <MaterialIcons
                name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="#757575"
              />
            </TouchableOpacity>

            {/* CONTENT - Hiển thị Suất chiếu khi mở rộng */}
            {isOpen && (
              <View style={styles.content}>
                {loadingLichChieu ? (
                  <ActivityIndicator
                    size="small"
                    color="#1976D2"
                    style={{ marginVertical: 10 }}
                  />
                ) : selectedLichChieu &&
                  selectedLichChieu.movies &&
                  selectedLichChieu.movies.length > 0 ? (
                  <View>
                    <Text style={styles.titleSection}>Suất chiếu hôm nay:</Text>
                    <View style={styles.timeGrid}>
                      {selectedLichChieu.movies.map((movie, mIndex) => (
                        <TouchableOpacity
                          key={mIndex}
                          style={styles.timeItem}
                          onPress={() =>
                            router.push({
                              pathname: "/booking/seat",
                              params: {
                                cinemaId: cinema.id,
                                suatChieuId: movie.idPhim,
                              },
                            })
                          }
                        >
                          <Text style={styles.time}>
                            {movie.thoiGianBatDauChieu
                              ? new Date(
                                  movie.thoiGianBatDauChieu
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })
                              : "00:00"}
                          </Text>
                          <Text style={styles.seat}>Còn trống</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <Text style={styles.note}>
                    Hiện rạp chưa có lịch chiếu phù hợp.
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  distance: {
    fontSize: 13,
    color: "#1976D2",
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 12,
  },
  titleSection: {
    fontSize: 13,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeItem: {
    backgroundColor: "#F1F3F5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    minWidth: 85,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  time: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#212529",
  },
  seat: {
    fontSize: 10,
    color: "#868E96",
    marginTop: 2,
  },
  note: {
    fontSize: 12,
    color: "#ADB5BD",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 10,
  },
});
