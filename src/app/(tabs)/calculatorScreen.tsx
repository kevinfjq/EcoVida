// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Calculator from '@/components/calculator';
import { fontFamily } from '@/src/styles/fontFamily';
import HeaderCalculator from '@/components/headerCalculator';

const CalculatorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <HeaderCalculator/>
      </View>
      <View style={styles.container}>
        <Calculator/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    //padding: 20,
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
