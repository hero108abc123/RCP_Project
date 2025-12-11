import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function LargerCard() {
  return (
    <View style={styles.bigCardContainer}>
      <Image
        source={require('../../assets/images/image 2.png')}
        style={styles.bigImage}
      />

      {/* Layout title */}
      <View>
        <Text>Larger Card Title</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    bigCardContainer: {
        width: 300,
        height: 250,
        borderRadius: 15,
        marginRight: 15,
        overflow: 'hidden',
    },
    bigImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})