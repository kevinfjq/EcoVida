import { fontFamily } from '@/src/styles/fontFamily';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FIREBASE_AUTH } from "@/firebaseConfig";

const UserInfos: React.FC = () => {
  const [name, setName] = useState(FIREBASE_AUTH.currentUser?.displayName || '');
  const [email, setEmail] = useState(FIREBASE_AUTH.currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePhoto, setShowChangePhoto] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PERFIL</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={email}
        editable={false}
      />

    <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />

      <TouchableOpacity style={styles.button} onPress={() => setShowChangePassword(true)}>
        <Text style={styles.buttonText}>Mudar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setShowChangePhoto(true)}>
        <Text style={styles.buttonText}>Mudar Foto</Text>
      </TouchableOpacity>

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
            <Button title="Salvar" onPress={() => setShowChangePassword(false)} />
            <Button title="Cancelar" onPress={() => setShowChangePassword(false)} />
          </View>
        </View>
      </Modal>

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
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowChangePassword(false)}>
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
            <Text style={styles.modalTitle}>Mudar Foto</Text>
            {/* Implementar funcionalidade de mudança de foto */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowChangePhoto(false)}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowChangePhoto(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
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
      justifyContent: 'center',
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
    button: {
      backgroundColor: '#D3A9F4',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      borderWidth: 1.5,
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
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      borderWidth: 1.5,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      marginHorizontal: 50,
    },
    modalButtonText: {
      fontSize: 14,
      fontFamily: fontFamily.pbold,
      color: '#000',
    },
  });

export default UserInfos;
