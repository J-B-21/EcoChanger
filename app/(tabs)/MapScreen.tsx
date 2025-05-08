import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const collectionPoints = [
  {
    id: '1',
    name: 'Point A',
    wasteType: 'Plastique',
    status: 'Plein',
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Point B',
    wasteType: 'Verre',
    status: 'Vide',
    distance: '2.5 km',
  },
  {
    id: '3',
    name: 'Point C',
    wasteType: 'Organique',
    status: 'En cours',
    distance: '0.9 km',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Plein':
      return '#e74c3c';
    case 'En cours':
      return '#f1c40f';
    case 'Vide':
      return '#2ecc71';
    default:
      return '#bdc3c7';
  }
};

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Carte des Points de Collecte</Text>

      {/* Simulated map placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#999' }}>🗺️ [Carte simulée ici]</Text>
      </View>

      <FlatList
        data={collectionPoints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.pointCard, { borderLeftColor: getStatusColor(item.status) }]}>
            <Text style={styles.pointName}>{item.name}</Text>
            <Text style={styles.details}>Type: {item.wasteType}</Text>
            <Text style={styles.details}>Statut: {item.status}</Text>
            <Text style={styles.details}>Distance: {item.distance}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#dfe6e9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  pointCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 6,
  },
  pointName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});