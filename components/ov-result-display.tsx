import { View, StyleSheet } from "react-native";
import { OVText } from "./ov-text";
import { useHome } from "@/providers/home.provider";
import { calculateSingleUnitValue } from "@/util/currency";

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
        <View style={styles.singleConvertorView}>
          <OVText style={styles.singleLabel} weight="regular">
            1 {conversionResult.from_currency.toUpperCase()} =
            {calculateSingleUnitValue(
              parseFloat(conversionResult.from_amount),
              parseFloat(conversionResult.to_amount)
            )}
          </OVText>
          <OVText style={styles.singleLabel} weight="regular">
            1 {conversionResult.to_currency.charAt(0).toUpperCase()} =
            {calculateSingleUnitValue(
              parseFloat(conversionResult.to_amount),
              parseFloat(conversionResult.from_amount)
            )}
          </OVText>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  resultRow: {
    marginTop: -10,
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
  singleLabel: {
    fontSize: 15,
    color: "#8E8D99",
  },
  singleConvertorView: {
    marginTop: 10,
    paddingBottom: 5,
  },
});

export default OVResultsDisplay;
