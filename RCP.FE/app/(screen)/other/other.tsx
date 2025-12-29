import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function OtherScreen() {
  return (
    <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
            <Appbar.Content title="KHÁC" titleStyle={{ color: '#fff', fontWeight: '700' }} />
        </Appbar.Header>
      <Text style={{alignContent: 'center'}}>Không có dữ liệu hiển thị</Text>
    </View>
  )
}

const styles = StyleSheet.create({})