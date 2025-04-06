import OVConvertorView from "@/components/ov-convertor-view";
import OVCurrencySelector from "@/components/ov-currency-selector/ov-currency-selector";
import { OVModal } from "@/components/ov-modal";
import OVResultsDisplay from "@/components/ov-result-display";
import { OVText } from "@/components/ov-text";
import { useHome } from "@/providers/home.provider";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const HomeView = () => {
  const {
    destinationSelectedCurrency,
    sourceSelectedCurrency,
    handleConvertCurrency,
    isLoading,
    error,
    openCurrencySelector,
    isTargetCurrencyModalVisible,
    setIsTargetCurrencyModalVisible,
    activeCurrencySelector,
    handleTargetCurrencySelect,
    handleDestinationCurrencySelect,
    sourceCurrenciesList,
    markets,
    targetCurrency,
  } = useHome();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <OVText weight="bold">Convert Currency</OVText>
        <OVConvertorView
          destinationSelectedCurrency={destinationSelectedCurrency}
          openCurrencySelector={openCurrencySelector}
          sourceSelectedCurrency={sourceSelectedCurrency}
        />
        <OVResultsDisplay />
      </View>
      <View style={styles.convertView}>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={handleConvertCurrency}
          disabled={isLoading || !destinationSelectedCurrency}
        >
          <OVText style={styles.convertButtonText}>
            {isLoading ? "Converting..." : "Convert"}
          </OVText>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <OVText style={styles.errorText}>{error}</OVText>
        </View>
      )}
      <OVModal
        visible={isTargetCurrencyModalVisible}
        onClose={() => setIsTargetCurrencyModalVisible(false)}
      >
        <OVCurrencySelector
          sourceCurrencies={
            activeCurrencySelector === "target"
              ? sourceCurrenciesList
              : sourceCurrenciesList?.filter((currency) => {
                  // When selecting destination currency, filter based on available trading pairs
                  const pair = markets?.[targetCurrency];
                  if (!pair) return false;

                  // Get all base currencies from trading pairs
                  const baseCurrencies = Object.values(pair).map(
                    (p: any) => p.base_currency
                  );

                  // Only show currencies that have trading pairs with the target currency
                  return baseCurrencies.includes(currency.id);
                })
          }
          destinationCurrency={
            activeCurrencySelector === "target"
              ? undefined
              : destinationSelectedCurrency
          }
          selectedCurrency={
            activeCurrencySelector === "target"
              ? targetCurrency
              : destinationSelectedCurrency?.id
          }
          onSelect={
            activeCurrencySelector === "target"
              ? handleTargetCurrencySelect
              : handleDestinationCurrencySelect
          }
        />
      </OVModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: "5%",

    justifyContent: "center",
    alignItems: "center",
  },
  convertView: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#FAFAFC",
  },
  targetLabel: {
    marginTop: 20,
    fontWeight: 400,
    fontSize: 12.5,
    color: "#8E8D99",
  },
  hiddenLink: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  currencyIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
  },
  currencyIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  convertButton: {
    backgroundColor: "#00bb6d",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  convertButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 30,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A6BBE229",
    backgroundColor: "#FFFFFF",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  resultRow: {
    justifyContent: "space-between",
    marginBottom: 12,
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
  messageContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF8E1",
  },
  messageText: {
    fontSize: 14,
    color: "#FF9800",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
  },
  errorText: {
    fontSize: 14,
    color: "#F44336",
    textAlign: "center",
  },
  debugContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF8E1",
  },
  debugText: {
    fontSize: 14,
    color: "#8E8D99",
    textAlign: "center",
  },
});

export default HomeView;
