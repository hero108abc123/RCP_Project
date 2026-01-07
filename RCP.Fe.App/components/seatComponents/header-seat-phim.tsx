// components/seatComponents/header-seat-phim.tsx
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  movieTitle?: string;
  moviePoster?: string;
  cinemaName?: string;
  date?: string;
  time?: string;
  duration?: string;
  format?: string;
};

export default function SeatHeader({
  movieTitle = "Tên phim",
  moviePoster,
  cinemaName,
  date,
  time,
  duration,
  format,
}: Props) {
  // Format thông tin phụ đề
  const infoParts = [date, time, duration ? `${duration} phút` : null]
    .filter(Boolean)
    .join(" | ");

  return (
    <ImageBackground
      source={{
        uri: moviePoster || "https://picsum.photos/800/400?blur=2",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {format && (
            <View style={styles.formatBadge}>
              <Text style={styles.formatText}>{format}</Text>
            </View>
          )}

          <Text style={styles.title} numberOfLines={2}>
            {movieTitle}
          </Text>

          <View style={styles.subtitleRow}>
            {cinemaName && <Text style={styles.cinemaName}>{cinemaName}</Text>}
            {infoParts && <Text style={styles.subtitle}>{infoParts}</Text>}
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  formatBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(25, 118, 210, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  formatText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitleRow: {
    flexDirection: "column",
    gap: 2,
  },
  cinemaName: {
    color: "#BBDEFB",
    fontSize: 13,
    fontWeight: "600",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 13,
    fontWeight: "500",
  },
});