import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";

import CinemaList from "@/app/(screen)/cinema/cinema-list";
import DateSelector from "@/components/bookingComponents/date-selector";

type MovieParams = {
  id: string;
  title: string;
  poster: string;
  duration: string;
  genre?: string;
};

export default function MovieBooking() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ✅ Lấy cả movie object và movieId
  const movie = params.movie ? JSON.parse(params.movie as string) : null;
  const movieId = params.movieId as string;

  if (!movie || !movieId) {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: "#0B4A8B" }}>
          <Appbar.BackAction onPress={() => router.back()} color="white" />
          <Appbar.Content
            title="ĐẶT VÉ THEO PHIM"
            titleStyle={{ color: "#fff", fontWeight: "700" }}
          />
        </Appbar.Header>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Không tìm thấy thông tin phim</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ---------- Header ---------- */}
      <Appbar.Header style={{ backgroundColor: "#0B4A8B" }}>
        <Appbar.BackAction onPress={() => router.back()} color="white" />
        <Appbar.Content
          title="ĐẶT VÉ THEO PHIM"
          titleStyle={{ color: "#fff", fontWeight: "700" }}
        />
      </Appbar.Header>

      {/* ---------- Banner ---------- */}
      <ImageBackground
        source={{ uri: movie.poster }}
        style={styles.banner}
        blurRadius={2}
      >
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.movieInfo}>{movie.duration}</Text>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() =>
            router.push({
              pathname: "/(screen)/movie-detail",
              params: {
                movieId: movieId, // ✅ TRUYỀN movieId để fetch API
              },
            })
          }
        >
          <Text style={styles.detailText}>Chi tiết phim</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View>
        <DateSelector />
        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "800" }}>
          Chọn rạp xem
        </Text>
        <CinemaList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 220,
    justifyContent: "flex-end",
    padding: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  movieInfo: {
    color: "#E0E0E0",
    marginVertical: 6,
  },
  detailBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  detailText: {
    color: "#0B4A8B",
    fontWeight: "600",
  },
});
