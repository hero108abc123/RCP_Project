import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cinemas } from '../../app/(screen)/cinema/data';

export default function CinemaList() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {cinemas.map((cinema) => {
        const isOpen = openId === cinema.id;

        return (
          <View key={cinema.id} style={styles.card}>
            {/* HEADER */}
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggle(cinema.id)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.name}>{cinema.name}</Text>
                <Text style={styles.distance}>{cinema.distance}</Text>
              </View>

              <MaterialIcons
                name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
              />
            </TouchableOpacity>

            {/* CONTENT */}
            {isOpen && (
              <View style={styles.content}>
                {cinema.schedules.map((schedule) => (
                  <View key={schedule.type} style={{ marginBottom: 12 }}>
                    <Text style={styles.type}>{schedule.type}</Text>

                    <View style={styles.timeGrid}>
                      {schedule.times.map((t) => (
                        <TouchableOpacity
                          key={t.time}
                          style={styles.timeItem}
                          onPress={() =>
                            console.log(
                              cinema.name,
                              schedule.type,
                              t.time
                            )
                          }
                        >
                          <Text style={styles.time}>{t.time}</Text>
                          <Text style={styles.seat}>{t.seat} trống</Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.note}>
                      • Suất chiếu muộn từ 22h00
                    </Text>
                  </View>
                ))}
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
