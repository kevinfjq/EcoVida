import {Image, StyleSheet, Text, View} from "react-native";
import Svg, {Defs, LinearGradient, Path, Stop} from "react-native-svg";
import {Input} from "@/components/input";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/src/styles/colors";
import {Link, router} from "expo-router";
import {Button} from "@/components/button";
import {useState} from "react";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {createUserWithEmailAndPassword} from "@firebase/auth";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  function signUp() {
    try{
      setLoading(true);
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          router.back();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          console.error(errorCode + ": " +errorMessage);
        })
    } catch (error){}
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg height="380" width="400" viewBox="0 0 340 240">
          <Path
            d="M-66.8492 172.958C-142.141 159.074 -180.473 93.8111 -140.311 43.1695C-71.5211 -43.5719 67.1243 -24.6125 149.462 -77.5925C195.72 -107.357 255.12 -136.165 311.889 -123.843C355.064 -114.464 398.246 -82.6113 392.234 -23.7011C386.22 35.2097 349.162 55.9887 380.043 114.114C403.283 157.872 408.683 176.387 393.704 199.045C361.259 248.117 250.767 203.97 208.839 186.037C122.081 148.94 23.53 189.642 -66.8492 172.958Z"
            fill="url(#paint0_linear_34_118)"
          />
          <Defs>
            <LinearGradient id="paint0_linear_34_118" x1="-142.861" y1="152.977" x2="409.001" y2="24.0882" gradientUnits="userSpaceOnUse">
              <Stop offset="0.415" stopColor="#185317"/>
              <Stop offset="0.64" stopColor="#102D0F"/>
            </LinearGradient>
          </Defs>
        </Svg>
        <Image source={require("@/assets/images/icon.png")} style={styles.imageHeader} resizeMode="contain"  />
      </View>
      <Text style={styles.text}>Novo Usuário</Text>
      <Input>
        <MaterialCommunityIcons style={styles.icon} name={"account-outline"} size={28} color={colors.black.full} />
        <Input.Field placeholder="Digite seu nome" onChangeText={setUsername}/>
      </Input>
      <Input>
        <MaterialCommunityIcons style={styles.icon} name={"email-outline"} size={28} color={colors.black.full} />
        <Input.Field placeholder="Digite seu email" onChangeText={setEmail}/>
      </Input>
      <Input>
        <MaterialCommunityIcons style={styles.icon} name={"key-outline"} size={28} color={colors.black.full} />
        <Input.Field secureTextEntry={true} placeholder="Digite sua senha" onChangeText={setPassword}/>
      </Input>
      <Button isLoading={loading} title="Cadastrar" onPress={signUp} color={colors.green.default}/>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>OU</Text>
      <Button isLoading={loading} icon={true} title="Entrar com o Google" color={colors.purple.default}/>
      <Text style={{fontSize: 14, marginTop: 12}}>Já possui conta? <Link style={styles.link} href="/" >Faça o login</Link></Text>
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
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },

})
