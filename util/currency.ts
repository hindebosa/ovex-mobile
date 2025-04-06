import {
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
