import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '../../components/themed-view'


export default function MovieSchedule() {

    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Giả lập danh sách ngày trong tháng
    const days = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        dayOfWeek: 'Sat',
        month: 11,
    }));

  const times = ['8:30', '11:00', '14:00', '18:00'];
return (
  <SafeAreaView style={styles.safeArea}>
    <ThemedView style={styles.container}>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: "#1f2937" }}>
        <Appbar.BackAction onPress={() => router.back()} color="white" />
        <Appbar.Content titleStyle={{ fontSize: 18, color: 'white' }} title="Select Date & Time" />
      </Appbar.Header>

      {/* Lưới chọn ngày */}
      <FlatList
        data={days}
        numColumns={4}
        keyExtractor={(item) => item.day.toString()}
        contentContainerStyle={styles.calendarContainer}
        renderItem={({ item }) => {
          const isSelected = selectedDate === item.day;
          return (
            <TouchableOpacity
              style={[styles.dateBox, isSelected && styles.dateBoxSelected]}
              onPress={() => setSelectedDate(item.day)}
            >
              <Text style={[styles.dayOfWeek, isSelected && styles.textSelected]}>{item.dayOfWeek}</Text>
              <Text style={[styles.dayNumber, isSelected && styles.textSelected]}>
                {item.day.toString().padStart(2, '0')}
              </Text>
              <Text style={[styles.month, isSelected && styles.textSelected]}>
                {item.month}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Khung giờ */}
      <FlatList
        data={times}
        horizontal
        keyExtractor={(item) => item}
        contentContainerStyle={styles.timeContainer}
        renderItem={({ item }) => {
          const isSelected = selectedTime === item;
          return (
            <TouchableOpacity
              style={[styles.timeBox, isSelected && styles.timeBoxSelected]}
              onPress={() => setSelectedTime(item)}
            >
              <Text style={[styles.timeText, isSelected && styles.textSelected]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Nút chọn */}
      <TouchableOpacity style={styles.chooseButton} onPress={() => router.push('/ticket/seat-select')}>
        <Text style={styles.chooseText}>Choose</Text>
      </TouchableOpacity>
    </ThemedView>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#1f2937",
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 50,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  calendarContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  dateBox: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBoxSelected: {
    backgroundColor: '#fbbf24',
  },
  dayOfWeek: {
    color: '#d1d5db',
    fontSize: 12,
  },
  dayNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  month: {
    color: '#9ca3af',
    fontSize: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  timeBox: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  timeBoxSelected: {
    backgroundColor: '#fbbf24',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  textSelected: {
    color: 'black',
    fontWeight: 'bold',
  },
  chooseButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    margin: 20,
  },
  chooseText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
})