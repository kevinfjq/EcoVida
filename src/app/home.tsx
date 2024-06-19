import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Link, useNavigation} from "expo-router";
import {useEffect} from "react";
import Routes from "../routes";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HeaderHome from "@/components/headerHome";
import SliderHome from "@/components/sliderHome";
import ArticlesHome from "@/components/articlesHome";
import SustainabilityTipsScreen from "@/components/tipsHome";
import ProductScreen from "./productScreen";
import { fontFamily } from "../styles/fontFamily";

const Home: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      console.log("onback");
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <View>
          <HeaderHome />
        </View>
        <View>
          <SliderHome />
        </View>
        <View>
          <ScrollView>
            <SustainabilityTipsScreen />
            <ArticlesHome />
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Link href="/calculatorScreen" style={styles.button}>
            <Text style={styles.buttonText}>Calculadora</Text>
          </Link>
          <Link href="/productScreen" style={styles.button}>
            <Text style={styles.buttonText}>Produtos</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#D3A9F4',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 10,
    textAlign: 'center',
    fontFamily: fontFamily.pmedium,
    
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;