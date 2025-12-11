import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LargerCard from '../../components/HomeComponents/larger-card'

export default function AllMovies() {
  return (
    <View>
        <View>
            <Text>COMING SOON</Text>
            <LargerCard />
        </View>
        <View>
            <Text>NEW RELEASE</Text>
        </View>


    </View>
  )
}

const styles = StyleSheet.create({})