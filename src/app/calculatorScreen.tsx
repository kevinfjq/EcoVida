// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calculator from '../../components/calculator';

const calculatorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco Vida</Text>
      <Calculator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdf0d5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9E45D4',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default calculatorScreen;
