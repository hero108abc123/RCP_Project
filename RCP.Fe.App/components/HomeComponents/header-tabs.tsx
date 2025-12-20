import AllMovies from "@/app/(screen)/all-movie";
import MyTickets from "@/app/(screen)/my-ticket";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

// ------- Screens -------
const AllMovie = () => (
  <View style={styles.scene}>
    <AllMovies />
  </View>
);

const ForKids = () => (
  <View style={styles.scene}>
    <Text style={{ color: "#fff" }}>For Kids</Text>
  </View>
);

const MyTicket = () => (
  <View style={styles.scene}>
    <MyTickets/>
  </View>
);

// ------- Types -------
type RouteType = { key: string; title: string };

export default function HeaderTabs() {
  const layout = useWindowDimensions();
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const [routes] = useState<RouteType[]>([
    { key: "allMovie", title: "All movies" },
    { key: "forKid", title: "For kid" },
    { key: "myTicket", title: "My Ticket" },
  ]);

  const renderScene = SceneMap({
    allMovie: AllMovie,
    forKid: ForKids,
    myTicket: MyTicket,
  });

  // ---------------------- CUSTOM TAB BAR ----------------------
  const renderTabBar = ({ navigationState }: any) => {
    return (
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabRow}>
          {navigationState.routes.map((route: RouteType, i: number) => {
            const active = index === i;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => setIndex(i)}
                style={styles.tabItem}
              >
                <Text style={[styles.tabText, active && { color: "#FFA300" }]}>
                  {route.title}
                </Text>

                {active && <View style={styles.activeUnderline} />}
              </TouchableOpacity>
            );
          })}

          {/* -------- Avatar BUTTON ---------- */}
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={styles.avatarBtn}
          >
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

// ---------------------- STYLES ----------------------
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#0B1A2A",
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarWrapper: {
    paddingTop: 30,
    paddingHorizontal: 60,
    backgroundColor: "#0B1A2A",
  },

  tabRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabItem: {
    marginRight: 25,
    alignItems: "center",
  },

  tabText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  activeUnderline: {
    width: "70%",
    height: 3,
    backgroundColor: "#FFA300",
    borderRadius: 20,
    marginTop: 4,
  },

  avatarBtn: {
    marginLeft: "auto",
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fff",
  },

  avatarImg: {
    width: "100%",
    height: "100%",
  },
});
