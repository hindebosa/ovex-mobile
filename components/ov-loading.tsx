import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { OVText } from "./ov-text";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "react-native/Libraries/NewAppScreen";

const OVLoading = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.tint} />
      <OVText style={styles.loadingText}>Loading currencies...</OVText>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default OVLoading;
