import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { setLoggedIn, setCurrentUser } from '@/utils/auth';
import { saveUserProgress, getUserProgress } from '@/utils/userProgress'; // Import the functions to save and get user progress


const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();

  const handleSignup = async () => {
    if (!email) return Alert.alert('Erreur', 'Adresse Mail requise.');
    if (!username) return Alert.alert('Erreur', 'Nom requis.');
    if (!password) return Alert.alert('Erreur', 'Mot de Passe requis.');

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
    // Here you would typically send the signup data to your backend 
    // For this example, we'll just simulate a successful signup
    // and navigate to the main app screen
    router.replace('/(tabs)/HomeScreen'); // Simulated signup success
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Création de Compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Choisis une Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Choisis un nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
        />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Créer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#e6fffa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#319795' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#319795', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});