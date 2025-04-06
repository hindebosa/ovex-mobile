import { View, StyleSheet } from "react-native";
import { OVText } from "./ov-text";
import { useHome } from "@/providers/home.provider";

export const OVResultsDisplay = () => {
  const { conversionResult, sourceSelectedCurrency } = useHome();
  return (
    conversionResult && (
      <View style={styles.resultRow}>
        <OVText style={styles.resultLabel} weight="bold">
          {`${conversionResult.from_currency.toUpperCase()} ${
            conversionResult.from_amount
          } ${sourceSelectedCurrency?.name} = `}
        </OVText>
        <OVText style={styles.resultValue} weight="bold">
          {`${conversionResult.to_amount} ${
            conversionResult.to_currency.charAt(0).toUpperCase() +
            conversionResult.to_currency.slice(1).toLowerCase()
          }`}
        </OVText>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  resultRow: {
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 22,

    paddingVertical: 2,
  },
  resultLabel: {
    fontSize: 16,
  },
  resultValue: {
    fontSize: 25,
  },
});

export default OVResultsDisplay;
