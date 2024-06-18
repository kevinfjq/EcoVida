import {StyleSheet, TextInput, TextInputProps, TouchableOpacity, View,} from "react-native";
import {colors} from "@/src/styles/colors";
import {ReactNode} from "react";
import {fontFamily} from "@/src/styles/fontFamily";
import {MaterialCommunityIcons} from "@expo/vector-icons";

type Props = TextInputProps &{
  passwordIcon?: boolean,
  showPassword?: boolean,
  onTogglePasswordVisibility?: () => void
}

function Input({children}: {children: ReactNode}) {
  return (
    <View style={styles.Input}>
      {children}
    </View>
  )
}

function Field({passwordIcon, showPassword, onTogglePasswordVisibility, ...props}: Props) {
  return (
    passwordIcon?
      <View style={styles.Field}>
        <View style={styles.Password}>
          <TextInput style={[styles.Field, {borderBottomWidth: 0}]}  {...props} placeholderTextColor={colors.gray[200]} />
          <TouchableOpacity onPress={onTogglePasswordVisibility}>
            <MaterialCommunityIcons style={styles.Icon} name={showPassword? "eye" : "eye-off"} size={24} color={colors.gray["200"]} />
          </TouchableOpacity>
        </View>
      </View>
      :

      <TextInput  style={styles.Field} {...props} placeholderTextColor={colors.gray[200]} />
      )
}

Input.Field = Field

export { Input }

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
  Password: {
    // backgroundColor: colors.gray[200],
    width: "100%",
    flexDirection: "row",
    fontSize: 16,
    lineHeight: 24,
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: fontFamily.pregular,
  },
  Icon: {
    marginRight: 10
  },
  Field: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    color: colors.black.full,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.pregular,
    marginRight:10,
    borderBottomWidth: 1,
    borderColor: colors.gray["300"],
    padding: 0
  }
})