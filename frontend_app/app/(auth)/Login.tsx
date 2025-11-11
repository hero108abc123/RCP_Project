import { auth } from '@/api/auth'
import Button from '@/components/button'
import DividerWithText from '@/components/divider-with-text'
import InputField from '@/components/input-filed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Login() {

  const scheme = useColorScheme() // 'light' hoặc 'dark'
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [loading, setLoading] = useState(false)


  const isDark = scheme === 'dark'

  const backgroundColor = isDark ? '#000' : '#fff'
  const textColor = isDark ? '#fff' : '#000'

  const handleLogin = async () => {
    if (!userName || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true);
    try {
      const data = await auth.login(userName, password);

      // Lưu token để sử dụng cho các request tiếp theo
      await AsyncStorage.setItem("access_token", data.access_token);
      await AsyncStorage.setItem("refresh_token", data.refresh_token);

      Alert.alert("Thành công", "Đăng nhập thành công!");
      router.replace("/home"); // điều hướng sang trang chính

    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      Alert.alert("Đăng nhập thất bại", "Sai tài khoản hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };


    
  

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

        <Button
          title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          onPress={() => {
            if (loading) return;
            handleLogin();
          }}
        />
        {loading && (
          <ActivityIndicator size="large" color="#C64747" style={{ marginTop: 10 }} />
        )}
        <TouchableOpacity onPress={() => console.log('Forgot Password')}>
          <Text>Quên mật khẩu?</Text>
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