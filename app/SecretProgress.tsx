import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getCurrentUser } from '@/utils/auth';
import { getUserProgress, saveUserProgress } from '@/utils/userProgress';

type FormKey =
  | 'totalReports'
  | 'totalWeight'
  | 'wasteTypes'
  | 'photosUploaded'
  | 'visitedPoints'
  | 'consecutiveDays'
  | 'invitedFriends'
  | 'ecoTipsRead';

export default function SecretProgressScreen() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    totalReports: '',
    totalWeight: '',
    wasteTypes: '',
    photosUploaded: '',
    visitedPoints: '',
    consecutiveDays: '',
    invitedFriends: '',
    ecoTipsRead: '',
  });

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      if (user) setUsername(user);
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const updateProgress = async () => {
    const progress = {
      totalReports: parseInt(form.totalReports) || 0,
      totalWeight: parseFloat(form.totalWeight) || 0,
      wasteTypes: form.wasteTypes.split(',').map(s => s.trim()).filter(Boolean),
      photosUploaded: parseInt(form.photosUploaded) || 0,
      visitedPoints: form.visitedPoints.split(',').map(s => s.trim()).filter(Boolean),
      consecutiveDays: parseInt(form.consecutiveDays) || 0,
      invitedFriends: parseInt(form.invitedFriends) || 0,
      ecoTipsRead: parseInt(form.ecoTipsRead) || 0,
    };

    await saveUserProgress(username, progress);
    Alert.alert('✅ Progress mis à jour !');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛠️ Dev: Modifier Progrès</Text>

      {[
        { label: 'Total de rapports', key: 'totalReports' },
        { label: 'Poids total (kg)', key: 'totalWeight' },
        { label: 'Types de déchets (ex: Plastique, Verre)', key: 'wasteTypes' },
        { label: 'Photos uploadées', key: 'photosUploaded' },
        { label: 'Points visités (ex: Point A, Point C)', key: 'visitedPoints' },
        { label: 'Jours consécutifs', key: 'consecutiveDays' },
        { label: 'Amis invités', key: 'invitedFriends' },
        { label: 'Conseils lus', key: 'ecoTipsRead' },
      ].map(({ label, key }) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={label}
          value={form[key as FormKey]}
          onChangeText={(text) => handleChange(key as FormKey, text)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={updateProgress}>
        <Text style={styles.buttonText}>✅ Sauvegarder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9fbff', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});