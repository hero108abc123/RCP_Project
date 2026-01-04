import { View, Text, StyleSheet } from 'react-native';

export default function ScreenIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>MÀN HÌNH CHIẾU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    width: '80%',
    height: 4,
    backgroundColor: '#B0BEC5',
    borderRadius: 10,
  },
  text: {
    marginTop: 6,
    color: '#999',
    fontSize: 12,
  },
});
