import Button from '@/components/button'
import DividerWithText from '@/components/divider-with-text'
import InputField from '@/components/input-filed'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {

  const scheme = useColorScheme() // 'light' hoặc 'dark'
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)


  const isDark = scheme === 'dark'

  const backgroundColor = isDark ? '#000' : '#fff'
  const textColor = isDark ? '#fff' : '#000'


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View>
        <Image
          source={require("D:/RCP_Project/frontend_app/assets/images/image 2.png")}
          style={{ width: "100%", height: 250, resizeMode: "cover" }}
        />
        <Text style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          marginVertical: 12,
          color: '#C64747'
        }}>Đăng Nhập</Text>

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

        <Button title="Đăng nhập" onPress={() => console.log("Login")} />

        <TouchableOpacity onPress={() => console.log("Forgot Password")}>
          <Text style={{ color: '#C64747', textAlign: 'center', marginTop: 12 }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <DividerWithText text="hoặc" />

        <Button 
          title="Đăng Ký" 
          onPress={() => {
            console.log("Register");
            router.push('/(auth)/Register');
          }}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  color: {
    color: 'white',
  },
})