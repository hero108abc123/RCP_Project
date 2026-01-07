import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ICinema } from '@/model/cinema/cinema.models';
import { getAllCinemas } from '@/api/cinema.service';


export default function CinemaList() {

  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) => {
    setOpenId(openId === id.toString() ? null : id.toString());
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
  try {
    setLoading(true);
    const res = await getAllCinemas({ pageNumber: 1, pageSize: 20 });
    console.log('API response:', res);

    setCinemas(res?.items ?? []);
  } catch (error) {
    console.log('Fetch cinema error', error);
  } finally {
    setLoading(false);
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
      {cinemas.map((cinema) => {
        const isOpen = openId === cinema.id?.toString();

        return (
          <View key={cinema.id} style={styles.card}>
            {/* HEADER */}
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggle(cinema.id!.toString())}
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

                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={() =>
                    router.push({
                      pathname: '/booking/seat',
                      params: { cinemaId: cinema.id },
                    })
                  }
                >
                  <Text style={{ color: '#1976D2', fontWeight: '600' }}>
                    Xem lịch chiếu →
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
  },

  distance: {
    fontSize: 12,
    color: '#1976D2',
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  type: {
    fontWeight: '700',
    marginBottom: 8,
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  timeItem: {
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 72,
  },

  time: {
    fontWeight: '600',
  },

  seat: {
    fontSize: 11,
    color: '#757575',
  },

  note: {
    fontSize: 11,
    color: '#757575',
    marginTop: 6,
  },
});
