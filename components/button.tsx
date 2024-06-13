import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {colors} from "@/src/styles/colors";
import {fontFamily} from "@/src/styles/fontFamily";
import {MaterialCommunityIcons} from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  title: string,
  isLoading?: boolean,
  color: string,
  icon?: boolean
}

export function Button({title, isLoading = false, color, icon, ...rest}: Props) {
  return(
    <TouchableOpacity disabled={isLoading} activeOpacity={0.7} {...rest}  style={[styles.touchable, {backgroundColor: color}]}>
      {
        isLoading ? (<ActivityIndicator />)
          : icon? (
            <View style={styles.container}>
              <Image style={styles.image} source={require("@/assets/images/icons/google-icon.png")}/>
              <Text style={styles.text}>{title}</Text>
            </View>
          ):
          (<Text style={styles.text}>{title}</Text>)
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  image: {
    width: 24,
    height: 24
  },
  touchable:{
    width: '80%',
    paddingVertical: 2,
    paddingHorizontal: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  text: {
    fontSize: 18,
    fontFamily: fontFamily.psemibold,
  }
})