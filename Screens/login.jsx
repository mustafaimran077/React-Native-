import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      source={{ uri: "https://picjumbo.com/wp-content/uploads/modern-futuristic-abstract-liquid-3d-lines-background-free-image.jpg" }}
      style={styles.bg}
      blurRadius={5}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue your journey</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#bbb"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={22} color="#aaa" style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#bbb"
            style={styles.input}
            secureTextEntry={!showPassword}
          />
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={22}
            color="#aaa"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={{ color: '#ff5555', fontWeight: 'bold' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    width: '100%',
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    height: 45,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff5555',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgot: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#ddd',
    fontSize: 15,
  },
});
