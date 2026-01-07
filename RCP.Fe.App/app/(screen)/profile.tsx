import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ThemedView } from "../../components/themed-view";
import ButtonCustom from "../../components/button";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { clearUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  /** * LẤY THÔNG TIN TỪ REDUX
   * Kết nối trực tiếp với user slice để lấy data realtime
   */
  const user = useSelector((state: any) => state.user);

  const logout = () => {
    Alert.alert("Đăng xuất", "Bạn chắc chắn muốn đăng xuất?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            dispatch(clearUser());
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            await SecureStore.deleteItemAsync("user");

            router.dismissAll();
            router.replace("/(auth)/login");
          } catch (error) {
            Alert.alert("Error", "Logout failed");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100" }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => router.push("/edit")}
              >
                <Icon name="pencil" size={14} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              {/* GÁN FULL NAME TỪ REDUX */}
              <Text style={styles.name} numberOfLines={1}>
                {user.fullName || user.userName || "Người dùng"}
              </Text>

              {/* GÁN EMAIL TỪ REDUX */}
              <Text style={styles.email} numberOfLines={1}>
                {user.email || "Chưa cập nhật email"}
              </Text>

              <View style={styles.buttonWrapper}>
                <ButtonCustom
                  title="Edit Profile"
                  backgroundColor="#5786ee"
                  textColor="#fff"
                  borderRadius={10}
                  paddingVertical={7}
                  onPress={() => router.push("/edit")}
                />
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <MenuItem icon="heart-outline" label="Favorite" />
            <MenuItem icon="location-outline" label="Location" />
            <MenuItem icon="globe-outline" label="Language" />
            <MenuItem icon="log-out-outline" label="Log out" onPress={logout} />
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Icon name={icon} size={22} color="#000" />
        <Text style={styles.menuText}>{label}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393f4e",
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    paddingBottom: 30,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonWrapper: {
    width: "80%",
  },
  menuSection: {
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    minHeight: 500,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomColor: "#d1d1d1",
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 15,
  },
});
