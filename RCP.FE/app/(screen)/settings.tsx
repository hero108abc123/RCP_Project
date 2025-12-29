<<<<<<< HEAD
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function SettingsScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="CÀI ĐẶT"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <SettingItem
          icon="help-circle-outline"
          title="Hỏi đáp"
          onPress={() => router.push('../other/faq')}
        />
        <SettingItem
          icon="file-document-outline"
          title="Điều khoản sử dụng"
          onPress={() => router.push('/terms')}
        />
        <SettingItem
          icon="shield-check-outline"
          title="Chính sách thanh toán & bảo mật"
          onPress={() => router.push('/policy')}
        />
      </View>
    </View>
  )
}

/* ---------- Item ---------- */
function SettingItem({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color="#0B4A8B" />
      <Text style={styles.text}>{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  )
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
})
=======
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function SettingsScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction color="#FFFFFF"  onPress={() => router.back()} />
        <Appbar.Content
          title="CÀI ĐẶT"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <SettingItem
          icon="help-circle-outline"
          title="Hỏi đáp"
          onPress={() => router.push('../other/faq')}
        />
        <SettingItem
          icon="file-document-outline"
          title="Điều khoản sử dụng"
          onPress={() => router.push('/terms')}
        />
        <SettingItem
          icon="shield-check-outline"
          title="Chính sách thanh toán & bảo mật"
          onPress={() => router.push('/policy')}
        />
      </View>
    </View>
  )
}

/* ---------- Item ---------- */
function SettingItem({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color="#0B4A8B" />
      <Text style={styles.text}>{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  )
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
})
>>>>>>> 22759d054011644f1cdb351808fb68db1e3aaaed
