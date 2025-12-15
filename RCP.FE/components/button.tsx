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
}

export default function ButtonCustom({ title, onPress, backgroundColor  = "#C64747", textColor, borderRadius, paddingVertical, marginVertical, marginHorizontal, paddingHorizontal }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        paddingVertical: paddingVertical ||12,
        borderRadius: borderRadius || 20,
        alignItems: "center",
        marginVertical: marginVertical ||6,
        marginHorizontal: marginHorizontal || 10,
        paddingHorizontal: paddingHorizontal ,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})