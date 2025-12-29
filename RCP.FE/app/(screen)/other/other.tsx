import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function OtherScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.Content
          title="KHÁC"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      {/* Grid */}
      <View style={styles.container}>
        <Item icon="ticket-percent" label="Voucher miễn phí" />
        <Item icon="movie-open" label="Rạp phim" />
        <Item icon="account-star" label="Thành viên Beta" />
        <Item icon="bell" label="Thông báo" />
        <Item icon="briefcase" label="Tuyển dụng" />
        <Item
          icon="cog"
          label="Cài đặt"
          onPress={() => router.push('/settings')}
        />
      </View>
    </View>
  )
}

/* ---------- Item Component ---------- */

function Item({
  icon,
  label,
  onPress,
}: {
  icon: any
  label: string
  onPress?: () => void
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}   // không có onPress thì không bấm
    >
      <MaterialCommunityIcons name={icon} size={36} color="#0B4A8B" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
})
