import {ActivityIndicator} from "react-native";
import {Redirect} from "expo-router";

export default function Page() {
  return(
    <>
      <ActivityIndicator />
      <Redirect href="/" />
    </>
  )
}