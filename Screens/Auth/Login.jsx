import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/config.js';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('All Fields Are Required');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
      );
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#6DD5FA', '#FFFFFF']} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to access your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
            placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={{ position: 'relative', width: '100%' }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
              placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#777" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <LinearGradient colors={['#43A047', '#66BB6A']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  title: { fontSize: 28, fontWeight: '800', color: '#2E7D32', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 25, textAlign: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  eyeIcon: { position: 'absolute', right: 15, top: 15 },
  button: { width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 10 },
  buttonGradient: { paddingVertical: 15, alignItems: 'center', borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  signupText: { color: '#555', marginTop: 20, fontSize: 14 },
  signupLink: { color: '#43A047', fontWeight: '700' },
});
