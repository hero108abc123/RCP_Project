import { 
  StyleSheet, Text, View, useColorScheme, Image, 
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'

import InputField from '@/components/input-filed'
import Button from '@/components/button'
import { IRegister } from '@/model/auth/auth.models'
import { $register } from '@/redux/slices/userSlice'
import { AppDispatch } from '@/redux/store'

export default function Register() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const backgroundColor = isDark ? '#000' : '#fff'

  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthDay, setBirthDay] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios')
    if (selectedDate) {
      setBirthDay(selectedDate)
    }
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleRegister = async () => {
    if (!fullName || !userName || !email || !phoneNumber || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin')
      return
    }

    const payload: IRegister = {
      username: userName,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      birthDay: birthDay,
      password: password,
    }

    setLoading(true)
    try {
      await dispatch($register(payload)).unwrap()
      
      Toast.show({
        type: 'success',
        text1: 'Đăng ký thành công',
      })

      Alert.alert('Thành công', 'Đăng ký tài khoản thành công!', [
        {
          text: 'OK',
          onPress: () => router.push('/login' as any)
        }
      ])
    } catch (error: any) {
      console.error("❌ Lỗi đăng ký:", error)
      Alert.alert('Đăng ký thất bại', error?.message || 'Vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          
          <Image
            source={require("../../assets/images/image 2.png")}
            style={{ width: "100%", height: 250, resizeMode: "cover" }}
          />

          <View style={{ padding: 16 }}>
            <Text style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 12,
              color: '#C64747'
            }}>
              Đăng Ký
            </Text>

            <InputField 
              label='Họ và tên' 
              value={fullName} 
              onChangeText={setFullName} 
              placeholder='Họ và tên'
            />

            <InputField 
              label='Username' 
              value={userName} 
              onChangeText={setUserName} 
              placeholder='Username' 
            />

            <InputField 
              label='Mật khẩu'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              showToggle
              onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
              placeholder='Mật khẩu'
            />

            <InputField 
              label='Số điện thoại' 
              value={phoneNumber} 
              onChangeText={setPhoneNumber} 
              placeholder='Số điện thoại'
              keyboardType='phone-pad'
            />

            <InputField 
              label='Email' 
              value={email} 
              onChangeText={setEmail} 
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '500', 
                marginBottom: 8,
                color: isDark ? '#fff' : '#000'
              }}>
                Ngày sinh
              </Text>
              <Button 
                title={formatDate(birthDay)}
                onPress={() => setShowDatePicker(true)}
                style={{ 
                  backgroundColor: isDark ? '#333' : '#f0f0f0',
                  borderWidth: 1,
                  borderColor: isDark ? '#555' : '#ddd'
                }}
                textStyle={{ color: isDark ? '#fff' : '#000' }}
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={birthDay}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}

            <Button 
              title={loading ? 'Đang đăng ký...' : 'Đăng ký'}
              textColor='white'
              fontSize={20}
              onPress={handleRegister}
              disabled={loading}
            />

            {loading && (
              <ActivityIndicator size="large" color="#C64747" style={{ marginTop: 16 }} />
            )}

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})