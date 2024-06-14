import {Text, View, StyleSheet, Image, Alert} from "react-native";
import {Input} from "@/components/input";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/src/styles/colors";
import {Link, Redirect, router} from "expo-router";
import {fontFamily} from "@/src/styles/fontFamily";
import {Button} from "@/components/button";
import Svg, {Defs, LinearGradient, Path, Stop} from "react-native-svg";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {useEffect, useState} from "react";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (loginAttempted) {
        if (user) {
          router.push("/home");
        } else {
          Alert.alert('Falha ao entrar', 'Usuário ou senha incorreto, Tente novamente!');
        }
        setLoginAttempted(false);
      }
    });

    return () => unsubscribe();
  }, [auth, loginAttempted]);

  async function login() {
    try{
      setLoginAttempted(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setLoginAttempted(false);
          console.error("Código: " + errorCode + ": mensagem:" +errorMessage);
        })

    } catch (error) {
      setLoading(false);
      setLoginAttempted(false);
    }
  }



  return (
    <View style={styles.container}>
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
        <Input.Field secureTextEntry={true} placeholder="Digite sua senha" onChangeText={setPassword}/>
      </Input>
      <Link style={styles.link} href="/forgot-password">Esqueceu a senha?</Link>
      <Button isLoading={loading} title="Entrar" onPress={login} color={colors.green.default}/>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>OU</Text>
      <Button isLoading={loading} icon={true} title="Entrar com o Google" color={colors.purple.default}/>
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
    paddingTop: 4,
    paddingRight: 20,
  },
  signUp: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  }

})
