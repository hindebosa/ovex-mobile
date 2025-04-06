import { View, StyleSheet } from "react-native";
import { OVText } from "./ov-text";
import { useHome } from "@/providers/home.provider";

export const OVResultsDisplay = () => {
  const { conversionResult, sourceSelectedCurrency } = useHome();
  return (
    conversionResult && (
      <View style={styles.resultRow}>
        <OVText style={styles.resultValue}>
          {conversionResult.from_currency.toUpperCase()}{" "}
          {conversionResult.from_amount} {sourceSelectedCurrency?.name} =
        </OVText>
        <OVText style={styles.resultValue}>
          {conversionResult.to_amount}{" "}
          {conversionResult.to_currency.toUpperCase()}
        </OVText>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  resultRow: {
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8E8D99",
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#000",
  },
});

export default OVResultsDisplay;
