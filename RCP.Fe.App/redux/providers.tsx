import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './store'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Initializing store...</Text>
          </View>
        } 
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})