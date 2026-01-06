import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps extends TextInputProps {
  label: string;
  showToggle?: boolean;
  onToggleSecure?: () => void; // ✅ THÊM
}

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showToggle,
  onToggleSecure,
  ...rest
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          focused && styles.focusedBorder,
        ]}
      >
        <TextInput
          {...rest}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholderTextColor="#999"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {showToggle && (
          <TouchableOpacity onPress={onToggleSecure}>
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111",
  },

  inputWrapper: {
    height: 50,                 
    borderRadius: 40,          
    borderWidth: 1,
    borderColor: "#111",
    paddingHorizontal: 16,      
    backgroundColor: "#FFF",

    flexDirection: "row",
    alignItems: "center",
  },

  focusedBorder: {
    borderColor: "#C63C3C",     
  },

  input: {
    flex: 1,
    height: "100%",             
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,         
    textAlignVertical: "center" 
  },
});
