import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ICinema } from '@/model/cinema/cinema.models';
import { getAllCinemas } from '@/api/cinema.service';
import { ILichChieu, IMovieLichChieu } from '@/model/cinema/lichchieu.models';
import { getAllCinemas as getSchedules } from '@/api/lichchieu.service';
import ShowtimeRow from '@/components/bookingComponents/showtime-row';

export default function CinemaList() {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<Record<string, ILichChieu[]>>({}); // key = cinemaId

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    try {
      setLoading(true);
      const res = await getAllCinemas({ pageNumber: 1, pageSize: 20 });
      setCinemas(res.items ?? []);
    } catch (err) {
      console.log('Fetch cinema error', err);
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (cinemaId: string) => {
    setOpenId(openId === cinemaId ? null : cinemaId);

    // Load lịch chiếu nếu chưa có
    if (!schedules[cinemaId]) {
      try {
        const res = await getSchedules({ pageNumber: 1, pageSize: 50, idCinema: [Number(cinemaId)] });
        setSchedules(prev => ({ ...prev, [cinemaId]: res.items ?? [] }));
      } catch (err) {
        console.log('Fetch schedules error', err);
      }
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0B4A8B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cinemas.map(cinema => {
        const cinemaId = cinema.id?.toString() ?? '';
        const isOpen = openId === cinemaId;
        const cinemaSchedules = schedules[cinemaId] ?? [];

        return (
          <View key={cinemaId} style={styles.card}>
            {/* HEADER */}
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggle(cinemaId)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.name}>{cinema.name}</Text>
                <Text style={styles.distance}>
                  {cinema.district}, {cinema.city}
                </Text>
              </View>
              <MaterialIcons
                name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
              />
            </TouchableOpacity>

            {/* CONTENT */}
            {isOpen && (
              <View style={styles.content}>
                <Text style={styles.note}>
                  • Số phòng chiếu: {cinema.soLuongPhongChieu ?? 'Đang cập nhật'}
                </Text>

                {/* Nếu không có lịch chiếu */}
                {cinemaSchedules.length === 0 ? (
                  <Text style={{ marginTop: 10, fontStyle: 'italic', color: '#777' }}>
                    Không có lịch chiếu
                  </Text>
                ) : (
                  cinemaSchedules.map(schedule =>
                    schedule.movies.map((movie: IMovieLichChieu) => {
                      const times = movie.thoiGianBatDauChieu
                        ? [
                            {
                              time: new Date(movie.thoiGianBatDauChieu).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              }),
                              seat: 0,
                            },
                          ]
                        : [];

                      return (
                        <ShowtimeRow
                          key={movie.idPhim}
                          label={movie.tenPhim ?? ''}
                          times={times}
                          cinemaName={cinema.name ?? ''}
                          movieId={movie.idPhim!.toString()}
                          date={movie.ngayKhoiChieu?.toString() ?? ''}
                        />
                      );
                    })
                  )
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '600' },
  distance: { fontSize: 12, color: '#1976D2', marginTop: 2 },
  content: { paddingHorizontal: 14, paddingBottom: 14 },
  note: { fontSize: 11, color: '#757575', marginTop: 6 },
});
