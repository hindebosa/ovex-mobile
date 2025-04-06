import {
  ICurrency,
  IDestinationCurrencyType,
  TradingPair,
  TradingPairsByQuoteCurrency,
} from "@/types/currencies.type";

export const groupByQuoteCurrency = (
  pairs: TradingPair[]
): TradingPairsByQuoteCurrency => {
  // Use reduce to group trading pairs by their quote currency
  return pairs.reduce((acc, pair) => {
    const quoteCurrency = pair.quote_currency; // Extract the quote currency from the trading pair

    // If the quote currency doesn't exist in the accumulator, initialize it as an empty array
    if (!acc[quoteCurrency]) {
      acc[quoteCurrency] = [];
    }

    // Add the current trading pair to the array for the corresponding quote currency
    acc[quoteCurrency].push(pair);

    return acc; // Return the updated accumulator
  }, {} as TradingPairsByQuoteCurrency); // Initialize the accumulator as an empty object with the correct type
};

export const filterCurrenciesByTradingPairs = (
  currencies: ICurrency[],
  tradingPairs: { base_currency: string; id: string }[]
) => {
  // If either currencies or tradingPairs is not provided, return an empty array
  if (!currencies || !tradingPairs) return [];

  // Create a map to associate each currency ID with its corresponding trading pair ID
  const currencyToPairMap = new Map<string, string>();

  // Populate the map with base_currency as the key and trading pair ID as the value
  tradingPairs.forEach((pair) => {
    currencyToPairMap.set(pair.base_currency, pair.id);
  });

  // Filter the currencies to include only those that exist in the trading pairs map
  // Then, map the filtered currencies to include the trading pair ID as the "market" property
  return currencies
    .filter((currency) => currencyToPairMap.has(currency.id)) // Keep only currencies with a matching trading pair
    .map((currency) => ({
      ...currency, // Spread the original currency properties
      market: currencyToPairMap.get(currency.id) || "", // Add the trading pair ID as the "market" property
    })) as IDestinationCurrencyType[]; // Cast the result to the appropriate type
};
