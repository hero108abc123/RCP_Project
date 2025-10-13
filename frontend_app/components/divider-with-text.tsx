import React from "react";
import { View, Text } from "react-native";

export default function DividerWithText({ text = "hoặc" }: { text?: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      <Text style={{ marginHorizontal: 8, color: "#666" }}>{text}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
    </View>
  );
}
