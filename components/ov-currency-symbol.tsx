import React from "react";
import {
  TouchableOpacity,
  useColorScheme,
  View,
  StyleSheet,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { OVText } from "./ov-text";

interface CurrencySymbolProps {
  symbol: string;
  onPress?: () => void;
}

export const OVCurrencySymbol: React.FC<CurrencySymbolProps> = ({
  symbol,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component onPress={onPress} style={styles.currencyContainer}>
      <OVText style={styles.currencySymbol}>{symbol}</OVText>
    </Component>
  );
};

const styles = StyleSheet.create({
  currencyContainer: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 21.6,
    fontWeight: 700,
  },
});
