import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockData = {
  totalWasteKg: 72.5,
  collectionPoints: 5,
  nextCollection: 'Demain à 09h30'
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Tableau de Bord</Text>

      <View style={styles.card}>
        <Text style={styles.label}>♻ Total des déchets collectés :</Text>
        <Text style={styles.value}>{mockData.totalWasteKg} kg</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Points de collecte :</Text>
        <Text style={styles.value}>{mockData.collectionPoints}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🕒 Prochaine collecte estimée :</Text>
        <Text style={styles.value}>{mockData.nextCollection}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
});