import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function MovieDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // movie được stringify từ màn trước
  const movie = JSON.parse(params.movie as string);

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} color='white'/>
        <Appbar.Content title="Chi tiết phim" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER */}
        <ImageBackground
          source={{ uri: movie.banner || movie.poster }}
          style={styles.banner}
        >
          <View style={styles.playBtn}>
            <Ionicons name="play" size={28} color="#fff" />
          </View>
        </ImageBackground>

        {/* POSTER + TITLE */}
        <View style={styles.infoContainer}>
          <Image source={{ uri: movie.poster }} style={styles.poster} />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.age}>Chỉ dành cho người trên 13 tuổi</Text>
          </View>
        </View>

        {/* INFO TABLE */}
        <View style={styles.meta}>
          <InfoRow label="ĐẠO DIỄN" value={movie.director} />
          <InfoRow label="DIỄN VIÊN" value={movie.cast} />
          <InfoRow label="THỂ LOẠI" value={movie.genre} />
          <InfoRow label="THỜI LƯỢNG" value={movie.duration} />
          <InfoRow label="NGÔN NGỮ" value={movie.language} />
          <InfoRow label="NGÀY KHỞI CHIẾU" value={movie.releaseDate} />
        </View>

        {/* DESCRIPTION */}
        <View style={styles.desc}>
          <Text style={styles.descText}>{movie.description}</Text>
        </View>
      </ScrollView>

      {/* SHARE BUTTON */}
      <TouchableOpacity style={styles.shareBtn}>
        <Ionicons name="share-social" size={18} color="#fff" />
        <Text style={styles.shareText}>Chia sẻ</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- SUB COMPONENT ---------- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0B4A8B',
  },
  banner: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  poster: {
    width: 110,
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  age: {
    marginTop: 6,
    color: '#757575',
    fontSize: 12,
  },
  meta: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  rowLabel: {
    width: 120,
    fontWeight: '700',
  },
  rowValue: {
    flex: 1,
    color: '#424242',
  },
  desc: {
    padding: 16,
  },
  descText: {
    lineHeight: 22,
    color: '#424242',
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: '#0B4A8B',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});
