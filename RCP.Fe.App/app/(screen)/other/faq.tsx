import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'

const DATA = [
  {
    q: 'Làm sao để đặt vé xem phim?',
    a: 'Bạn chọn phim, suất chiếu, ghế và thanh toán trực tiếp trên ứng dụng.',
  },
  {
    q: 'Voucher sử dụng như thế nào?',
    a: 'Voucher được áp dụng ở bước thanh toán nếu còn hiệu lực.',
  },
  {
    q: 'Có thể hoàn tiền không?',
    a: 'Vé đã thanh toán không thể hoàn tiền trừ trường hợp sự cố hệ thống.',
  },
]

export default function FAQScreen() {
  const router = useRouter()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction color='white' onPress={() => router.back()} />
        <Appbar.Content title="HỎI ĐÁP" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <View style={{ padding: 12 }}>
        {DATA.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.question}
              onPress={() => setOpen(open === index ? null : index)}
            >
              <Text style={styles.qText}>{item.q}</Text>
              <MaterialCommunityIcons
                name={open === index ? 'chevron-up' : 'chevron-down'}
                size={24}
              />
            </TouchableOpacity>

            {open === index && <Text style={styles.answer}>{item.a}</Text>}
          </View>
        ))}
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
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qText: {
    fontSize: 15,
    fontWeight: '700',
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
})
