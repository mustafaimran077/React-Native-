import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us 📞</Text>

      <TextInput placeholder="Your Name" style={styles.input} />
      <TextInput placeholder="Your Email" style={styles.input} keyboardType="email-address" />
      <TextInput
        placeholder="Your Message"
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#007bff', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 8, elevation: 2 },
  button: { backgroundColor: '#007bff', paddingVertical: 12, borderRadius: 25, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
