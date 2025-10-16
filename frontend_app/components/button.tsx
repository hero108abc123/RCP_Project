import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'


interface ButtonProps {
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export default function Button({ title, onPress, backgroundColor  = "#C64747", textColor }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
        marginVertical: 6,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})