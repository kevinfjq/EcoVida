import {Text, View, StyleSheet, Image} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.image} resizeMode="contain"  />
      <Text style={styles.text}>Bem-vindo(a)</Text>
      <View style={styles.container}>

      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    margin: -30,
    height: 248
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: "flex-start",
    padding: 15,
  }
})
