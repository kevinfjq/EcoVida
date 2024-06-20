import { fontFamily } from "@/src/styles/fontFamily";
import React from "react";
import {  View,  StyleSheet } from "react-native";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {colors} from "@/src/styles/colors";


export default function HeaderUser() {
    const user = FIREBASE_AUTH.currentUser;
    return(
        <View style={styles.conteiner}>

        </View>
    )
}

const styles = StyleSheet.create ({
    conteiner:{
        padding: 20,
        paddingTop: 40,
        backgroundColor: colors.green["100"],
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25,
        borderColor: '#000',
        borderWidth: 0.6,
    },
    userImage : {
        borderWidth: 0.5,
        borderColor: colors.gray.default,
        width: 54,
        height: 54,
        borderRadius: 99,
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
})