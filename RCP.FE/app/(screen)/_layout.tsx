import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon: any = "home";

          switch (route.name) {
            case "movie":
              icon = "film";
              break;
            case "cinema":
              icon = "ticket";
              break;
            case "voucher":
              icon = "pricetag";
              break;
            case "other":
              icon = "menu";
              break;
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="movie" options={{ title: "Phim" }} />
      <Tabs.Screen name="cinema" options={{ title: "Rạp" }} />
      <Tabs.Screen name="voucher" options={{ title: "Voucher" }} />
      <Tabs.Screen name="other" options={{ title: "Khác" }} />
    </Tabs>
  );
}
