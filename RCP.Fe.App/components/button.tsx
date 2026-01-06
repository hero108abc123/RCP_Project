import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


interface ButtonProps {
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  paddingVertical?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  paddingHorizontal?: number;
  fontSize?: number;
}

export default function ButtonCustom({ title, onPress, backgroundColor  = "#C64747", textColor, fontSize, borderRadius, paddingVertical, marginVertical, marginHorizontal, paddingHorizontal }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        paddingVertical: paddingVertical || 13,
        borderRadius: borderRadius || 40,
        alignItems: "center",
        marginVertical: marginVertical ||6,
        marginHorizontal: marginHorizontal || 10,
        paddingHorizontal: paddingHorizontal || 20,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold", fontSize: fontSize||16 }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})