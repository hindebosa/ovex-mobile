import {
  ICurrency,
  IDestinationCurrencyType,
  TradingPair,
  TradingPairsByQuoteCurrency,
} from "@/types/currencies.type";

export const groupByQuoteCurrency = (
  pairs: TradingPair[]
): TradingPairsByQuoteCurrency => {
  return pairs.reduce((acc, pair) => {
    const quoteCurrency = pair.quote_currency;
    if (!acc[quoteCurrency]) {
      acc[quoteCurrency] = [];
    }
    acc[quoteCurrency].push(pair);
    return acc;
  }, {} as TradingPairsByQuoteCurrency);
};

export const filterCurrenciesByTradingPairs = (
  currencies: ICurrency[],
  tradingPairs: { base_currency: string; id: string }[]
) => {
  if (!currencies || !tradingPairs) return [];

  // Create a map of currency IDs to their trading pair IDs
  const currencyToPairMap = new Map<string, string>();

  tradingPairs.forEach((pair) => {
    currencyToPairMap.set(pair.base_currency, pair.id);
  });

  // Filter currencies and add trading pair ID as market
  return currencies
    .filter((currency) => currencyToPairMap.has(currency.id))
    .map((currency) => ({
      ...currency,
      market: currencyToPairMap.get(currency.id) || "",
    })) as IDestinationCurrencyType[];
};
