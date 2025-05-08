import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import

const AddReportScreen = () => {
  const [wasteType, setWasteType] = useState('Plastique');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('Point A');
  const [photo, setPhoto] = useState('placeholder');

  const submitReport = () => {
    if (!weight) {
      Alert.alert('Erreur', 'Veuillez entrer un poids estimé.');
      return;
    }

    Alert.alert('✅ Rapport simulé', `Type: ${wasteType}\nPoids: ${weight} kg\nLieu: ${location}`);
    setWeight('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📤 Ajout d&apos;un Déchêt</Text>

      <Text style={styles.label}>Type de déchet :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={wasteType}
          onValueChange={(itemValue) => setWasteType(itemValue)}
          style={Platform.OS === 'ios' ? undefined : styles.picker}
        >
          <Picker.Item label="Plastique" value="Plastique" />
          <Picker.Item label="Verre" value="Verre" />
          <Picker.Item label="Organique" value="Organique" />
          <Picker.Item label="Métal" value="Métal" />
        </Picker>
      </View>

      <Text style={styles.label}>Poids estimé (kg) :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Ex: 5"
      />

      <Text style={styles.label}>Photo :</Text>
      <View style={styles.imagePlaceholder}>
        <Image
          source={require('@/assets/images/Trash.jpg')}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text style={{ color: '#888' }}>📷 Placeholder</Text>
      </View>

      <Text style={styles.label}>Lieu de dépôt :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={Platform.OS === 'ios' ? undefined : styles.picker}
        >
          <Picker.Item label="Point A" value="Point A" />
          <Picker.Item label="Point B" value="Point B" />
          <Picker.Item label="Point C" value="Point C" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={submitReport}>
        <Text style={styles.buttonText}>Simuler le Dépôt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});