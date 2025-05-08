import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const SignupScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');

  const handleSignup = () => {
    if (!username) return Alert.alert('Erreur', 'Nom requis.');
    navigation.navigate('MainTabs'); // Simulated login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Création de Compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Choisis un nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
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