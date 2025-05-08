import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockHistory = [
  { id: '1', date: '06/05/2025', type: 'Plastique', location: 'Point A', weight: '3 kg' },
  { id: '2', date: '05/05/2025', type: 'Verre', location: 'Point B', weight: '2.5 kg' },
  { id: '3', date: '04/05/2025', type: 'Organique', location: 'Point C', weight: '4 kg' },
  { id: '4', date: '03/05/2025', type: 'Métal', location: 'Point A', weight: '1 kg' },
];

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕓 Historique des Collectes</Text>

      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>📅 {item.date}</Text>
            <Text style={styles.detail}>🧃 Type: {item.type}</Text>
            <Text style={styles.detail}>📍 Lieu: {item.location}</Text>
            <Text style={styles.detail}>⚖️ Poids: {item.weight}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7fc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2980b9',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});