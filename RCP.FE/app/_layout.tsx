import { Providers } from '@/redux/providers'
import { clearUser, setUser } from '@/redux/slices/userSlice'
import { AppDispatch } from '@/redux/store'
import '@/styles/global.css'
import api from '@/utils/axios'
import { Slot, useRouter, useSegments } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import 'react-native-toast-message/lib/src/Toast'
import { useDispatch } from 'react-redux'

function RootLayoutNav() {
//   const router = useRouter()
//   const segments = useSegments()
//   const dispatch = useDispatch<AppDispatch>()
//   const [loading, setLoading] = useState(true)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   useEffect(() => {

//     if (loading) return
//     const inAuthGroup = segments[0] === '(auth)'
//     if (!isAuthenticated && !inAuthGroup) {
//       router.replace('/(auth)/login' as any)
//     } else if (isAuthenticated && inAuthGroup) {
//         router.replace('/(tabs)/home' as any)
//     }
//   }, [isAuthenticated, segments, loading])

//   const checkAuth = async () => {
//     try {
//       const accessToken = await SecureStore.getItemAsync('accessToken')
//       if (!accessToken) {
//         setIsAuthenticated(false)
//         setLoading(false)
//         return
//       }
//       const response = await api.get('api/app/user/me')
//       const userData = response.data
//       console.log('👤 userData:', userData)
//       dispatch(
//         setUser({
//           id: userData.id,
//           email: userData.email,
//           userName: userData.userName,
//           fullName: userData.fullName,
//           phoneNumber: userData.phoneNumber,
//           birthDay: userData.birthDay,
//           roles: userData.roles,
//           $login: {},
//         }),
//       )
//       setIsAuthenticated(true)
//     } catch (error) {
//       console.error('❌ Token verification failed', error)
//       await SecureStore.deleteItemAsync('accessToken')
//       await SecureStore.deleteItemAsync('refreshToken')
//       dispatch(clearUser())
//       setIsAuthenticated(false)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Checking auth...</Text>
//       </View>
//     )
//   }

  return (
    <>  
      <Slot />
      <Toast />
    </>
  )
}

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})