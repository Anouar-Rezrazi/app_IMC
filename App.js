import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  Image 
} from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      Alert.alert('Erreur', 'Veuillez saisir votre poids et votre taille');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters

    if (weightNum <= 0 || heightNum <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir des valeurs valides');
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(1));

    // Determine BMI category
    if (bmiValue < 18.5) {
      setBmiCategory('Insuffisance pondérale');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBmiCategory('Poids normal');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBmiCategory('Surpoids');
    } else {
      setBmiCategory('Obésité');
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
  };

  const getBMIColor = () => {
    if (!bmi) return '#333';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return '#3498db'; // Blue - Underweight
    if (bmiValue < 25) return '#2ecc71'; // Green - Normal
    if (bmiValue < 30) return '#f39c12'; // Orange - Overweight
    return '#e74c3c'; // Red - Obese
  };

  const getBMIImage = () => {
    if (!bmi) return null;
    const bmiValue = parseFloat(bmi);
    
    // Map BMI categories to images
    if (bmiValue < 18.5) {
      // Underweight
      return require('./images/WhatsApp Image 2025-11-16 at 20.02.12 (1).jpeg');
    } else if (bmiValue < 25) {
      // Normal weight
      return require('./images/WhatsApp Image 2025-11-16 at 20.02.12 (2).jpeg');
    } else if (bmiValue < 30) {
      // Overweight
      return require('./images/WhatsApp Image 2025-11-16 at 20.02.12 (3).jpeg');
    } else {
      // Obese
      return require('./images/WhatsApp Image 2025-11-16 at 20.02.12 (4).jpeg');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculateur d'IMC</Text>
        <Text style={styles.subtitle}>Indice de Masse Corporelle</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Poids (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Ex: 70"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Taille (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Ex: 175"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
          <Text style={styles.calculateButtonText}>Calculer IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetCalculator}>
          <Text style={styles.resetButtonText}>Réinitialiser</Text>
        </TouchableOpacity>
      </View>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Votre IMC</Text>
          <Text style={[styles.bmiValue, { color: getBMIColor() }]}>{bmi}</Text>
          <Text style={[styles.bmiCategory, { color: getBMIColor() }]}>{bmiCategory}</Text>
          
          {/* Display BMI Category Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={getBMIImage()} 
              style={styles.bmiImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.interpretationContainer}>
            <Text style={styles.interpretationTitle}>Interprétation:</Text>
            <View style={styles.categoryContainer}>
              <Text style={[styles.categoryText, { color: '#3498db' }]}>• Moins de 18.5: Insuffisance pondérale</Text>
              <Text style={[styles.categoryText, { color: '#2ecc71' }]}>• 18.5 - 24.9: Poids normal</Text>
              <Text style={[styles.categoryText, { color: '#f39c12' }]}>• 25 - 29.9: Surpoids</Text>
              <Text style={[styles.categoryText, { color: '#e74c3c' }]}>• 30 et plus: Obésité</Text>
            </View>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bmiCategory: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  bmiImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ecf0f1',
  },
  interpretationContainer: {
    width: '100%',
    marginTop: 20,
  },
  interpretationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  categoryContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 15,
  },
  categoryText: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
});
