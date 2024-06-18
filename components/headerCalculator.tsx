import { fontFamily } from "@/src/styles/fontFamily";
import React from "react";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";

export default function HeaderCalculator() {
    return(
        <View style={styles.conteiner}>
            <View style={styles.profileContainer}>
                <Image source={require("@/assets/images/userImageTest.jpg")} style={styles.userImage}/>
            <View>
                <Text style={styles.textStyle}>*username*</Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    conteiner:{
        padding: 20,
        paddingTop: 40,
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