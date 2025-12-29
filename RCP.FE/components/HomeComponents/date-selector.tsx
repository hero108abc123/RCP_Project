import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

const dates = [
  { id: '29', label: 'Hôm nay' },
  { id: '30', label: '12-Th 3' },
  { id: '31', label: '12-Th 4' },
  { id: '01', label: '01-Th 5' },
];

export default function DateSelector() {
  const [selected, setSelected] = useState('29');

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
      data={dates}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const active = item.id === selected;
        return (
          <TouchableOpacity
            onPress={() => setSelected(item.id)}
            style={styles.item}
          >
            <Text style={[styles.day, active && styles.active]}>
              {item.id}
            </Text>
            <Text style={[styles.label, active && styles.active]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: { alignItems: 'center', marginRight: 20 },
  day: { fontSize: 22, color: '#9E9E9E' },
  label: { fontSize: 12, color: '#9E9E9E' },
  active: { color: '#F44336', fontWeight: '700' },
});
