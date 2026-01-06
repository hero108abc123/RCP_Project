import Button from '@/components/button'
import DividerWithText from '@/components/divider-with-text'
import InputField from '@/components/input-filed'
import { ILogin } from '@/model/auth/auth.models'
import api from "@/utils/axios"
import * as SecureStore from 'expo-secure-store'

import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import * as yup from 'yup'

import { $login, setUser } from '@/redux/slices/userSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'


const schema = yup
  .object({
    username: yup
      .string()
      .required('Tên đăng nhập không được bỏ trống')
      .max(50, 'Tên đăng nhập không được vượt quá 50 ký tự'),
    password: yup
      .string()
      .required('Mật khẩu không được bỏ trống')
      .max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
  })
  .required()

type FormData = yup.InferType<typeof schema>

function Login() {
  const scheme = useColorScheme()
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const isDark = scheme === 'dark'
  const backgroundColor = isDark ? '#000' : '#fff'
  const textColor = isDark ? '#fff' : '#000'

  const handleLogin = async (formData: FormData) => {
    const body: ILogin = {
      username: formData.username,
      password: formData.password,
    }

    setLoading(true)
    try {
      const data: any = await dispatch($login(body)).unwrap()

      await SecureStore.setItemAsync("accessToken", data.access_token)
      await SecureStore.setItemAsync("refreshToken", data.refresh_token)
      console.log(1111, data.access_token)
      
      const meResponse = await api.get('api/app/user/me')
      const userData = meResponse.data
      
      dispatch(
        setUser({
          id: userData.id,
          email: userData.email,
          userName: userData.userName,
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          birthDay: userData.birthDay,
          roles: userData.roles,
          $login: {},
        }),
      )

      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
      })
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error)
      Alert.alert("Đăng nhập thất bại", "Sai tài khoản hoặc mật khẩu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View>
        <Image
          source={require("../../assets/images/image 12.png")}
          style={{ width: "100%", height: 250, resizeMode: "contain" }}
        />

        <Text style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
            color: '#C64747'
          }}>ĐĂNG NHẬP</Text>

        <View style={{ padding: 16, margin: 10 }}>
          

          <InputField 
            label='Username hoặc Email'
            placeholder='Nhập username hoặc email'
            value={userName}
            onChangeText={setUserName}
          />

          <InputField
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            showToggle
            onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
          />
        <View style={{ gap: 12, marginTop: 60, margin: 30 }}>
          <Button
            title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            textColor='white'
            fontSize={20}
            onPress={() => {
              try {
                console.log("🔵 Bắt đầu điều hướng...");
                router.replace('/(bar)/bottom-bar' as any );
                console.log("✅ Điều hướng thành công");
              } catch (error) {
                console.error("❌ Lỗi điều hướng:", error);
                Alert.alert("Lỗi", JSON.stringify(error));
              }
            }}
          />
          
          {loading && (
            <ActivityIndicator size="large" color="#C64747" style={{ marginTop: 10 }} />
          )}
          
          <TouchableOpacity onPress={() => console.log('Forgot Password')}>
            <Text style={{textAlign: "center"}}>Quên mật khẩu?</Text>
          </TouchableOpacity> 

          <DividerWithText text="hoặc" />

          <Button 
            title="Đăng Ký" 
            textColor='white'
            fontSize={20}
            onPress={() => {
              router.push('/register' as any);
              console.log("register")
            }}
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  color: {
    color: 'white',
  },
})