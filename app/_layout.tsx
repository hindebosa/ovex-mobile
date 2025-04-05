import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Fonts } from "@/constants/Fonts";
import { LogoHeader } from "@/components/ov-logo-header";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [loaded] = useFonts({
    GilroyRegular: require("../assets/fonts/Gilroy/Gilroy-Regular.ttf"),
    GilroyMedium: require("../assets/fonts/Gilroy/Gilroy-Medium.ttf"),
    GilroyBold: require("../assets/fonts/Gilroy/Gilroy-Bold.ttf"),

    GilroySemiBold: require("../assets/fonts/Gilroy/Gilroy-SemiBold.ttf"),
    GilroyBlack: require("../assets/fonts/Gilroy/Gilroy-Black.ttf"),
    GilroyThin: require("../assets/fonts/Gilroy/Gilroy-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Stack
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.headerBackground,
              },
              headerTintColor: theme.headerText,
              headerTitleStyle: {
                fontFamily: Fonts.primary.regular,
              },
              headerTitleComponent: () => <LogoHeader />,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                title: "Not Found",
              }}
            />
          </Stack>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
