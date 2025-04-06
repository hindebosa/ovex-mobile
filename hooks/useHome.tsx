import {
  ICurrency,
  ICurrencyConversionResponse,
} from "@/types/currencies.type";

import React, { useState } from "react";

const useHome = () => {
  const [sourceAmount, setSourceAmount] = React.useState("");

  const [sourceSelectedCurrency, setSourceSelectedCurrency] =
    React.useState<ICurrency | null>(null);

  const [destinationSelectedCurrency, setDestinationSelectedCurrency] =
    React.useState<ICurrency | null>(null);

  const [activeCurrencySelector, setActiveCurrencySelector] = React.useState<
    "target" | "destination"
  >("target");

  const [conversionResult, setConversionResult] =
    useState<ICurrencyConversionResponse | null>(null);

  const [isTargetCurrencyModalVisible, setIsTargetCurrencyModalVisible] =
    React.useState(false);

  const openCurrencySelector = (type: "target" | "destination") => {
    setActiveCurrencySelector(type);
    setIsTargetCurrencyModalVisible(true);
  };

  return {
    sourceAmount,
    setSourceAmount,
    sourceSelectedCurrency,
    setSourceSelectedCurrency,
    destinationSelectedCurrency,
    setDestinationSelectedCurrency,
    activeCurrencySelector,
    isTargetCurrencyModalVisible,
    setIsTargetCurrencyModalVisible,
    openCurrencySelector,
    setActiveCurrencySelector,
    conversionResult,
    setConversionResult,
  };
};

export default useHome;
