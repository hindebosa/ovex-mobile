import OVConvertorView from "@/components/ov-convertor-view";
import OVCurrencySelector from "@/components/ov-currency-selector/ov-currency-selector";
import { OVModal } from "@/components/ov-modal";
import OVResultsDisplay from "@/components/ov-result-display";
import { OVText } from "@/components/ov-text";
import { useHome } from "@/providers/home.provider";
import { ICurrency, IDestinationCurrencyType } from "@/types/currencies.type";
import { filterCurrenciesByTradingPairs } from "@/util/currency";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

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
    currencyId,
    sourceAmount,
  } = useHome();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <OVText weight="bold" style={styles.header}>
            Convert Currency
          </OVText>
          <OVConvertorView />
        </View>
        <OVResultsDisplay />
        <View style={styles.convertView}>
          <TouchableOpacity
            style={[
              styles.convertButton,
              (isLoading ||
                !destinationSelectedCurrency ||
                sourceAmount === "0") &&
                styles.convertButtonDisabled,
            ]}
            onPress={handleConvertCurrency}
            disabled={
              isLoading || !destinationSelectedCurrency || sourceAmount === "0"
            }
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
          title="Select Currency"
          visible={isTargetCurrencyModalVisible}
          onClose={() => setIsTargetCurrencyModalVisible(false)}
        >
          <OVCurrencySelector
            // If the active currency selector is "target", use the full source currencies list.
            // Otherwise, filter the source currencies by trading pairs based on the selected market and currency ID.
            sourceCurrencies={
              activeCurrencySelector === "target"
                ? sourceCurrenciesList
                : filterCurrenciesByTradingPairs(
                    sourceCurrenciesList || [],
                    markets?.[currencyId] || []
                  )
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
                ? (currency) =>
                    handleTargetCurrencySelect(currency as ICurrency)
                : (currency) =>
                    handleDestinationCurrencySelect(
                      currency as IDestinationCurrencyType
                    )
            }
          />
        </OVModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 37.1,
    marginBottom: 10,
    color: "#000",
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
  convertButtonDisabled: {
    backgroundColor: "#A6A6A6",
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
