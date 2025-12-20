import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

type FormInputProps = TextInputProps & {
  label: string;
  error?: string; 
};

export default function FormInput({ label, error, style, ...props }: FormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#888"
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  error: {
    color: '#d9534f',
    fontSize: 12,
    marginTop: 4,
  },
});
