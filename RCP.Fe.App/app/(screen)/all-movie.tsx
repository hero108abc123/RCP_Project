import SmallCard from '@/components/HomeComponents/small-card';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import LargerCard from '../../components/HomeComponents/larger-card';

const chips = ['Popular', 'Trending', 'Top Rated', 'Action'];

export default function AllMovies() {
  const [selectedChip, setSelectedChip] = useState('Popular');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.textContainer}>COMING SOON</Text>
          <LargerCard />
          <View style={styles.chipStyle}>
            {chips.map(chip => (
              <Chip
                key={chip}
                textStyle={styles.textChip}
                style={[
                  styles.bgChip,
                  selectedChip === chip && styles.selectedChip,
                ]}
                onPress={() => setSelectedChip(chip)}
              >
                {chip}
              </Chip>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 20, flex: 1 }}>
          <Text style={styles.textContainer}>NEW RELEASE</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.smallCardDisplay}
          >
            {chips.map(chip => (
              <View
                key={chip}
                style={[
                  styles.cardWrapper,
                  selectedChip === chip && styles.selectedCardWrapper,
                ]}
              >
                <SmallCard />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 50,
    overflow: 'hidden',
  },
  textContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  chipStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    overflow: 'hidden',
    overflowX: 'scroll',
  },
  bgChip: {
    backgroundColor: 'transparent',
  },
  textChip: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedChip: {
    backgroundColor: '#ffa300',
  },
  smallCardDisplay: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    marginRight: 15,
    transform: [{ scale: 0.8 }],
    opacity: 0.7,
    alignItems: 'center',
  },
  selectedCardWrapper: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  cardLabel: {
    color: 'white',
    marginTop: 5,
  },
});
