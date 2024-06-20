import {View, Text, ScrollView} from "react-native";
import {Link, useNavigation} from "expo-router";
import {useEffect} from "react";
import Routes from "../../routes";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HeaderHome from "@/components/headerHome";
import SliderHome from "@/components/sliderHome";
import ArticlesHome from "@/components/articlesHome";
import SustainabilityTipsScreen from "@/components/tipsHome";

const Home: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      console.log("onback");
    });
  }, []);

  return(
    <ScrollView>
      <View>
        <View>
          <HeaderHome/>
        </View>
        <View>
          <SliderHome/>
        </View>
        <View>
          <ScrollView>
            <SustainabilityTipsScreen/>
            <ArticlesHome/>
          </ScrollView>
        </View>
        <View>
          
        </View>
      </View>
    </ScrollView>
    
    /*<NavigationContainer>
      <Routes/>
    </NavigationContainer>*/
  );
}

export default Home;