import Button from '@/components/button'
import InputField from '@/components/input-filed'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '@/api/auth'

export default function Register() {    

    const [fullName, setFullName ] = useState('')
    const [userName, setUserName ] = useState('')
    const [phoneNumber, setPhoneNumber ] = useState('')
    const [birthDay, setBirthDay ] = useState('') // Thêm trường birthDay nếu cần
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()

    const handleRegister = async () => {
      if (!fullName || !userName || !email || !password) {
        Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin cần thiết.');
        return;
      }

      try {
        setLoading(true);

        console.log("Gửi yêu cầu đăng ký...");
        const res = await register(fullName, userName, email, phoneNumber, birthDay, password);

        console.log("Đăng ký thành công:", res);
        Alert.alert('Đăng ký thành công', 'Bạn có thể đăng nhập ngay bây giờ.');
        router.replace('/(auth)/Login');
      } catch (err: any) {
        console.log("Lỗi đăng ký:", err.message);
        if (err.response) {
          console.log("Chi tiết lỗi:", err.response.data);
        }
        Alert.alert('Đăng ký thất bại', 'Kiểm tra lại thông tin và thử lại.');
      } finally {
        setLoading(false);
      }
    };




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          
        <View>
          <Image source={require('../../assets/images/image 3.png')} 
            style={{ width: '100%', height: 250, resizeMode: 'cover' }}
          />
          {/* borderRadius: 12 */}
          <Text style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 12,
              color: '#C64747'
          }}>Đăng Ký</Text>

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
              placeholder='Mật khẩu'
              secureTextEntry={secureTextEntry}
              showToggle
              onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
            />
            <InputField 
              label='Số điện thoại'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder='Số điện thoại'
            />
          
          <InputField 
              label='Email'
              value={email}
              onChangeText={setEmail}
              placeholder='Email'
            />



          <InputField
            label="Ngày sinh"
            value={birthDay}
            onChangeText={setBirthDay}
            placeholder="YYYY-MM-DD"
          />


          <Button title='Đăng ký' onPress={() => {
            handleRegister();
            console.log('Register');
          }} />
          {loading && <ActivityIndicator size="large" color="#0000ff" />} 
          {/* hiển thị vòng loading khi gọi API */}



        </View>
              </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})