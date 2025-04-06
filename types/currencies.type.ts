export interface ICurrency {
  id: string;
  name: string;
  symbol: string;
  type: "coin" | "fiat";
  icon_url: string;
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
