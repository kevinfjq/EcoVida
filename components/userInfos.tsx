import { fontFamily } from '@/src/styles/fontFamily';
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import {db, FIREBASE_AUTH} from "@/firebaseConfig";
import {deleteUser, onAuthStateChanged, signOut, updatePassword, updateProfile} from "@firebase/auth";
import Toast from "react-native-toast-message";
import * as Updates from "expo-updates";
import * as ImagePicker from "expo-image-picker";
import {colors} from "@/src/styles/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {deleteDoc, doc, setDoc} from "@firebase/firestore";

const UserInfos: React.FC = () => {
  const user = FIREBASE_AUTH.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePhoto, setShowChangePhoto] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [image, setImage] = useState<string | null >(user && user.photoURL && user.photoURL.trim().length > 0? user.photoURL : null);


  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if(!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function changePassword() {
    if(user){
      await updatePassword(user, password)
        .then(() => {
          Toast.show({
            text1: "Senha alterada com sucesso"
          })
        })
        .catch((error) => {
          const errorCode = "Falha ao alterar a senha!";
          let errorMessage;
          if(error.code == "auth/credential-already-in-use" || error.code == "auth/email-already-in-use") {
            errorMessage = "Email já cadastrado.";
          }
          else if(error.code == "auth/invalid-email"){
            errorMessage = "Endereço de email inválido.";
          }
          else if(error.code == "auth/timeout"){
            errorMessage = "Operação expirada.";
          }
          else if(error.code == "auth/internal-error" || error.code == "auth/invalid-auth-event" || error.code =="auth/no-auth-event"){
            errorMessage = "Ocorreu um erro interno.";
          }
          else if(error.code == "auth/weak-password"){
            errorMessage = "A senha deve ter 6 ou mais caracteres.";
          }
          else if(error.code == "auth/requires-recent-login") {
            errorMessage = "Necessário fazer login novamente para alterar a senha.";
          }
          console.log(error.message)
          Toast.show({
            type: 'error',
            text1: errorCode,
            text2: errorMessage,
          });
        })
      }
  }

  async function deleteAccount() {
    if(user) {
      await deleteUser(user);
      await deleteDoc(doc(db, "users", email))
      Updates.reloadAsync();
    }
  }

  async function updatePhoto() {
    if(user) {
      await updateProfile( user, {photoURL: image});
    }
  }

  async function saveChanges() {
    if(user) {
      if(name && name.trim().length>2) {
        try {
          await updateProfile(user, {displayName: name})
          updatePhoto();
          await setDoc(doc(db, "users", email), {username: name, photoURL: image}, {merge: true})
          Toast.show({
            text1: "Alterações feitas!",
            visibilityTime: 2500
          })

        }
        catch (error) {
          Toast.show({
             text1: "Erro ao salvar alterações.",
          });
        }
      }
    }
  }

  async function deletePhoto() {
    setImage("");
    if(user){
      await updatePhoto()
    }
  }

  const auth = FIREBASE_AUTH;
  async function logout() {
    try{
      await signOut(FIREBASE_AUTH);
      Toast.show({
        text1: "Até mais!"
      })

    } catch (error) {
      Toast.show({
        text1: "Erro ao sair.",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
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
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.profileContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setShowChangePhoto(true)}>
          <Image source={image? {uri: image} : require("@/assets/images/userImageTest.jpg")} style={styles.userImage}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={email}
        editable={false}
      />



      <TouchableOpacity style={{width: '100%', justifyContent: 'flex-start'}} onPress={() => setShowChangePassword(true)}>
        <Text style={{fontFamily: fontFamily.pmedium, textDecorationLine: 'underline', color: colors.purple["200"]}}>Mudar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{width: '100%', justifyContent: 'flex-start', marginTop: 40}} onPress={() => setShowDeleteAccount(true)}>
        <Text style={{fontFamily: fontFamily.pmedium, textDecorationLine: 'underline', color: "#CC4444"}}>Excluir conta</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 40, gap: 15, justifyContent: 'space-around'}}>
      <TouchableOpacity onPress={saveChanges} style={{ paddingHorizontal: 20, paddingVertical: 16, backgroundColor: colors.green["100"], margin: 20, width: 170 , alignItems: 'center', borderWidth: 0.8, borderRadius: 5}}>
          <Text style={{fontFamily: fontFamily.psemibold, fontSize: 12, color: colors.gray.default}}>Salvar alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}  style={{paddingHorizontal: 10, paddingVertical: 12, backgroundColor: colors.purple["100"], marginVertical: 20, width: 170, justifyContent: 'center' ,alignItems: 'center', borderWidth: 0.8 , borderRadius: 5}}>
          <Text style={{fontFamily: fontFamily.psemibold, fontSize: 12, textAlign: 'center',color: colors.gray.default}}>Sair</Text>
        </TouchableOpacity>
      </View>



      <Modal
        transparent={true}
        animationType="slide"
        visible={showDeleteAccount}
        onRequestClose={() => setShowDeleteAccount(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja mesmo deletar sua conta?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, {backgroundColor: "#CC4444"}]} onPress={() => {
                deleteAccount();
                setShowDeleteAccount(false);
              }}>
                <Text style={styles.modalButtonText}>Deletar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowDeleteAccount(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/*<Modal*/}
      {/*  transparent={true}*/}
      {/*  animationType="slide"*/}
      {/*  visible={showChangePassword}*/}
      {/*  onRequestClose={() => setShowChangePassword(false)}*/}
      {/*>*/}
      {/*  <View style={styles.modalContainer}>*/}
      {/*    <View style={styles.modalContent}>*/}
      {/*      <Text style={styles.modalTitle}>Mudar Senha</Text>*/}
      {/*      <TextInput*/}
      {/*        style={styles.input}*/}
      {/*        value={password}*/}
      {/*        onChangeText={setPassword}*/}
      {/*        placeholder="Digite sua nova senha"*/}
      {/*        secureTextEntry*/}
      {/*      />*/}
      {/*      <Button title="Salvar" onPress={() => setShowChangePassword(false)} />*/}
      {/*      <Button title="Cancelar" onPress={() => setShowChangePassword(false)} />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Modal>*/}

      <Modal
        transparent={true}
        animationType="slide"
        visible={showChangePassword}
        onRequestClose={() => setShowChangePassword(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mudar Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua nova senha"
              secureTextEntry
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                changePassword();
                setShowChangePassword(false);
              }}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowChangePassword(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showChangePhoto}
        onRequestClose={() => setShowChangePhoto(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <Text style={[styles.modalTitle, {flexGrow: 3, textAlign: 'center'}]}>Mudar Foto</Text>
              <TouchableOpacity style={styles.modalButtonClose} onPress={() => {
                setShowChangePhoto(false)
              }}>
                <MaterialCommunityIcons name={"close-thick"} size={15} style={styles.modalButtonText}/>
              </TouchableOpacity>
            </View>
            <Image source={image? {uri: image} : require("@/assets/images/userImageTest.jpg")} style={{width: 128, height: 128, borderRadius: 20, borderWidth: 0.8, borderColor: colors.black.full}} />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                <MaterialCommunityIcons name={"image"} size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={deletePhoto}>
                <MaterialCommunityIcons name={"image-remove"} size={24} />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontFamily: fontFamily.pbold,
      textAlign: 'center',
    },
    label: {
      alignSelf: 'flex-start',
      fontFamily: fontFamily.pmedium,
      fontSize: 16,
      marginVertical: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 20,
    },
    disabledInput: {
      backgroundColor: '#e0e0e0',
    },
    textStyle :{
      color: colors.white.full,
      paddingTop: 5,
      fontFamily: fontFamily.pmedium,
      fontSize: 17,
    },
    profileContainer:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    userImage : {
      borderWidth: 0.5,
      borderColor: colors.gray.default,
      width: 124,
      height: 124,
      borderRadius: 99,
    },
    button: {
      backgroundColor: '#D3A9F4',
      width: "80%",
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      borderWidth: 0.8,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      marginVertical: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: fontFamily.pbold,
      color: '#000',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      fontFamily: fontFamily.pbold,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    modalButton: {
      backgroundColor: '#D3A9F4',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 15,
      borderWidth: 0.8,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButtonClose: {
      backgroundColor: '#D3A9F4',
      height: 30,
      marginLeft: -30,
      paddingVertical: 3,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderWidth: 0.8,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButtonText: {
      fontFamily: fontFamily.pbold,
      color: '#000',
    },
  });

export default UserInfos;
