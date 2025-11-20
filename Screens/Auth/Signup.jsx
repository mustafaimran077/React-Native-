import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/config';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Signup({ navigation }) {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false }; // cleanup
  }, []);

  const handleSignup = async () => {
    if (!userName || !email || !password) {
      if (isMounted.current) Alert.alert('All Fields Are Required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, { userName, email, password });

      if ((response.status === 200 || response.status === 201) && isMounted.current) {
        const { token, user } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
        );
      }
    } catch (error) {
      if (isMounted.current)
        Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
      console.log(error);
      
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#6DD5FA', '#FFFFFF']} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our community of patients and doctors</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
                placeholderTextColor="#999"
              value={userName}
              onChangeText={setUsername}
            />

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

            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
              <LinearGradient colors={['#43A047', '#66BB6A']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
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
    // backgroundColor: '#fff',
  },
  eyeIcon: { position: 'absolute', right: 15, top: 15 },
  button: { width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 10 },
  buttonGradient: { paddingVertical: 15, alignItems: 'center', borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  loginText: { color: '#555', marginTop: 20, fontSize: 14 },
  loginLink: { color: '#43A047', fontWeight: '700' },
});
