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
    <TextInput style={styles.Field} {...props} placeholderTextColor={colors.gray[200]} />
  )
}

Input.Field = Field

export { Input }

// className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg"
// className="flex-1 text-white text-base font-regular"
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
    color: colors.white.full,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.pregular,
    marginRight:10,
    borderBottomWidth: 1,
  }
})