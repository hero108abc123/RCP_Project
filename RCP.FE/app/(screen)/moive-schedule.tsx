import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabViewScene from '../(bar)/tab-view-movie'



export default function MovieSchedule() {
  return (
    <SafeAreaView style={{ flex: 1}}> 
      <View>
        <Appbar.Header
        style={{
          backgroundColor: '#FFFFFF',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
        }}
        >
          <TouchableOpacity onPress={() => console.log('Go to profile')}>
            <Avatar.Text
              size={36}
              label="T"
              style={{ backgroundColor: '#E0E0E0' }}
            />
          </TouchableOpacity>

          {/* User info */}
          <Appbar.Content
            title={
              <View style={{ margin: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 16 }}>
                Chào Ban
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#1976D2', fontWeight: '600' }}>
                    MEMBER
                  </Text>
                  <Text style={{ marginHorizontal: 6, color: '#FFD54F' }}>⭐</Text>
                  <Text style={{ fontSize: 12 }}>100</Text>
                </View>
              
              </View>
            }
          />

          {/* Logo / Action */}
          <Appbar.Action
            icon="bell-outline"
            onPress={() => console.log('Notification')}
          />
        </Appbar.Header>
        
        <View style={{ height: '90%' }}>
          <TabViewScene />
        </View>





      </View>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  
})