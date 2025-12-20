import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function LargerCard() {
  return (
    <View style={styles.bigCardContainer}>
      <Image
        source={require('../../assets/images/image 2.png')}
        style={styles.bigImage}
      />

      {/* Layout title */}
      <View>
        <Text style={styles.textImage}>Larger Card Title</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    bigCardContainer: {
        width: 300,
        height: 200,
        borderRadius: 15,
        marginRight: 15,
        overflow: 'hidden',
    },
    bigImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textImage:{
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 3,
        bottom: 150,
        right: 80,
    }
})