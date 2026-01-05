import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ComboItem({ combo }: any) {
  return (
    <View style={styles.item}>
      <Text style={{ flex: 1 }}>{combo.name}</Text>
      <TouchableOpacity style={styles.btn}><Text>-</Text></TouchableOpacity>
      <Text>0</Text>
      <TouchableOpacity style={styles.btn}><Text>+</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginBottom: 8, borderRadius: 10 },
  btn: { paddingHorizontal: 10 },
});
