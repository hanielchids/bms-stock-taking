import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";

import Navigation from "./src/navigation";

Amplify.configure(awsconfig);

const App = () => {
  const [fontsLoaded] = useFonts({
    "Space Grotesk": require("./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
  });

  // Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});

export default App;
