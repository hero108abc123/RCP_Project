import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';

export default function SmallCard() {
  const chips = ['Popular', 'Trending', 'Top Rated', 'Action'];

  return (

      <View style={styles.smallCardContainer}>
        <Image 
          style={styles.smallImage}
          source={require('../../assets/images/image 2.png')}
        />
        <Text style={styles.cardTitle}>small-card</Text>
        
        <View style={styles.chipContainer}>
          {chips.map((chip) => (
            <Chip key={chip} style={styles.chip}>
              {chip}
            </Chip>
          ))}
        </View>
      </View>
 
  );
}

const styles = StyleSheet.create({
  smallCardContainer: {
    width: 250,
    height: 500,
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#222'
  },
  smallImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardTitle: {
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  }
});
