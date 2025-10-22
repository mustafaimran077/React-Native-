import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#1e1e1e', '#111']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.username}>Mustafa 👋</Text>
          </View>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            placeholder="Search something..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>Quick Access</Text>

        {/* Only Login & Signup Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Login')}>
            <FontAwesome name="sign-in-alt" size={28} color="#4fd1c5" />
            <Text style={styles.cardText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Signup')}>
            <Ionicons name="person-add" size={28} color="#ff6f61" />
            <Text style={styles.cardText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <View style={styles.updateCard}>
          <Ionicons name="time-outline" size={24} color="#f6c90e" />
          <Text style={styles.updateText}>Stay connected — new features coming soon!</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>✨ Designed by Mustafa ✨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b' },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { color: '#aaa', fontSize: 14 },
  username: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 8, marginLeft: 8 },
  body: { padding: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
  card: {
    backgroundColor: '#1a1a1a',
    width: '40%',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 25,
    elevation: 4,
    shadowColor: '#ff6f61',
  },
  cardText: { color: '#ccc', marginTop: 10, fontSize: 15, fontWeight: 'bold' },
  updateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  updateText: { color: '#bbb', marginLeft: 10, flexShrink: 1 },
  footer: {
    backgroundColor: '#111',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#222',
  },
  footerText: { color: '#555', fontSize: 12 },
});

