import React from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export const OVSafeAreaView = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) => {
  return Platform.OS === "ios" ? (
    <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
  ) : (
    <View style={[styles.safeArea, styles.androidSafeArea, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
