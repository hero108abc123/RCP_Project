import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTabs from '../../components/HomeComponents/header-tabs'

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#09131f' }}>
      <View style={styles.container}>
        <HeaderTabs />
      </View>
      
        <View style={{ backgroundColor: '#09131f' }}>
        </View>
      
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});