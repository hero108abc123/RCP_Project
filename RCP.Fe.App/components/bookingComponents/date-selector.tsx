import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Hàm lấy tên thứ trong tuần bằng tiếng Việt
const getDayLabel = (date: Date, index: number) => {
  if (index === 0) return 'Hôm nay';
  const days = ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'];
  const dayName = days[date.getDay()];
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${dayName} ${day}-${month}`;
};

// Sinh mảng 7 ngày từ hôm nay
const generateWeekDates = () => {
  const result = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push({
      id: d.toISOString().slice(0,10), // YYYY-MM-DD làm id
      label: getDayLabel(d, i),
      day: d.getDate().toString().padStart(2,'0')
    });
  }
  return result;
};

export default function DateSelector() {
  const [dates, setDates] = useState(generateWeekDates());
  const [selected, setSelected] = useState(dates[0].id);

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
            <Text style={[styles.day, active && styles.active]}>{item.day}</Text>
            <Text style={[styles.label, active && styles.active]}>{item.label}</Text>
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
