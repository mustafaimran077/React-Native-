import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GetStartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Top Half - Image Section */}
      <View style={styles.topContainer}>
        <Image source={require('../Image/Health.png')} style={styles.image} />
        {/* Gradient overlay for better contrast */}
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent']}
          style={styles.imageOverlay}
        />
      </View>

      {/* Bottom Half - Content Section */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Your Health Simplified</Text>
        <Text style={styles.subtitle}>
          Manage Appoinments and track your well-being with ease
        </Text>

        {/* Buttons */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
          <LinearGradient colors={['#0288D1', '#03A9F4']} style={styles.startButton}>
            <Text style={styles.startText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.learnButton}>
          <Text style={styles.learnText}>Learn More</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>No credit card required — start for free!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  topContainer: {
    flex: 1.1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#01579B',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  startButton: {
    width: 250,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0288D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  learnButton: {
    borderWidth: 1.5,
    borderColor: '#0288D1',
    width: 250,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },
  learnText: {
    color: '#0288D1',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 25,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
