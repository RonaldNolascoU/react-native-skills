import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "navigation/AppNavigator";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

function MainApp() {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="auto" />
      <Toast topOffset={top} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}
