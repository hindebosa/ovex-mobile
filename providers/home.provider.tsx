import {
  getMarkets,
  getAllCurrencies,
  postConvertCurrency,
} from "@/services/convertor.service";
import {
  ICurrency,
  ICurrencyConversionResponse,
  IDestinationCurrencyType,
  TradingPairsByQuoteCurrency,
} from "@/types/currencies.type";
import { filterCurrenciesByTradingPairs } from "@/util/currency";
import React, { useContext, useEffect, useMemo } from "react";
import { createContext, ReactNode, useState } from "react";

// Define the context type
interface HomeContextType {
  // State
  sourceAmount: string;
  currencyId: string;
  sourceCurrenciesList: ICurrency[] | undefined;
  targetCurrency: string;
  sourceSelectedCurrency: ICurrency | null;
  targetSelectedCurrency: ICurrency | undefined;
  destinationSelectedCurrency: IDestinationCurrencyType | undefined | null;
  isTargetCurrencyModalVisible: boolean;
  activeCurrencySelector: "target" | "destination";
  markets: TradingPairsByQuoteCurrency | undefined;
  conversionResult: ICurrencyConversionResponse | null;
  isLoading: boolean;
  error: string | null;

  // Functions
  setSourceAmount: (amount: string) => void;
  handleTargetCurrencySelect: (currency: ICurrency) => void;
  handleSourceCurrencySelect: (currency: ICurrency) => void;
  handleDestinationCurrencySelect: (currency: IDestinationCurrencyType) => void;
  openCurrencySelector: (type: "target" | "destination") => void;
  setIsTargetCurrencyModalVisible: (visible: boolean) => void;
  handleConvertCurrency: () => Promise<void>;
}

// Create the context
const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sourceAmount, setSourceAmount] = React.useState("0");
  const [currencyId, setCurrencyId] = useState("");
  const [sourceCurrenciesList, setSourceCurrenciesList] =
    useState<ICurrency[]>();

  const [activeCurrencySelector, setActiveCurrencySelector] = useState<
    "target" | "destination"
  >("target");
  const [targetSelectedCurrency, setTargetSelectedCurrency] =
    useState<ICurrency>();
  const [destinationSelectedCurrency, setDestinationSelectedCurrency] =
    React.useState<IDestinationCurrencyType | null>(null);
  const [conversionResult, setConversionResult] =
    useState<ICurrencyConversionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceSelectedCurrency, setSourceSelectedCurrency] =
    React.useState<ICurrency | null>(null);
  const [markets, setMarkets] = useState<TradingPairsByQuoteCurrency>();
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [isTargetCurrencyModalVisible, setIsTargetCurrencyModalVisible] =
    useState(false);

  const [error, setError] = useState<string | null>(null);

  // Fetch market data
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const marketData = await getMarkets();
        setMarkets(marketData);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchMarkets();
  }, []);

  useEffect(() => {
    const fetchAllCurrencies = async () => {
      try {
        const marketData = await getAllCurrencies();

        setSourceCurrenciesList(marketData);
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };

    fetchAllCurrencies();
  }, []);

  const handleSourceCurrencySelect = (currency: ICurrency) => {
    setSourceSelectedCurrency(currency);
  };

  const openCurrencySelector = (type: "target" | "destination") => {
    setActiveCurrencySelector(type);
    setIsTargetCurrencyModalVisible(true);
  };

  const handleDestinationCurrencySelect = (
    currency: IDestinationCurrencyType
  ) => {
    setDestinationSelectedCurrency(currency);
    setIsTargetCurrencyModalVisible(false);
    setConversionResult(null);
  };

  const handleTargetCurrencySelect = (currency: ICurrency) => {
    setTargetCurrency(currency.id);
    setCurrencyId(currency.id);
    const currencyId = currency.id;
    const pair = markets?.[currencyId];

    if (sourceCurrenciesList && pair) {
      const filteredCurrencies = filterCurrenciesByTradingPairs(
        sourceCurrenciesList,
        pair
      );

      setDestinationSelectedCurrency(filteredCurrencies[0]);
    }

    setSourceSelectedCurrency(currency);
    setIsTargetCurrencyModalVisible(false);
    setConversionResult(null);
  };

  const handleConvertCurrency = async () => {
    if (!destinationSelectedCurrency) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await postConvertCurrency(
        sourceAmount,
        destinationSelectedCurrency.market
      );

      if (response) {
        setConversionResult(response);
      } else {
        setError("No conversion data received");
      }
    } catch (err) {
      setError("Failed to convert currency. Please try again.");
      console.error("Conversion error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      // State
      sourceAmount,
      currencyId,
      sourceCurrenciesList,
      targetCurrency,
      sourceSelectedCurrency,
      targetSelectedCurrency,
      destinationSelectedCurrency,
      isTargetCurrencyModalVisible,
      activeCurrencySelector,
      markets,
      conversionResult,
      isLoading,
      error,

      // Functions
      setSourceAmount,
      handleTargetCurrencySelect,
      handleSourceCurrencySelect,
      handleDestinationCurrencySelect,
      openCurrencySelector,
      setIsTargetCurrencyModalVisible,
      handleConvertCurrency,
    }),
    [
      currencyId,
      sourceAmount,
      sourceCurrenciesList,
      targetCurrency,
      sourceSelectedCurrency,
      targetSelectedCurrency,
      destinationSelectedCurrency,
      isTargetCurrencyModalVisible,
      activeCurrencySelector,
      markets,
      conversionResult,
      isLoading,
      error,
      handleTargetCurrencySelect,
      handleSourceCurrencySelect,
      handleDestinationCurrencySelect,
      openCurrencySelector,
      handleConvertCurrency,
    ]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
