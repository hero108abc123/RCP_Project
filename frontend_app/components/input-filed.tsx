import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  onToggleSecure?: () => void;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showToggle,
  onToggleSecure,
}: InputFieldProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "#999",
        }}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={{ flex: 1, paddingVertical: 8 }}
        />
        {showToggle && (
          <TouchableOpacity onPress={onToggleSecure}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
