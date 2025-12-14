import { Ionicons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/themed-view';

export default function TicketDetail() {

  const router = useRouter();
  const [methodPay, setMethodPay] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}> 
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#f7f4f4ff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ticket Detail</Text>
          <View style={{ width: 24 }}></View>          
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Payment method */}
          <View>
            <Text style={styles.textTitle}>Phương thức thanh toán</Text>
            <View >
              <RadioButton.Group onValueChange={value => {
                // logic cập nhật method Phương thức thanh toán
                setMethodPay(value);  
                console.log('Selected payment method:', value);
              }} value={methodPay}>
                <View style={styles.methodPay}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="credit-card" />
                    <Text style={styles.contentText}>Thẻ tín dụng</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="paypal" />
                    <Text style={styles.contentText}>PayPal</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          {/* Ticket Info */}
          <View>
            <View>
              <Text style={styles.textTitle}> Ảnh và tiêu đề</Text>
              <View>
                <Text style={styles.contentText}>[Image]</Text> {/* thay bằng logic lấy ảnh từ dữ liệu vé */}
                <Text style={styles.contentText}>[Title]</Text>
              </View>  
            </View>
          </View>
          <View>
            <Text style={styles.textTitle}>Thông tin vé</Text>
            <View style={styles.infoVIew}>
              <Text style={styles.contentText}>[Date]</Text>
              <Text style={styles.contentText}>[Seat Number]</Text>
            </View>

            <View style={styles.infoVIew}>
              <Text style={styles.contentText}>[Time]</Text>
              <Text style={styles.contentText}>[Thời gian đặt vé]</Text>
            </View>
            <View style={styles.infoVIew}>
              <Text style={styles.contentText}>[Time]</Text>
              <Text style={styles.contentText}>[Thời gian đặt vé]</Text>
            </View>

          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#0b1220' },
  
  header: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#ffffffff' 
  },
  content: {
    paddingBottom: 30,
    color: '#ffffffff',
    marginTop: 30, width: '100%' 
  },
  textTitle: {
    color: '#ffffffff',
    fontSize: 18,
  },
  contentText: {
    color: '#ffffffff',
  },
  methodPay:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-evenly',
  },
  infoVIew:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10
  }
})