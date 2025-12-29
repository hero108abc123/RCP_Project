import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const cinemas = [
  'Beta TRMall Phú Quốc',
  'Beta Giải Phóng',
  'Beta Mỹ Đình',
  'Beta Tây Sơn',
  'Beta Thanh Xuân',
];

export default function CinemaList() {
  return (
    <View style={{ padding: 16 }}>
      {cinemas.map((name) => (
        <TouchableOpacity key={name} style={styles.item}>
          <Text style={styles.text}>{name}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  text: { fontSize: 15, fontWeight: '500' },
});
