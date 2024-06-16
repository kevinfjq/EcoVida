import {View, Text} from "react-native";
import {Link, useNavigation} from "expo-router";
import {useEffect} from "react";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      console.log("onback");
    });
  }, []);

  return(
    <View>
      <Text>Home</Text>
      <Link href={"/calculatorScreen"}>Ir para a calculadora de pegada de carbono</Link>
    </View>
  )
}