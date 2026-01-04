import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function TermsScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="ĐIỀU KHOẢN SỬ DỤNG"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>1. Chấp nhận điều khoản</Text>
        <Text style={styles.text}>
          Khi sử dụng ứng dụng đặt vé xem phim, bạn đồng ý tuân thủ toàn bộ điều
          khoản và điều kiện được quy định trong văn bản này.
        </Text>

        <Text style={styles.title}>2. Tài khoản người dùng</Text>
        <Text style={styles.text}>
          Người dùng chịu trách nhiệm bảo mật thông tin tài khoản. Mọi hoạt động
          phát sinh từ tài khoản của bạn đều được xem là do bạn thực hiện.
        </Text>

        <Text style={styles.title}>3. Đặt vé & sử dụng dịch vụ</Text>
        <Text style={styles.text}>
          Vé đã đặt thành công không thể chuyển nhượng hoặc hoàn tiền, trừ các
          trường hợp đặc biệt do hệ thống hoặc rạp phim gặp sự cố.
        </Text>

        <Text style={styles.title}>4. Quyền & nghĩa vụ</Text>
        <Text style={styles.text}>
          Chúng tôi có quyền tạm ngưng hoặc chấm dứt dịch vụ nếu phát hiện hành vi
          vi phạm điều khoản sử dụng.
        </Text>

        <Text style={styles.title}>5. Thay đổi điều khoản</Text>
        <Text style={styles.text}>
          Điều khoản sử dụng có thể được cập nhật mà không cần thông báo trước.
          Việc tiếp tục sử dụng ứng dụng đồng nghĩa với việc bạn chấp nhận các
          thay đổi này.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
})
