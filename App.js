import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import HomeTabs from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      <HomeTabs />
      {/* <RootNavigator /> */}
      <StatusBar style="light" />
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    // marginTop: 30,
  },
});
