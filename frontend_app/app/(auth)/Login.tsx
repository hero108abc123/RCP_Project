import Button from '@/components/button';
import DividerWithText from '@/components/divider-with-text';
import InputField from '@/components/input-filed';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const scheme = useColorScheme();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isDark = scheme === 'dark';
  const backgroundColor = isDark ? '#0b1220' : '#fff';
  const textColor = isDark ? '#fff' : '#000';

  const handleLogin = () => {

    router.replace('/' as any);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/image 2.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        <Text style={[styles.heading, { color: '#C64747' }]}>Đăng Nhập</Text>

        <InputField
          label="Username hoặc Email"
          placeholder="Nhập username hoặc email"
          value={userName}
          onChangeText={setUserName}
        />

        <InputField
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          showToggle
          onToggleSecure={() => setSecureTextEntry(!secureTextEntry)}
        />

        
        <View style={styles.loginBtn}>
          <Button title="Đăng nhập" onPress={handleLogin} />
        </View>

        <TouchableOpacity onPress={() => console.log('Forgot Password')}>
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <DividerWithText text="hoặc" />

        <View style={styles.registerBtn}>
          <Button
            title="Đăng Ký"
            onPress={() => router.push('/(auth)/Register')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 16,
  },
  banner: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 12,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    marginVertical: 6,
  },
  loginBtn: {
    marginTop: 8,
  },
  registerBtn: {
    marginTop: 8,
  },
  forgot: {
    color: '#C64747',
    textAlign: 'center',
    marginTop: 12,
  },
});
