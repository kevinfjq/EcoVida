import {StyleSheet, TextInput, TextInputProps, View,} from "react-native";
import {colors} from "@/src/styles/colors";
import {ReactNode} from "react";
import {fontFamily} from "@/src/styles/fontFamily";

function Input({children}: {children: ReactNode}) {
  return (
    <View style={styles.Input}>
      {children}
    </View>
  )
}

function Field(props: TextInputProps) {
  return (
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