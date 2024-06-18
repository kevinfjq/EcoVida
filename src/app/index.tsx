import {Text, View, StyleSheet, Image, Alert, Modal, TouchableOpacity} from "react-native";
import {Input} from "@/components/input";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/src/styles/colors";
import {Link, Redirect, router} from "expo-router";
import {fontFamily} from "@/src/styles/fontFamily";
import {Button} from "@/components/button";
import Svg, {Defs, LinearGradient, Path, Stop} from "react-native-svg";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  onAuthStateChanged, sendPasswordResetEmail, signInWithCredential,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('')
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "989903719875-4eohpq60la1clbdhhp5qhb5i0cs53qv8.apps.googleusercontent.com",
  });
  const auth = FIREBASE_AUTH;
  async function sendEmail() {
    await sendPasswordResetEmail(auth, modalEmail)
      .then((result) => {
        Toast.show({
          type: 'success',
          text1: 'Email enviado!'
        });
        setShowModal(false);
      })
  }

  useEffect(() => {
    if(response?.type == 'success') {
      const { id_token} =response.params
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(() => {
        unsubscribe();
      });
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/(tabs)/home');
      }
    });

    return () => unsubscribe();
  }, [auth, router, response]);

  async function googleLogin() {
   await promptAsync();
  }

  async function login() {
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Bem vindo(a)',
            text2: 'Login feito com sucesso',
            visibilityTime: 2500,
          });
        })
        .catch((error) => {
        const errorCode = "Erro ao acessar!";
        let errorMessage;
        if(error.code == "auth/invalid-email"){
          errorMessage = "Endereço de email inválido.";
        }
        else if(error.code == "auth/invalid-credential" ){
          errorMessage = "Endereço de email ou senha incorretos.";
        }
        else if(error.code == "auth/weak-password"){
          errorMessage = "A senha deve ter 6 ou mais caracteres.";
        }
        else if(error.code == "auth/internal-error" || error.code == "auth/no-auth-event"){
          errorMessage = "Ocorreu um erro interno.";
        }
        else if(error.code == "auth/timeout"){
          errorMessage = "Operação expirada.";
        }
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: errorCode,
          text2: errorMessage,
        });
      });
    } catch (error) {

    }
  }



  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={showModal} onRequestClose={() =>{setShowModal(!showModal)}}>
        <View style={styles.container}>
          <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, paddingVertical: 40, paddingHorizontal: 25, alignItems: 'center', justifyContent: 'space-around', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
            {/*<Text></Text>*/}
            <Input>
              <MaterialCommunityIcons  name={"email-outline"} size={28} color={colors.black.full} />
              <Input.Field  placeholder="Digite seu email" onChangeText={setModalEmail}/>
            </Input>
            <Button onPress={sendEmail} title={"Enviar email"} color={colors.green.default}/>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Svg height="270" width="388" viewBox="0 0 340 160">
          <Path
            d="M-0.711029 -99.6099C49.5986 -118.636 95.2239 -113.112 198.411 -75.508C287.529 -43.025 399.567 -38.0884 489.407 21.1366C529.734 47.7207 543.02 105.082 490.37 134.904C437.718 164.727 358.976 118.315 220.22 176.293C93.219 229.36 -54.8152 168.667 -73.3503 32.0265C-81.2703 -26.3646 -51.4387 -80.4275 -0.711029 -99.6099Z"
            fill="url(#paint0_linear_34_119)"
          />
          <Defs>
            <LinearGradient id="paint0_linear_34_119" x1="-81.1305" y1="1.98238" x2="360.534" y2="334.479" gradientUnits="userSpaceOnUse">
              <Stop offset="0.105" stopColor="#9E45D4"/>
              <Stop offset="0.72" stopColor="#301E36"/>
            </LinearGradient>
          </Defs>
        </Svg>
        <Image source={require("@/assets/images/icon.png")} style={styles.imageHeader} resizeMode="contain"  />
      </View>
      <Text style={styles.text}>Bem-vindo(a)</Text>
      <Input>
        <MaterialCommunityIcons style={styles.icon} name={"email-outline"} size={28} color={colors.black.full} />
        <Input.Field  placeholder="Digite seu email" onChangeText={setEmail}/>
      </Input>
      <Input>
        <MaterialCommunityIcons style={styles.icon} name={"key-outline"} size={28} color={colors.black.full} />
        <Input.Field passwordIcon={true} onTogglePasswordVisibility={() => setShowPassword(!showPassword)} showPassword={showPassword} secureTextEntry={!showPassword} placeholder="Digite sua senha" onChangeText={setPassword}/>
      </Input>
      <TouchableOpacity style={styles.link} onPress={() => setShowModal(true)}>
        <Text>Esqueceu a senha?</Text></TouchableOpacity>
      <Button isLoading={loading} title="Entrar" onPress={login} color={colors.green.default}/>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>OU</Text>
      <Button isLoading={loading} icon={true} onPress={googleLogin} title="Entrar com o Google" color={colors.purple.default}/>
      <Text style={{fontSize: 14, marginTop: 12}}>Não possui cadastro? <Link style={styles.signUp} href="/sign-up" >Cadastre-se</Link></Text>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: '100%',
    height: 320,
    marginTop: -120,
    marginBottom: -30,
    alignItems: 'center',
  },
  imageHeader : {
    position: "absolute",
    height: 330
  },
  icon: {
    paddingLeft: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: "flex-start",
    padding: 25,
  },
  link: {
    fontSize: 12,
    fontFamily: fontFamily.plight,
    color: colors.gray["300"],
    alignSelf: "flex-end",
    padding: 10,
    paddingRight: 20,
  },
  signUp: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  }

})
