import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SeatItem({ code, selected, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.seat,
        { backgroundColor: selected ? '#1976D2' : '#E0E0E0' },
      ]}
    >
      <Text style={styles.text}>{code}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  seat: {
    width: 34,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  text: {
    fontSize: 10,
    color: '#000',
  },
});
