import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper'

export default function Settings() {

    const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Header */}
        <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
            <Appbar.BackAction color='white' onPress={() => router.back()} />
            <Appbar.Content
            title="CÀI ĐẶT"
            titleStyle={{ color: '#fff', fontWeight: '700' }}
            />
        </Appbar.Header>
        <View style={{ padding: 12 }}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => {
                    router.push('/(screen)/other/policy')
                }}>
                    <Text style={styles.text}>Chính sách</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => {
                    router.push('/(screen)/other/terms')
            }}>
                <Text style={styles.text}>Điều khoản sử dụng</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        padding: 12,
  },

    text: {
    fontSize: 15,
    fontWeight: '700',
  },
})