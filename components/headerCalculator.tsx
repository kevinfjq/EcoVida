import { fontFamily } from "@/src/styles/fontFamily";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import {FIREBASE_AUTH} from "@/firebaseConfig";
import {colors} from "@/src/styles/colors";


export default function HeaderCalculator() {
    const user = FIREBASE_AUTH.currentUser;
    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={user && user.photoURL && user.photoURL.trim().length > 0? {uri: user.photoURL} : require("@/assets/images/userImageTest.jpg") } style={styles.userImage}/>
            <View>
                <Text style={styles.textStyle}>{user? user.displayName: "username"}</Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
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