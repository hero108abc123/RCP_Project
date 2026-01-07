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

import { ICinema } from "@/model/cinema/cinema.models";
import { getAllCinemas } from "@/api/cinema.service";
import { getAllCinemas as getLichChieuAPI } from "@/api/lichchieu.service";
import { ILichChieu } from "@/model/cinema/lichchieu.models";

interface CinemaListProps {
  movieId?: number;
  selectedDate?: Date;
}

export default function CinemaList({ movieId, selectedDate }: CinemaListProps) {
  const router = useRouter();

  const [openId, setOpenId] = useState<number | null>(null);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLichChieu, setSelectedLichChieu] = useState<ILichChieu | null>(
    null
  );
  const [loadingLichChieu, setLoadingLichChieu] = useState(false);

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

  // Re-fetch lịch chiếu khi selectedDate thay đổi (chỉ khi có rạp đang mở)
  useEffect(() => {
    if (openId !== null) {
      fetchSuatChieuByCinema(openId);
    }
  }, [selectedDate]);

  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const res = await getAllCinemas({ pageNumber: 1, pageSize: 20 });
      const data = (res as any)?.items || (res as any)?.data?.items || [];
      setCinemas(data);
    } catch (error) {
      console.log("Fetch cinema error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuatChieuByCinema = async (cinemaId: number) => {
    try {
      setLoadingLichChieu(true);
      setSelectedLichChieu(null);

      const tuNgay = selectedDate ? new Date(selectedDate) : new Date();
      tuNgay.setHours(0, 0, 0, 0);
      const denNgay = new Date(tuNgay);
      denNgay.setHours(23, 59, 59, 999);

      const params = {
        pageNumber: 1,
        pageSize: 50,
        idCinema: [cinemaId],
        tuNgay: tuNgay,
        denNgay: denNgay,
      };

      const res = await getLichChieuAPI(params);
      const responseData =
        (res as any)?.items || (res as any)?.data?.items || [];

      if (responseData && responseData.length > 0) {
        // ✅ Sửa logic tìm rạp dựa trên cinema.idCinema
        let lichChieu = responseData.find(
          (item: ILichChieu) => item.cinema?.idCinema === cinemaId
        );

        if (!lichChieu) lichChieu = responseData[0];

        let filteredLichChieu = { ...lichChieu };
        if (movieId && filteredLichChieu.movies) {
          filteredLichChieu.movies = filteredLichChieu.movies.filter(
            (movie: any) => movie.idPhim === movieId
          );
        }
        setSelectedLichChieu(filteredLichChieu);
      }
    } catch (error) {
      console.log("Fetch lich chieu error:", error);
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
            {/* Header rạp */}
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

            {/* Phần hiển thị suất chiếu khi mở rộng */}
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
                    <Text style={styles.titleSection}>
                      Suất chiếu ngày{" "}
                      {selectedDate?.toLocaleDateString("vi-VN")}:
                    </Text>
                    <View style={styles.timeGrid}>
                      {selectedLichChieu.movies.map((movie, mIndex) => (
                        <TouchableOpacity
                          key={mIndex}
                          style={styles.timeItem}
                          onPress={() => {
                            // ✅ Đảm bảo selectedLichChieu tồn tại trước khi push
                            if (selectedLichChieu) {
                              router.push({
                                pathname: "/booking/seat",
                                params: {
                                  // ID của chính bản ghi lịch chiếu này
                                  idLichChieu: movie.idCinemaRoomMovie,

                                  // ID Rạp lấy từ đối tượng cinema
                                  idCinema: selectedLichChieu.cinema?.idCinema,

                                  // ID Phòng lấy từ đối tượng room
                                  idRoom: selectedLichChieu.room?.idRoom,

                                  // Các thông tin hiển thị UI
                                  movieTitle: movie.tenPhim,
                                  cinemaName: cinema.name,
                                  time: movie.thoiGianBatDauChieu
                                    ? new Date(
                                        movie.thoiGianBatDauChieu
                                      ).toISOString()
                                    : "",
                                },
                              });
                            }
                          }}
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
                    Hiện rạp chưa có lịch chiếu phù hợp cho ngày này.
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
