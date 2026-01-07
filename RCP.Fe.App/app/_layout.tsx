import { Providers } from "@/redux/providers";
import { clearUser, setUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import "@/styles/global.css";
import api from "@/utils/axios";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  
  // ✅ Lấy isAuthenticated từ Redux thay vì state local
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const inAuthGroup = segments[0] === "(auth)";
    
    console.log('🔍 Auth check:', { isAuthenticated, inAuthGroup, segments });
    
    if (!isAuthenticated && !inAuthGroup) {
      console.log('➡️ Redirecting to login');
      router.replace("/(auth)/login" as any);
    } else if (isAuthenticated && inAuthGroup) {
      console.log('➡️ Redirecting to bottom-bar');
      router.replace("/(bar)/bottom-bar" as any);
    }
  }, [isAuthenticated, segments, loading]);

  const checkAuth = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      console.log('🔑 accessToken:', accessToken ? 'exists' : 'null');
      
      if (!accessToken) {
        dispatch(clearUser());
        setLoading(false);
        return;
      }
      
      const response = await api.get("/api/app/users/me");
      const userData = response.data;
      console.log("👤 userData:", userData);
      
      dispatch(
        setUser({
          id: userData.id,
          email: userData.email,
          userName: userData.userName,
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          birthDay: userData.birthDay,
          roles: userData.roles,
          $login: {},
        })
      );
    } catch (error) {
      console.error("❌ Token verification failed", error);
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Checking auth...</Text>
      </View>
    );
  }

  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});