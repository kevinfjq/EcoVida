import {Stack} from "expo-router";
import Toast from "react-native-toast-message";

export default function TabsLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen options={{headerShown: false}} name="home" />
      </Stack>
      <Toast />
    </>
  );
}