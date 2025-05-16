import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Bienvenue sur EcoChanger</Text>
      <Text style={styles.subtitle}>Simule la collecte, progresse, et deviens un éco-héros !</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/LoginScreen')}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signup]} onPress={() => router.push('/SignupScreen')}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2f855a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#4a5568',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2f855a',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 15,
    alignItems: 'center',
  },
  signup: {
    backgroundColor: '#38a169',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});