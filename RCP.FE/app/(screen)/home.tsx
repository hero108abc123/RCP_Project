import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTabs from '../../components/HomeComponents/header-tabs'

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#09131f' }}>
      <HeaderTabs />
        <View style={{ backgroundColor: '#09131f' }}>
        </View>
      
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderRadius: 50,
  },
});