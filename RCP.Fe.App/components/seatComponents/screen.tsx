// components/seatComponents/screen.tsx
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ScreenIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>
        <View style={styles.glowEffect} />
        <View style={styles.screenLine} />
      </View>
      <Text style={styles.text}>MÀN HÌNH CHIẾU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  screenWrapper: {
    width: SCREEN_WIDTH - 60,
    alignItems: "center",
    position: "relative",
  },
  glowEffect: {
    position: "absolute",
    top: 0,
    width: "90%",
    height: 15,
    backgroundColor: "#E3F2FD",
    opacity: 0.5,
    borderRadius: 100,
  },
  screenLine: {
    width: "100%",
    height: 6,
    backgroundColor: "#1976D2",
    borderRadius: 3,
  },
  text: {
    marginTop: 8,
    color: "#9E9E9E",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
});