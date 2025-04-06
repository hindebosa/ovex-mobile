import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { OVCurrencySymbol } from "./ov-currency-symbol";
import { OVDropdown } from "./ov-dropdown/ov-dropdown";
import { OVText } from "./ov-text";
import { OVDownArrow } from "./ov-down-arrow";
import { OVCurrencyImage } from "./ov-dropdown/ov-currency-image";

import { ICurrency } from "@/types/currencies.type";
import { useHome } from "@/providers/home.provider";

type OVConvertorViewProps = {
  openCurrencySelector: (type: "target" | "destination") => void;
  sourceSelectedCurrency: ICurrency | null;
  destinationSelectedCurrency?: ICurrency | null;
};

const OVConverterView: FC<OVConvertorViewProps> = ({
  openCurrencySelector,
  sourceSelectedCurrency,
  destinationSelectedCurrency,
}) => {
  const { sourceAmount, setSourceAmount } = useHome();

  return (
    <View style={styles.convertView}>
      <OVText style={styles.targetLabel}>SOURCE AMOUNT</OVText>
      <OVDropdown
        value={sourceAmount}
        onChangeText={setSourceAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        leftAdornment={
          sourceSelectedCurrency ? (
            <OVCurrencySymbol symbol={sourceSelectedCurrency?.symbol} />
          ) : (
            <OVCurrencySymbol symbol={"$"} />
          )
        }
        rightAdornment={
          sourceSelectedCurrency ? (
            <OVCurrencySymbol
              symbol={sourceSelectedCurrency?.id.toUpperCase()}
            />
          ) : (
            <OVCurrencySymbol symbol={"USD"} />
          )
        }
      />
      <View>
        <OVText style={styles.targetLabel}>SOURCE CURRENCY</OVText>
        <OVDropdown
          value={
            sourceSelectedCurrency
              ? `${sourceSelectedCurrency.id.toUpperCase()} ${
                  sourceSelectedCurrency.name
                }`
              : ""
          }
          placeholder="Select a Source Currency"
          leftAdornment={
            sourceSelectedCurrency ? (
              <OVCurrencyImage currency={sourceSelectedCurrency} />
            ) : null
          }
          rightAdornment={
            <TouchableOpacity onPress={() => openCurrencySelector("target")}>
              <OVDownArrow />
            </TouchableOpacity>
          }
          editable={false}
        />
      </View>
      {sourceSelectedCurrency && (
        <View>
          <OVText style={styles.targetLabel}>DESTINATION CURRENCY</OVText>
          <OVDropdown
            value={
              destinationSelectedCurrency
                ? `${destinationSelectedCurrency.id.toUpperCase()} ${
                    destinationSelectedCurrency.name
                  }`
                : ""
            }
            placeholder="Select a Destination"
            leftAdornment={
              destinationSelectedCurrency ? (
                <OVCurrencyImage currency={destinationSelectedCurrency} />
              ) : null
            }
            rightAdornment={
              <TouchableOpacity
                onPress={() => openCurrencySelector("destination")}
              >
                <OVDownArrow />
              </TouchableOpacity>
            }
            editable={false}
          />
        </View>
      )}
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
    marginBottom: 8,
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

export default OVConverterView;
