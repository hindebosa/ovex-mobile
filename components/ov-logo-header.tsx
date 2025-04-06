import React from "react";
import { useColorScheme, View, StyleSheet, Text } from "react-native";
import CompanyLogo from "../assets/icons/home/ic-company-logo.svg";
import { Colors } from "@/constants/Colors";

export const LogoHeader = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const logoColor = theme.headerText;

  return (
    <View style={styles.logoContainer}>
      <CompanyLogo width={75} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
