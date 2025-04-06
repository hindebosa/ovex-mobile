import {
  ICurrency,
  ICurrencyConversionResponse,
} from "@/types/currencies.type";

import React, { useState } from "react";
import { useBoolean } from "./useBoolean";

const useHome = () => {
  const [sourceAmount, setSourceAmount] = React.useState("");

  const isOpenModal = useBoolean();

  const [sourceCurrenciesList, setSourceCurrenciesList] =
    useState<ICurrency[]>();

  const [activeCurrencySelector, setActiveCurrencySelector] = React.useState<
    "target" | "destination"
  >("target");

  const [conversionResult, setConversionResult] =
    useState<ICurrencyConversionResponse | null>(null);

  // Removed isTargetCurrencyModalVisible state as isOpenModal is used for modal visibility

  const openCurrencySelector = (type: "target" | "destination") => {
    setActiveCurrencySelector(type);
  };

  return {
    sourceAmount,
    setSourceAmount,

    activeCurrencySelector,
    // Removed isTargetCurrencyModalVisible as it is no longer needed
    openCurrencySelector,
    setActiveCurrencySelector,
    conversionResult,
    setConversionResult,
    isOpenModal,
    sourceCurrenciesList,
    setSourceCurrenciesList,
  };
};

export default useHome;
