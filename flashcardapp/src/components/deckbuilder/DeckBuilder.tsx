import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function DeckBuilder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deck Builder Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#666',
  },
});
