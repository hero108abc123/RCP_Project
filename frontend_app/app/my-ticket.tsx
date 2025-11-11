import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyTicket() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là ticket của bạn</Text>

      <View style={styles.card}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>TERMINATOR 3</Text>
        <Text style={{ color: '#ddd', marginTop: 6 }}>Ngày: 2025-11-01</Text>
        <Text style={{ color: '#ddd' }}>Ghế: D5</Text>

        <TouchableOpacity style={styles.btn} onPress={() => {
          console.log('Xem Vé pressed');
          router.push('/ticket/ticket-detail');
        }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Xem Vé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', padding: 20 },
  title: { color: '#FB923C', fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { backgroundColor: '#1f2937', padding: 16, borderRadius: 12 },
  btn: { marginTop: 12, backgroundColor: '#FB923C', padding: 10, borderRadius: 8, alignItems: 'center' },
});
