import { 
  StyleSheet, Text, View, useColorScheme, Image, 
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import InputField from '@/components/input-filed'
import Button from '@/components/button'


export default function Register() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const backgroundColor = isDark ? '#000' : '#fff'

  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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

            <InputField label='Họ và tên' value={fullName} onChangeText={setFullName} placeholder='Họ và tên'/>
            <InputField label='Username' value={userName} onChangeText={setUserName} placeholder='Username' />

            <InputField 
              label='Mật khẩu'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              showToggle
              onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
              placeholder='Mật khẩu'
            />

            <InputField label='Số điện thoại' value={phoneNumber} onChangeText={setPhoneNumber} placeholder='Số điện thoại' />
            <InputField label='Email' value={email} onChangeText={setEmail} placeholder='Email' />
            <InputField label='Ngày sinh' value={birthDay} onChangeText={setBirthDay} placeholder='Ngày sinh' />

            <Button 
              title='Đăng ký' 
              onPress={() => console.log('Register')}
            />

            {loading && <ActivityIndicator size="large" color="#0000ff" />}

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({})