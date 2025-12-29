import ShowtimeRow from '@/components/bookingComponents/showtime-row';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CinemaItem({ cinema, movieId, date }: any) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.name}>{cinema.name}</Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={22}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.body}>
          {Object.entries(cinema.showtimes).map(([label, times]) => (
            <ShowtimeRow
              key={label}
              label={label}
              times={times}
              cinemaName={cinema.name}
              movieId={movieId}
              date={date}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
  },
  distance: {
    color: '#1976D2',
    marginRight: 6,
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  note: {
    marginTop: 8,
    fontSize: 12,
    color: '#757575',
  },
});
