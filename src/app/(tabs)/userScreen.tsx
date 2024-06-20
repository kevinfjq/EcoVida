import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Calculator from '../../../components/calculator';
import { fontFamily } from '@/src/styles/fontFamily';
import HeaderUser from '@/components/headerUser';
import UserInfos from '@/components/userInfos';
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {onAuthStateChanged, signOut} from "@firebase/auth";
import Toast from "react-native-toast-message";
import * as Updates from "expo-updates";

const UserScreen: React.FC = () => {
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

  return (
    <View style={styles.container}>
      <View>
        <HeaderUser/>
      </View>
      <View style={styles.container}>
        <UserInfos/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
  },
});

export default UserScreen;
