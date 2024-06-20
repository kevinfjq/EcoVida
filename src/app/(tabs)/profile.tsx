import {View, Text} from "react-native";
import {onAuthStateChanged, signOut} from "@firebase/auth";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import Toast from "react-native-toast-message";
import {router} from "expo-router";
import {Button} from "@/components/button";
import {colors} from "@/src/styles/colors";
import {useEffect} from "react";
import * as Updates from "expo-updates";

export default function Profile() {
  const auth = FIREBASE_AUTH;
  async function logout() {
    try{
      await signOut(FIREBASE_AUTH);
      Toast.show({
        text1: "Até mais"
      })

    } catch (error) {
      Toast.show({
        text1: "Error logging out",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {

        Toast.show({
          text1: "Até mais"
        });
        Updates.reloadAsync();
      }
    });

    return () => unsubscribe();
  }, [auth]);
  return(
    <View>
      <Text>Profile</Text>
      <Button onPress={logout} title={"Sair"} color={colors.green.default} />
    </View>
  )
}