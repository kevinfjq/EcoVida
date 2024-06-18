import {View, Text} from "react-native";
import {router, useNavigation} from "expo-router";
import {useEffect} from "react";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {Button} from "@/components/button";
import {colors} from "@/src/styles/colors";
import {onAuthStateChanged, signOut} from "@firebase/auth";
import Toast from "react-native-toast-message";

export default function Home() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      // console.log("onback");
    });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // router.redirect('/');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  async function logout() {
    await signOut(auth)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Até a próxima',
        })
      })
      .catch((error) => {
      Toast.show({
        type: 'error',
        text1: error.code,
        text2: error.message,
      });
    });
  }



  return(
    <View>
      <Text>{auth.currentUser?.email}</Text>
      <Button title={"Sair"} onPress={logout} color={colors.green.default}/>
    </View>
  )
}