import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import CaretDownIcon from "@/assets/icons/home/ic-caret-down.svg";

interface DownArrowProps {
  size?: number;
  color?: string;
}

export const OVDownArrow: React.FC<DownArrowProps> = ({ size = 16, color }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const arrowColor = color || theme.text;

  return (
    <View style={styles.container}>
      <CaretDownIcon width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
});
