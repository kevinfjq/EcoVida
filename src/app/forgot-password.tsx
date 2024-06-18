import {View, Text} from "react-native";
import {sendPasswordResetEmail} from "@firebase/auth";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {Input} from "@/components/input";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "@/src/styles/colors";
import {useState} from "react";
import {Button} from "@/components/button";
import Toast from "react-native-toast-message";

export default function ForgotPassword() {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  async function sendEmail() {
    await sendPasswordResetEmail(auth, email)
      .then((result) => {
        Toast.show({
          type: 'success',
          text1: 'Email enviado!'
        })
      })
  }
  return(
    <View>
      <Input>
        <MaterialCommunityIcons style={{paddingLeft: 15}} name={"email-outline"} size={28} color={colors.black.full} />
        <Input.Field  placeholder="Digite seu email" onChangeText={setEmail}/>
      </Input>
      <Button onPress={sendEmail} title={"Enviar email"} color={colors.green.default}/>
    </View>
  )
}