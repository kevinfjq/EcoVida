import {Stack, Tabs} from "expo-router";
import Toast from "react-native-toast-message";
import {Image, StyleSheet, Text, View} from "react-native";
import {fontFamily} from "@/src/styles/fontFamily";
import {colors} from '@/src/styles/colors';

type TabIconProps = {
  iconName: undefined
  color?: string
  name?: string
  focused: boolean
}

function TabIcon ({iconName, color, name, focused}: TabIconProps) {
  return (
    <View style={styles.TabIcon}>
      <Image source={iconName} resizeMode="contain" tintColor={color} style={styles.TabIconImage}/>
      <Text style={[focused? {fontFamily: fontFamily.psemibold} : {fontFamily: fontFamily.pregular}, {fontSize: 12, color: color}]}>{name}</Text>
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
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/home.png")} color={color} focused={focused} name="Inicio"/>
                       )
                     }}
        />
        <Tabs.Screen name="calculatorScreen"
                     options={{
                       title: "Home",
                       headerShown: false,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/calc.png")} color={color} focused={focused} name="Calculadora"/>
                       )
                     }}
        />
        <Tabs.Screen name="productScreen"
                     options={{
                       title: "Home",
                       headerShown: false,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/bag.png")} color={color} focused={focused} name="Produtos"/>
                       )
                     }}
        />
        <Tabs.Screen name="userScreen"
                     options={{
                       title: "Home",
                       headerShown: false,
                       tabBarIcon: ({color, focused}) => (
                           <TabIcon iconName={require("@/assets/images/icons/profile.png")} color={color} focused={focused} name="Perfil"/>
                       )
                     }}
        />
      </Tabs>
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