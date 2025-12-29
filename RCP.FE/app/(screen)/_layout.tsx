import { Stack } from "expo-router";

export default function ScreenLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="bottom-bar" />
            <Stack.Screen name="movie-schedule" />
            <Stack.Screen name="home" />
        </Stack>
    )
}