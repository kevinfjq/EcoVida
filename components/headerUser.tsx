import { fontFamily } from "@/src/styles/fontFamily";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {colors} from "@/src/styles/colors";


export default function HeaderUser() {
    return(
        <View style={styles.conteiner}>
            <View style={styles.profileContainer}>
                <Image source={require("@/assets/images/userImageTest.jpg")} style={styles.userImage}/>
            <View>
                <Text style={styles.textStyle}>{FIREBASE_AUTH.currentUser? FIREBASE_AUTH.currentUser.displayName: "username"}</Text>
            </View>
            </View>
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
        width: 45,
        height: 45,
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