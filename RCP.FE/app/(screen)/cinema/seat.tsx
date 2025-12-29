import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';


export default function Seat() {

    const router = useRouter();
    const { movie } = useLocalSearchParams();
    const data = JSON.parse(movie as string);

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
        <Appbar.Content title="ĐẶT VÉ XEM PHIM" titleStyle={{ color: '#fff', fontWeight: '700' }} />
      </Appbar.Header>

      <ImageBackground 
        source={{ uri: data.poster }}
        style={styles.banner}
        // blurRadius={2}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    banner: {
        height: 200,
        justifyContent: 'flex-end',
        padding: 16,
    },
})