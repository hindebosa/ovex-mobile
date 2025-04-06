export interface ICurrency {
  id: string;
  name: string;
  symbol: string;
  type: "coin" | "fiat";
  icon_url: string;
  tradingPairId?: string;
}

export interface ICurrencyConversionResponse {
  from_amount: string;
  from_currency: string;
  market: string;
  message: string;
  rate: string;
  rate_is_from_currency: boolean;
  to_amount: string;
  to_currency: string;
}
// Removed redundant CurrencyConversionResponse interface

export interface IDestinationCurrencyType extends ICurrency {
  market: string;
}
export type TabType = "fiat" | "crypto";

export type TradingPair = {
  id: string;
  base_currency: string;
  quote_currency: string;
};

export type TradingPairsByQuoteCurrency = {
  [quoteCurrency: string]: TradingPair[];
};
