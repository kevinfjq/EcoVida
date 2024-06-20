// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontFamily } from '@/src/styles/fontFamily';
import HeaderCalculator from '@/components/headerCalculator';
import Product from '@/components/product';

const ProductScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <HeaderCalculator/>{/* header básico */}
      </View>
      <View>
        <Product/>
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
  containerP:{
    flex: 1,
    width: '100%',
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

export default ProductScreen;
