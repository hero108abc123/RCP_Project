import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Slot, useSegments, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const segments = useSegments() as string[];
  const router = useRouter();

  const active = (() => {
    if (segments.includes("for-kid")) return "For Kid";
    if (segments.includes("my-ticket")) return "My Ticket";
    return "All Movie";
  })();

  return (
    <View style={styles.root}>
      {/*HEADER MENUu*/}
      <View style={styles.headerWrap}>
        <View style={styles.menuContainer}>
          {["All Movie", "For Kid", "My Ticket"].map((label) => (
            <TouchableOpacity
              key={label}
              style={[styles.menuItem, active === label && styles.menuItemActive]}
              onPress={() => {
                if (label === "All Movie") router.push("/" as any);
                else if (label === "For Kid") router.push("/for-kid" as any);
                else router.push("/my-ticket" as any);
              }}
            >
              <Text
                style={[
                  styles.menuText,
                  active === label && styles.menuTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}

          {/*ICON USER*/}
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => {
              const isLoggedIn = false; // sau này thay bằng check token/AsyncStorage
              if (isLoggedIn) router.push("/(tabs)/profile" as any);
              else router.push("/(auth)/Login" as any);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/*sLOT CHO MÀN HÌNH CO*/}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
  headerWrap: {
    backgroundColor: "#0b1220",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: "#222",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "space-between",
  },
  menuItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  menuItemActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#FB923C",
  },
  menuText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  menuTextActive: {
    color: "#FB923C",
  },
  iconWrap: {
    paddingHorizontal: 6,
  },
  content: {
    flex: 1,
    paddingTop: 6,
  },
});
