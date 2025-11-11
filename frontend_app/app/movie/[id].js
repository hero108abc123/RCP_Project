
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={{ color: '#fff' }}>← Quay lại</Text>
      </TouchableOpacity>

      <Image
        source={require('@/assets/images/terminator1.jpg')}
        style={styles.poster}
      />

      <View style={{ padding: 12 }}>
        <Text style={styles.title}>Movie ID: {id}</Text>
        <Text style={styles.subtitle}>Trang chi tiết (placeholder)</Text>

        <TouchableOpacity
          style={styles.ticketBtn}
          onPress={() => {
            router.push('/ticket/movie-schedule');
            console.log('Đi đến trang chi tiết vé');
          }
          }>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Get Ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220' },
  backBtn: { padding: 12 },
  poster: { width: '100%', height: 320, resizeMode: 'cover' },
  title: { color: '#fff', fontWeight: '700', fontSize: 18, marginBottom: 8 },
  subtitle: { color: '#D1D5DB' },
  ticketBtn: {
    marginTop: 20,
    backgroundColor: '#FB923C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
