import { fontFamily } from "@/src/styles/fontFamily";
import React from "react";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function HeaderHome() {
    return(
        <View style={styles.conteiner}>
            <View style={styles.profileContainer}>
                <Image source={require("@/assets/images/userImageTest.jpg")} style={styles.userImage}/>
            <View>
                <Text style={styles.textStyle}>Bem-vindo(a),</Text>
                <Text style={styles.textStyle}>*username*</Text>
            </View>
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput placeholder="Pesquisar" style={styles.textInput} />
                <FontAwesome name="search" style={styles.searchButton} size={24} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    conteiner:{
        padding: 20,
        paddingTop: 55,
        backgroundColor: '#D3A9F4',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderColor: '#000',
        borderWidth: 1.5,
    },
    userImage : {
        width: 45,
        height: 45,
        borderRadius: 99,
    },
    textStyle :{
        fontFamily: fontFamily.pmedium,
        fontSize: 17,
    },
    textInput:{
        fontFamily: fontFamily.pregular,
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '85%',
        borderColor: '#000',
        borderWidth: 1.5,
    },
    searchButton:{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1.5,
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchBarContainer:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
})