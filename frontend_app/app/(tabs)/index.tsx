// app/(tabs)/index.tsx
import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_W = Math.round(SCREEN_W * 0.62);
const CARD_SPACING = 16;

const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

const IMAGES = {
  dark: require("../../assets/images/darkknight.jpg"),
  anime: require("../../assets/images/anime1.jpg"),
  romance: require("../../assets/images/romance1.jpg"),
  terminator: require("../../assets/images/terminator1.jpg"),
  promo1: require("../../assets/images/darkknight.jpg"),
  promo2: require("../../assets/images/terminator1.jpg"),
  promo3: require("../../assets/images/anime1.jpg"),
};

type Movie = {
  id: string;
  title: string;
  subtitle: string;
  rating: string;
  genres: string[];
  img: any;
};

const ALL_MOVIES: Movie[] = [
  {
    id: "1",
    title: "TERMINATOR 3",
    subtitle: "Rise Of The Machines",
    rating: "16+",
    genres: ["Action", "Science fiction"],
    img: IMAGES.terminator,
  },
  {
    id: "2",
    title: "THE DARK KNIGHT",
    subtitle: "Gotham's Savior",
    rating: "16+",
    genres: ["Action", "Detective"],
    img: IMAGES.dark,
  },
  {
    id: "3",
    title: "NARUTO",
    subtitle: "Shinobi Adventure",
    rating: "13+",
    genres: ["Anime", "Action"],
    img: IMAGES.anime,
  },
  {
    id: "4",
    title: "ROMANTIC DRAMA",
    subtitle: "A Love Story",
    rating: "13+",
    genres: ["Romantic"],
    img: IMAGES.romance,
  },
  {
    id: "5",
    title: "FANTASY EPIC",
    subtitle: "Legends Arise",
    rating: "13+",
    genres: ["Fantasy"],
    img: IMAGES.terminator,
  },
];

const GENRES = ["All", "Action", "Romantic", "Horror", "Detective", "Fantasy", "Anime"] as const;

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatRef = useRef<FlatList<Movie>>(null);
  const promoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(promoAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const movies = useMemo(() => {
    if (selectedGenre === "All") return ALL_MOVIES;
    return ALL_MOVIES.filter((m) => m.genres.includes(selectedGenre));
  }, [selectedGenre]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      {/*HEADER  */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
      </View>

      {/*1. VIDEO COMING SOON  */}
      <View style={styles.videoWrap}>
        <Video
          source={{ uri: DEMO_VIDEO }}
          style={styles.video}
          shouldPlay
          isLooping
          isMuted
          resizeMode={ResizeMode.COVER}
        />
        <TouchableOpacity style={styles.videoOverlay} activeOpacity={0.9}>
          <Ionicons name="play" size={36} color="#0b1220" />
        </TouchableOpacity>
      </View>

      {/*2. MENU LỌC THỂ LOẠI*/}
      <FlatList
        data={GENRES as readonly string[]}
        keyExtractor={(g) => g}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreMenu}
        renderItem={({ item }) => {
          const active = selectedGenre === item;
          return (
            <TouchableOpacity
              onPress={() => setSelectedGenre(item)}
              style={[styles.genreBtn, active && styles.genreBtnActive]}
            >
              <Text style={[styles.genreText, active && styles.genreTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/*3. NOW SHOWING*/}
      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
        {selectedGenre === "All" ? "Now Showing" : `${selectedGenre} Movies`}
      </Text>
      <Animated.FlatList
        ref={flatRef}
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_W - CARD_W) / 2,
          paddingVertical: 18,
        }}
        snapToInterval={CARD_W + CARD_SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_W + CARD_SPACING),
            index * (CARD_W + CARD_SPACING),
            (index + 1) * (CARD_W + CARD_SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1.06, 0.92],
            extrapolate: "clamp",
          });
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, 0, 10],
            extrapolate: "clamp",
          });
          return (
            <Animated.View style={[styles.card, { transform: [{ scale }, { translateY }] }]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{ flex: 1 }}
                onPress={() => router.push({ pathname: "/movie/[id]", params: { id: item.id } } as any)}
              >
                <Image source={item.img} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSub}>{item.subtitle}</Text>
                  <View style={styles.tagRow}>
                    <View style={styles.smallTag}>
                      <Text style={styles.smallTagText}>{item.rating}</Text>
                    </View>
                    {item.genres.map((g) => (
                      <View key={g} style={styles.smallTag}>
                        <Text style={styles.smallTagText}>{g}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />

      {/*4. MENU QUẢNG CÁO*/}
      <Animated.View
        style={{
          opacity: promoAnim,
          transform: [
            {
              translateY: promoAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.sectionTitle}>Movie Hot - Tháng 10</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <PromoCard title="Hot This Month" subtitle="Top picks for Oct" img={IMAGES.promo1} />
          <PromoCard title="Don't Miss" subtitle="Limited Seats" img={IMAGES.promo2} />
          <PromoCard title="Trending" subtitle="Watch Now" img={IMAGES.promo3} />
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Bảng xếp hạng (Top)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <PromoCard title="Top 1" subtitle="#1 this week" img={IMAGES.promo2} />
          <PromoCard title="Top 2" subtitle="Audience favorite" img={IMAGES.promo1} />
          <PromoCard title="Top 3" subtitle="Critics choice" img={IMAGES.promo3} />
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Giảm giá</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <PromoCard title="Flash Sale" subtitle="Up to 50% off" img={IMAGES.promo3} />
          <PromoCard title="Student Offer" subtitle="Special price" img={IMAGES.promo1} />
          <PromoCard title="Weekend Deal" subtitle="Buy 1 get 1" img={IMAGES.promo2} />
        </ScrollView>
      </Animated.View>
    </ScrollView>
  );
};

export default HomeScreen;

const PromoCard: React.FC<{ title: string; subtitle?: string; img: any; id?: string }> = ({
  title,
  subtitle,
  img,
  id,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  return (
    <TouchableWithoutFeedback
      onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
      onPress={() => router.push({ pathname: "/movie/[id]", params: { id: id || "1" } } as any)}
    >
      <Animated.View
        style={[
          styles.promoCard,
          {
            transform: [{ scale }],
            shadowColor: "#FB923C",
            shadowOpacity: 0.4,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          },
        ]}
      >
        <Image source={img} style={styles.promoImg} resizeMode="cover" />
        <View style={styles.promoTextWrap}>
          <Text style={styles.promoTitle}>{title}</Text>
          {subtitle && <Text style={styles.promoSub}>{subtitle}</Text>}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1220", paddingTop: 48 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    color: "#FB923C",
    fontSize: 24,
    fontWeight: "800",
  },

  videoWrap: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: { width: "100%", height: "100%" },
  videoOverlay: {
    position: "absolute",
    alignSelf: "center",
    top: "42%",
    backgroundColor: "#FB923C",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.98,
  },

  genreMenu: { paddingHorizontal: 10, paddingVertical: 12 },
  genreBtn: {
    backgroundColor: "#1f2937",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  genreBtnActive: { backgroundColor: "#FB923C" },
  genreText: { color: "#fff", fontWeight: "600" },
  genreTextActive: { color: "#0b1220" },

  sectionTitle: {
    color: "#FB923C",
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 20,
    marginTop: 12,
  },

  promoCard: {
    width: 220,
    height: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1f2937",
    elevation: 6,
  },
  promoImg: { width: "100%", height: "100%", opacity: 0.95 },
  promoTextWrap: { position: "absolute", left: 12, bottom: 8 },
  promoTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },
  promoSub: { color: "#ddd", fontSize: 12, marginTop: 2 },

  card: {
    width: CARD_W,
    height: 360,
    marginHorizontal: CARD_SPACING / 2,
    backgroundColor: "#1f2937",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 6,
  },
  cardImage: { width: "100%", height: 260 },
  cardInfo: { padding: 10, backgroundColor: "#1f2937" },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "800", textAlign: "center" },
  cardSub: { color: "#ddd", fontSize: 12, textAlign: "center", marginTop: 4 },

  tagRow: { flexDirection: "row", justifyContent: "center", marginTop: 8, flexWrap: "wrap", gap: 6 },
  smallTag: {
    backgroundColor: "#0f1724",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  smallTagText: { color: "#fff", fontSize: 11 },
});
