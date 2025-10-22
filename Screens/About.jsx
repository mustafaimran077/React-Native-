import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>About This App ℹ️</Text>
      <Text style={styles.description}>
        This is a simple React Native app demonstrating bottom tab navigation.
        It includes Home, Contact, and About screens with clean modern design.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#007bff', marginTop: 10 },
  description: { textAlign: 'center', color: '#555', fontSize: 16, marginTop: 15 },
  image: { width: 100, height: 100 },
});
