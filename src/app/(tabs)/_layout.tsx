import { Tabs} from "expo-router";
import Toast from "react-native-toast-message";
import {Image, StyleSheet, Text, View} from "react-native";
import {fontFamily} from "@/src/styles/fontFamily";
import {colors} from '@/src/styles/colors';

type TabIconProps = {
  iconName: undefined
  color?: string
  name?: string
  size?:number
  focused: boolean
}

function TabIcon ({iconName, color, name, focused,size}: TabIconProps) {
  return (
    <View style={styles.TabIcon}>
      <Image source={iconName} resizeMode="contain" tintColor={color} style={styles.TabIconImage}/>
      <Text style={[focused? {fontFamily: fontFamily.psemibold} : {fontFamily: fontFamily.pregular}, {fontSize: size || 12, color: color}]}>{name}</Text>
    </View>
  )
}

export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple.default,
        tabBarInactiveTintColor: colors.gray["100"],
        tabBarStyle: {
          backgroundColor: colors.green["200"],
          borderTopWidth: 1,
          borderTopColor: "#9F9FAF",
          height: 76,
        }
      }}>
        <Tabs.Screen name="home"
                     options={{
                       title: "Home",
                       headerShown: false,
                       unmountOnBlur: true,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/home.png")} color={color} focused={focused} name="Inicio"/>
                       )
                     }}
        />
        <Tabs.Screen name="calculatorScreen"
                     options={{
                       title: "Calculator",
                       headerShown: false,
                       unmountOnBlur: true,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/calc.png")} color={color} size={10} focused={focused} name="Calculadora"/>
                       )
                     }}
        />
        <Tabs.Screen name="productScreen"
                     options={{
                       title: "Products",
                       headerShown: false,
                       unmountOnBlur: true,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/bag.png")} color={color} focused={focused} name="Produtos"/>
                       )
                     }}
        />
        <Tabs.Screen name="habitsScreen"
                     options={{
                       title: "Habits",
                       headerShown: false,
                       unmountOnBlur: true,
                       tabBarIcon: ({color, focused}) => (
                         <TabIcon iconName={require("@/assets/images/icons/chart-bar-big.png")} color={color} focused={focused} name="Hábitos"/>
                       )
                     }}
        />
        <Tabs.Screen name="userScreen"
                     options={{
                       title: "User",
                       headerShown: false,
                       unmountOnBlur: true,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/profile.png")} color={color} focused={focused} name="Perfil"/>
                       )
                     }}
        />
      </Tabs>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  TabIcon: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },

  TabIconImage: {
    width: 24,
    height: 24,
  }
})