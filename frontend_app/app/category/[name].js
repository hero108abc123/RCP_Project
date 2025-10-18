import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Category() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}><Text>← Quay lại</Text></TouchableOpacity>
      <Text style={styles.title}>Category: {name}</Text>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/movie/1')}>
        <Text style={{ color: '#fff' }}>Sample movie in {name} (bấm tới detail)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', padding: 12 },
  title: { color: '#fff', fontWeight: '700', fontSize: 18, marginBottom: 12 },
  item: { backgroundColor: '#1f2937', padding: 12, borderRadius: 8 }
});
