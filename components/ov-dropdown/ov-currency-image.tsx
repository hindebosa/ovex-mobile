import { ICurrency } from "@/types/currencies.type";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { OVText } from "../ov-text";

// Currency image component
export const OVCurrencyImage = ({ currency }: { currency: ICurrency }) => {
  if (currency.icon_url) {
    return (
      <View style={styles.currencyIconContainer}>
        <Image
          source={{ uri: currency.icon_url }}
          style={styles.currencyIcon}
          resizeMode="contain"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.currencySymbolContainer}>
        <OVText style={styles.currencySymbol}>
          {currency.symbol || currency.id}
        </OVText>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  currencySymbolContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  currencySymbol: {
    fontSize: 12,
    fontWeight: "bold",
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
});
