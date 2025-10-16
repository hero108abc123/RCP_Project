import Button from '@/components/button'
import InputField from '@/components/input-filed'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { register } from '../../api/auth-api'

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

    const handleRegister = async() => {
      if (!fullName || !userName || !email || !password) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      } 

      try {
        setLoading(true);
        const res = await register(fullName, userName, email, password);
        Alert.alert('Đăng ký thành công', 'Vui lòng đăng nhập');
        router.replace('/(auth)/Login');
      } catch (err) {
        console.error(err);
        Alert.alert('Đăng ký thất bại', 'Vui lòng thử lại');
      } finally {
        setLoading(false);
      }
    };





  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            label='Mật khẩu'
            value={password}
            onChangeText={setPassword}
            placeholder='Mật khẩu'
            secureTextEntry={secureTextEntry}
            showToggle
            onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
          />

        <Button title='Đăng ký' onPress={() => {
          handleRegister();
          console.log('Register');
        }} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />} 
        {/* hiển thị vòng loading khi gọi API */}



      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})