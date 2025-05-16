import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { setLoggedIn, setCurrentUser } from '@/utils/auth';
import { saveUserProgress, getUserProgress } from '@/utils/userProgress'; // Import the functions to save and get user progress

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username) return Alert.alert('Erreur', 'Nom requis.');

    await setLoggedIn(true); // Set the logged-in state
    await setCurrentUser(username); // Save the current user

    const existing = await getUserProgress(username);
    if (!existing) {
      await saveUserProgress(username, {
        totalReports: 0,
        totalWeight: 0,
        wasteTypes: [],
        photosUploaded: 0,
        visitedPoints: [],
        consecutiveDays: 0,
        invitedFriends: 0,
        ecoTipsRead: 0,
      });
    }
    // Here you would typically send the login data to your backend, but.. Y'know the drill
    // For this example, we'll just simulate a successful login

    router.replace('/(tabs)/HomeScreen'); // Go to main app
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0fff4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#2f855a' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#2f855a', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});