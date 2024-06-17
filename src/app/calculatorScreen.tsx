// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Calculator from '../../components/calculator';
import { fontFamily } from '@/src/styles/fontFamily';

const CalculatorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.imageHeader} resizeMode="contain"/>
      <Text style={styles.title}>Calculadora de Pegada de Carbono</Text>
      <Calculator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#8e22bb',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fontFamily.pbold,
  },
  imageHeader : {
    position: "absolute",
    height: 330
  },
});

export default CalculatorScreen;
