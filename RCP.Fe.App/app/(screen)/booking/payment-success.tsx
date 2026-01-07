import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router';
import PaymentHeader from '@/components/paymentComponents/header-payment';

export default function PaymentSuccess() {

    const router = useRouter();

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} color="white" />
        <Appbar.Content
          title="VÉ CỦA BẠN"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>
      <View>
        <PaymentHeader/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})