import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

import PaymentHeader from '@/components/paymentComponents/header-payment';
import ComboList from '@/components/paymentComponents/combo-list';
import PaymentSummary from '@/components/paymentComponents/payment-summary';
import PaymentMethod from '@/components/paymentComponents/payment-method';
import ButtonCustom from '@/components/button';

export default function PaymentScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.BackAction onPress={() => router.back()} color="white" />
        <Appbar.Content
          title="THANH TOÁN"
          titleStyle={{ color: '#fff', fontWeight: '700' }}
        />
      </Appbar.Header>

      <ScrollView>
        <PaymentHeader />
        <ComboList />
        <PaymentSummary />
        <PaymentMethod />
        <ButtonCustom
          title="THANH TOÁN"
          textColor='white'
          borderRadius={40}
          marginVertical={30}
          paddingVertical={15}
          backgroundColor='#0B4A8B'
          onPress={() => router.push('./payment-success')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
});
