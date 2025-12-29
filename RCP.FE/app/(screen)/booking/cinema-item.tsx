import ShowtimeRow from '@/components/bookingComponents/showtime-row';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ShowTime = {
  time: string;
  seat: number;
};

type Cinema = {
  name: string;
  showtimes: {
    [key: string]: ShowTime[];
  };
};

type Props = {
  cinema: Cinema;
  movieId: string;
  date: string;
};

export default function CinemaItem({ cinema, movieId, date }: Props) {
  const [open, setOpen] = useState(false);

  // Validate data
  if (!cinema || !cinema.name || !cinema.showtimes) {
    console.warn('Invalid cinema data:', cinema);
    return null;
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{cinema.name}</Text>
        </View>
        <MaterialIcons
          name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#666"
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
  },
});