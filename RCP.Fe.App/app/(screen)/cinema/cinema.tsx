import CinemaList from '@/components/HomeComponents/cinema-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function CinemaScreen() {
  return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: '#0B4A8B' }}>
                <Appbar.Content title="CỤM RẠP" titleStyle={{ color: '#fff', fontWeight: '700' }} />
            </Appbar.Header>
            <CinemaList/>
        </View>
  )
}

const styles = StyleSheet.create({})