import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function PolicyScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Chính sách bảo mật"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>1. Bảo mật thông tin</Text>
        <Text style={styles.text}>
          Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng theo quy định pháp luật.
        </Text>

        <Text style={styles.title}>2. Thanh toán</Text>
        <Text style={styles.text}>
          Mọi giao dịch thanh toán được mã hóa và xử lý qua cổng thanh toán an toàn.
        </Text>

        <Text style={styles.title}>3. Chia sẻ dữ liệu</Text>
        <Text style={styles.text}>
          Chúng tôi không chia sẻ thông tin cá nhân cho bên thứ ba khi chưa có sự đồng ý của người dùng.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
    lineHeight: 20,
  },
})
